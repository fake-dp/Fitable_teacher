// 비밀번호 정규식
export function validatePassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,16}$/i;
    return pattern.test(password);
  }


// 핸드폰 번호 하이폰 정규식
export function formatPhoneNumber(phone){
    if (phone.length === 10) {
        return `${phone.substring(0, 3)}-${phone.substring(3, 6)}-${phone.substring(6)}`;
    } else if (phone.length === 11) {
        return `${phone.substring(0, 3)}-${phone.substring(3, 7)}-${phone.substring(7)}`;
    } else {
        return phone;
    }
};

// 시간 포맷
export const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
};


// 날짜 포맷
export function formatDate(dateString) {
    return dateString.split('T')[0];
}

// 숫자 콤마
export function formatCommaNumber(num) {
    return new Intl.NumberFormat().format(num);
  }

// 하이폰 제거 - 대신 .
export function formatReplaceString(dateString) {
    if (!dateString) {
      console.error('Invalid date string');
      return '';  // 빈 문자열 반환
    }
    
    return dateString.replace(/-/g, '.');
  }