import { Response } from 'express';
import { ProblemSetQuestionListData } from '../types';
import config from '../config';

const fetchProblems = async (
  options: { limit: number; tags: string, skip?: number },
  res: Response,
  formatData: (data: ProblemSetQuestionListData) => {},
  query: string
) => {
  try {
    const response = await fetch(config.LEETCODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com'
      },
      body: JSON.stringify({
        query: query,
        variables: {
          categorySlug: '',
          skip: options.skip || 0,
          limit: options.limit || 20, //by default get 20 question
          filters: { tags: options.tags ? options.tags.split(' ') : ' ' } //filter by tags
        }
      })
    });

    const result = await response.json();

    if (result.errors) {
      return res.send(result);
    }
    return res.json(formatData(result.data));
  } catch (err) {
    console.error('Error: ', err);
    return res.send(err);
  }
};

export default fetchProblems;
