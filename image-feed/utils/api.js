export const fetchImages = async () => {
  const response = await fetch("https://unsplash.it/list");
  const images = await response.json();

  return images;
};

export const getImageFromId = id =>
  `https://picsum.photos/id/${id}/${600}/${600}`;

// https://picsum.photos/id/0/600/600
