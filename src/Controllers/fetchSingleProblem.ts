import { Response } from 'express';
import { DailyProblemData, SelectProblemData } from '../types';
import config from '../config';

const fetchSingleProblem = async (
  res: Response,
  formatData: (data: DailyProblemData & SelectProblemData) => void,
  query: string,
  titleSlug: string | null
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
          titleSlug //search question using titleSlug
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

export default fetchSingleProblem;
