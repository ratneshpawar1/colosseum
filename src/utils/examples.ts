export const examples: SearchResult[] = [
  'https://upload.wikimedia.org/wikipedia/commons/0/03/The_Dover_Boys_at_Pimento_University_1080p.webm',
].map((url) => {
  if (typeof url === 'object') {
    return url;
  }
  return {
    url,
    type: url.startsWith('http') ? 'file' : 'magnet',
    name: url,
    duration: 0,
  };
});
