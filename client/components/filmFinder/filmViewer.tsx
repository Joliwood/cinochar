import React, { useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';

import lkrazakeAnimation from '../../public/images/animation_lkrazake.json';

import {
  userInfosState,
  randomMovieNameState,
  zoomState,
  zoomPositionState,
  movieUrlState,
} from '#store';
import { FILM_DIMENSIONS_CONTAINER } from '#utils';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

const FilmViewer = (): JSX.Element => {
  const userInfos = useRecoilValue(userInfosState);
  const randomMovieName = useRecoilValue(randomMovieNameState);
  const zoom = useRecoilValue(zoomState);
  const zoomPosition = useRecoilValue(zoomPositionState);
  const movieUrl = useRecoilValue(movieUrlState);

  const ImageViewer: JSX.Element = useMemo(
    () => {
      if (randomMovieName && movieUrl) {
        return (
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
        );
      }
      return (
        <Lottie
          loop
          renderer="svg"
          animationData={lkrazakeAnimation}
          play
          className="w-full h-full"
        />
      );
    },
    [randomMovieName, movieUrl, zoomPosition, zoom, userInfos.revealImg],
  );

  return (
    <div
      className="film-square shadow-md flex max-w-[95vw]"
      style={{
        width: `${FILM_DIMENSIONS_CONTAINER}px`,
        height: `${FILM_DIMENSIONS_CONTAINER}px`,
        overflowX: userInfos.revealImg ? 'scroll' : 'hidden',
      }}
    >
      {ImageViewer}
    </div>
  );
};

export default FilmViewer;
