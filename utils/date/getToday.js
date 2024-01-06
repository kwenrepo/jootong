// 오늘 날짜 구하기

export const getToday = () => {
  const date = new Date(); 
  const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  const kst= 9 * 60 * 60 * 1000;
  const today = new Date(utc + kst);

  return today;
}

