import React, { useEffect } from 'react';
import Image from 'next/image';
// import { lottie } from 'lottie-web/build/player/lottie_light.min';

function FilmViewer({
  randomMovieName,
  movieUrl,
  filmDimensionsContainer,
  zoom,
  zoomPosition,
  revealImg,
}: any) {
  const imageStyles = {
    display: zoomPosition !== null ? 'inherit' : 'none',
    transform: zoomPosition !== null && !revealImg
      ? `scale(${zoom}) translate(${zoomPosition.x}px, ${zoomPosition.y}px)`
      : 'none',
  };

  // useEffect(() => {
  //   lottie.loadAnimation({
  //     container: document.getElementById('lottie-container'),
  //     // eslint-disable-next-line global-require
  //     animationData: require('../../../public/images/animation_lkrazake.json'),
  //     renderer: 'svg',
  //     loop: true,
  //     autoplay: true,
  //   });
  // }, []);

  return (
    <div
      className="film-square shadow-md flex max-w-[95vw]"
      style={{
        width: `${filmDimensionsContainer}px`,
        /* , height: `${filmDimensionsContainer}px` */
        overflowX: revealImg ? 'scroll' : 'hidden',
      }}
    >
      {/* {randomMovieName && movieUrl ? ( */}
      <Image
        src={movieUrl}
        width={1920}
        height={1080}
        alt="film to find"
        className="film-img"
        priority
        style={imageStyles}
      />
      {/* ) : ( */}
      {/* <div className="flex w-full self-center" id="lottie-container" /> */}
      {/* )} */}
    </div>
  );
}

export default FilmViewer;
