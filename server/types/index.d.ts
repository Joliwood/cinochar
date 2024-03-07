export type PositionType = {
  x: number | null;
  y: number | null;
};

export type Player = {
  pseudo?: string | null;
  playerId?: string;
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