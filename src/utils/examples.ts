export const examples: SearchResult[] = [
  'https://upload.wikimedia.org/wikipedia/commons/7/7a/Charge_-_Blender_Open_Movie-full_movie.webm',
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
