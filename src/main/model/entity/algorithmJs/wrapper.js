const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const url = 'https://fitgirl-repacks.site/popular-repacks/';
const filePath = path.join(__dirname, 'images.json'); // Usa __dirname

async function req() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const imageData = []; 

    const elements = $('.widget-grid-view-image');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const link = $(element).find('a').attr('href');
      const imgSrc = $(element).find('img').attr('src');
      const title = $(element).find('a').attr('title');

      if (imgSrc) {
        imageData.push({ link, imgSrc, title }); //falta id para key do hook
      }
    }

    console.log('Image Data:', imageData);

    fs.writeFileSync(filePath, JSON.stringify(imageData, null, 2), 'utf8');
    console.log('Os dados das imagens foram salvos em images.json');

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

req();
