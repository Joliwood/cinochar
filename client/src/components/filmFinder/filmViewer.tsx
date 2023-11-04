'use client';

import React from 'react';
import Image from 'next/image';

function FilmViewer({
  randomMovieName,
  movieUrl,
  filmDimensionsContainer,
  zoom,
  zoomPosition,
  revealImg,
}: any) {
  return (
    <div
      className="film-square shadow-md flex"
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
            // width: '1280px',
            // height: '720px',
            display: zoomPosition !== null
              ? 'inherit'
              : 'none',
            transform: (zoomPosition !== null && !revealImg) && `
              scale(${zoom}) 
              translate(${zoomPosition.x}px, ${zoomPosition.y}px)`,
          }}
        />
      ) : (
        <div className="flex w-full self-center" id="lottie-container" />
      )}
    </div>
  );
}

export default FilmViewer;
