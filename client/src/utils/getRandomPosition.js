import sharp from 'sharp';
import axios from 'axios';

const getRandomPosition = async (zoom, filmDimensionsContainer) => {
  const response = await axios.get(filmUrlFromSocket, { responseType: 'arraybuffer' });

  const image = sharp(response.data);
  const metadata = await image.metadata();

  const { width } = metadata;
  const { height } = metadata;

  // Width after zoom render = filmDimensionsContainer x zoom, whatever real
  // width before but we still need it for the aspect ratio to have the height
  // after zoom render
  const aspectRatio = width / height;
  const xMax = filmDimensionsContainer - filmDimensionsContainer / zoom;
  const yMax = ((zoom * filmDimensionsContainer / aspectRatio) - filmDimensionsContainer) / zoom;

  console.log('zoom : ', zoom, '. FilmDimensionsContainer : ', filmDimensionsContainer);
  console.log('Width pixel : ', width, 'px. Height pixel : ', height, 'px. Aspect ratio is : ', aspectRatio, '. Xmax = ', xMax, '. Ymax = ', yMax);

  const randomX = Math.floor(Math.random() * xMax);
  const randomY = Math.floor(Math.random() * yMax);
  const randomZoomPosition = { x: -randomX, y: -randomY };
  return randomZoomPosition;
};

export default getRandomPosition;
