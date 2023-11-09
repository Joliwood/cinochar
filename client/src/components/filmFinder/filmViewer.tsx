import React from 'react';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';
import type { RandomFilmPosition } from '@/@types';
import lkrazakeAnimation from '../../../public/images/animation_lkrazake.json';

function FilmViewer({
  filmDimensionsContainer,
  randomMovieName,
  movieUrl,
  zoomPosition,
  zoom,
  revealImg,
}: {
  filmDimensionsContainer: number;
  randomMovieName: string | undefined;
  movieUrl: string;
  zoomPosition: RandomFilmPosition | null;
  zoom: number;
  revealImg: boolean;
}) {
  return (
    <div
      className="film-square shadow-md flex max-w-[95vw]"
      style={{
        width: `${filmDimensionsContainer}px`,
        /* , height: `${filmDimensionsContainer}px` */
        overflowX: revealImg ? 'scroll' : 'hidden',
      }}
    >
      {randomMovieName && movieUrl ? (
        <Image
          src={movieUrl}
          width={1920}
          height={1080}
          alt="film to find"
          className="film-img"
          priority
          style={{
            display: zoomPosition !== null ? 'inherit' : 'none',
            transform: zoomPosition !== null && !revealImg
              ? `scale(${zoom}) translate(${zoomPosition.x}px, ${zoomPosition.y}px)`
              : 'none',
          }}
        />
      ) : (
        <Player
          autoplay
          loop
          renderer="svg"
          src={lkrazakeAnimation}
          className="w-full h-full"
        />
      )}
    </div>
  );
}

export default FilmViewer;
