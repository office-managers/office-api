import jsdom from 'jsdom';
import got from 'got';
import { writeFile } from 'fs/promises';
const { JSDOM } = jsdom;

const TRIVIA_URL = 'https://www.imdb.com/title/tt0386676/trivia/?ref_=tt_trv_trv';

got(TRIVIA_URL)
  .then(res => {
    const triviaDom = new JSDOM(res.body.toString()).window.document;
    const triviaElements = triviaDom.querySelectorAll('.sodatext');
    const triviaArray = Array.from(triviaElements);
    const trivia = triviaArray.map(e => {
      return {
        trivia: e.textContent
      };
    });
    return writeFile('trivia.json', JSON.stringify(trivia));
  });
