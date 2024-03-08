export type PositionType = {
  x: number | null;
  y: number | null;
};

export type Player = {
  // name?: string | null;
  socketId: string;
  name: string | null;
  points: number | null;
};

export type ServerData = {
  cooldownCounter: number,
  cooldownDuration: number,
  countdown: number | null,
  filmNameFromSocket: string,
  filmUrlFromSocket: string,
  zoomPositionFromSocket: PositionType,
};