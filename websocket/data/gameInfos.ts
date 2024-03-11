import type { ServerData } from '#types';

export const gameInfos: ServerData = {
  cooldownCounter: 0,
  cooldownDuration: 5,
  countdown: null,
  filmNameFromSocket: '',
  filmUrlFromSocket: '',
  zoomPositionFromSocket: { x: null, y: null },
};
