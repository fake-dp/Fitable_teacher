// 로그인 상태관리
import { atom } from 'recoil';

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