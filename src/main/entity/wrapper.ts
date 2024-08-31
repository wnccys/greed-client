import fetch from 'node-fetch';
import * as cheerio from 'cheerio';


const url = 'https://fitgirl-repacks.site/popular-repacks/';

(async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const html = await response.text();
    const $ = cheerio.load(html);


    $('.widget-grid-view-image').each((i, element) => {
      const link = $(element).find('a').attr('href');
      const imgSrc = $(element).find('img').attr('src');
      const title = $(element).find('a').attr('title');
      console.log('Link:', link);
      console.log('Image Source:', imgSrc);
      console.log('Title: ', title);
      console.log('---');
    });
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
})();
