const { JSDOM } = require('jsdom');

global.useDOM = (htmlString) => {
  const dom = new JSDOM(htmlString);
  global.window = dom.window;
  global.document = window.document;
  return dom;
}