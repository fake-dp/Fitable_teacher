// 로그인 상태관리
import {atom} from 'recoil';

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

export const myPhoneState = atom({
  key: 'myPhoneState',
  default: '',
});

// mypage info
export const myinfoState = atom({
  key: 'myinfoState',
  default: '',
});

// centerId
export const centerIdState = atom({
  key: 'centerIdState',
  default: '',
});

// CenterList
export const centerListState = atom({
  key: 'centerListState',
  default: [],
});

// floating state
export const floatingState = atom({
  key: 'floatingState',
  default: false,
});

// 프로필 상태 관리
export const profileState = atom({
  key: 'profileState',
  default: {
    description: '',
    career: '',
    qualifications: '',
    centerProfiles: [],
  },
});

// 회원관리 버튼 넘버 상태관리
export const totalElementsState = atom({
  key: 'totalElementsState',
  default: {
    PERSONAL: 0,
    GROUP: 0,
    ATTENDANCE: 0,
    MANAGING: 0,
    POTENTIAL: 0,
  },
});

// 계약서 상태관리
export const contractState = atom({
  key: 'contractState',
  default: {
    tickets: [],

    sign: {
      member: null,
      teacher: null,
      center: null,
    },
    contractTemplate: {},
    selectedContractes: [],
  },
});
