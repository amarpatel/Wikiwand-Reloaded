function redirect({ url }) {
  // do not redirect oldformat and the search
  if (url.indexOf('?oldformat=true') !== -1 || url.indexOf('?search=') !== -1) {
    return;
  }

  const [article] = /[^/]*$/.exec(url);
  const wikipediaRegExp = new RegExp('^https?://([a-zA-Z0-9\\-_]+)\\.(?:m\\.)?wikipedia\\.org', 'i');
  const [, lang] = url.match(wikipediaRegExp);
  return { redirectUrl: `https://www.wikiwand.com/${lang}/${article}` };
}

// replace 'chrome' with 'browser' to make it work in Edge
chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ['https://*.wikipedia.org/wiki/*'], types: ['main_frame'] },
  ['blocking']
);