import { atom } from 'recoil';

import { type UserInfos } from '#types';

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
