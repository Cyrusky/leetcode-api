import { Response } from 'express';
import config from '../config';

const fetchDataRawFormat = async (
  options: { username: string },
  res: Response,
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
          username: options.username
        }
      })
    });

    const result = await response.json();
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }
    if (result.errors) {
      return res.send(result);
    }

    return res.json(result.data);
  } catch (err) {
    console.error('Error: ', err);
    return res.send(err);
  }
};

export default fetchDataRawFormat;
