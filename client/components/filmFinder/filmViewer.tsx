import React from 'react';
import Image from 'next/image';
// import { Player } from '@lottiefiles/react-lottie-player';
import { useRecoilValue } from 'recoil';

// import lkrazakeAnimation from '../../public/images/animation_lkrazake.json';

import { userInfosState } from '../../store';

import type { RandomFilmPosition } from '#types';

type Props = {
  filmDimensionsContainer: number;
  randomMovieName: string | undefined;
  movieUrl: string;
  zoomPosition: RandomFilmPosition | null;
  zoom: number;
};

const FilmViewer = (props: Props) => {
  const {
    filmDimensionsContainer,
    randomMovieName,
    movieUrl,
    zoomPosition,
    zoom,
  } = props;

  const userInfos = useRecoilValue(userInfosState);

  return (
    <div
      className="film-square shadow-md flex max-w-[95vw]"
      style={{
        width: `${filmDimensionsContainer}px`,
        /* , height: `${filmDimensionsContainer}px` */
        overflowX: userInfos.revealImg ? 'scroll' : 'hidden',
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
            transform: zoomPosition !== null && !userInfos.revealImg
              ? `scale(${zoom}) translate(${zoomPosition.x}px, ${zoomPosition.y}px)`
              : 'none',
          }}
        />
      ) : (
        // <Player
        //   autoplay
        //   loop
        //   renderer="svg"
        //   src={lkrazakeAnimation}
        //   className="w-full h-full"
        // />
        <div className="w-full h-full bg-primary-content" />
      )}
    </div>
  );
};

export default FilmViewer;
