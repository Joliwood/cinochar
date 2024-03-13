import { atom } from 'recoil';

import { type Player, type RandomFilmPosition, type UserInfos } from '#types';

export const userInfosState = atom<UserInfos>({
  key: 'userInfos',
  default: {
    isUserPlaying: false,
    jokers: 2,
    name: '',
    points: 0,
    revealImg: false,
  },
});

export const counterState = atom<number>({
  key: 'counter',
  default: 0,
});

/**
 * Random film to find by the user
 */
export const randomMovieNameState = atom<string | undefined>({
  key: 'randomMovieName',
  default: undefined,
});

/**
 * Main movie picture
 */
export const movieUrlState = atom<string>({
  key: 'movieUrl',
  default: '',
});

/**
 * Match between film to find and user result, null at
 * initialization and bollean after a first try
 */
export const matchResultState = atom<string | null>({
  key: 'matchResult',
  default: null,
});

export const zoomState = atom<number>({
  key: 'zoom',
  default: 3,
});

export const zoomPositionState = atom<RandomFilmPosition | null>({
  key: 'zoomPosition',
  default: null,
});

/**
 * User result
 */
export const userAnswerState = atom<string>({
  key: 'userAnswer',
  default: '',
});

export const countdownValueState = atom<number | null>({
  key: 'countdownValue',
  default: null,
});

export const filmFoundState = atom<boolean>({
  key: 'filmFound',
  default: false,
});

// --- List of players --- //

export const playerListState = atom<Player[]>({
  key: 'playerList',
  default: [],
});

export const playersListClassementState = atom<Player[]>({
  key: 'playersListClassement',
  default: [],
});

export const playersListConnectedState = atom<Player[]>({
  key: 'playersListConnected',
  default: [],
});

// --- List of players --- //

export const isUserPlayingState = atom<boolean>({
  key: 'isUserPlaying',
  default: false,
});

export const pointsEarnedState = atom<number>({
  key: 'pointsEarned',
  default: 5,
});
