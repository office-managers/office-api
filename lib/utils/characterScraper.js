import jsdom from 'jsdom';
import got from 'got';
import { readFile } from 'fs';
import { writeFile } from 'fs/promises';
const { JSDOM } = jsdom;


const characterURL = 'https://theoffice.fandom.com/wiki/Category:Characters';
const secondPage = 'https://theoffice.fandom.com/wiki/Category:Characters?from=Merv+Bronte';

got(characterURL)
  .then(res => {
    const charactersDom = new JSDOM(res.body.toString()).window.document;
    const charactersElements = charactersDom.querySelectorAll('.category-page__member-link');
    const charactersArray = Array.from(charactersElements);
    const characters = charactersArray.map(e => {
      return {
        name: e.textContent,
      };
    });
    return writeFile('characters.js', JSON.stringify(characters));
  });

got(secondPage)
  .then(res => {
    const charactersDom = new JSDOM(res.body.toString()).window.document;
    const charactersElements = charactersDom.querySelectorAll('.category-page__member-link');
    const charactersArray = Array.from(charactersElements);
    const characters = charactersArray.map(e => {
      return {
        name: e.textContent,
      };
    });
    return readFile('characters.js', 'utf-8', (err, data) => {
      if (err){
        console.log(err);
      } else {
        const obj = JSON.parse(data);
        characters.forEach(character => obj.push(character));
        const json = JSON.stringify(obj);
  
        return writeFile('characters.js', json);
      }
    });
  });
