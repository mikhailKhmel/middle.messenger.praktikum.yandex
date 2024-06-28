const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<body></body>', {
  url: 'https://example.org/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.DocumentFragment = jsdom.window.DocumentFragment;
global.HTMLElement = jsdom.window.HTMLElement;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
