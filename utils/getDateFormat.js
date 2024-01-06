export const getDateFormat = (format) => {

  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month < 10 ? month = '0'+ month : null;
  let day = date.getDate();
  day < 10 ? day = '0'+ day : null;
  let hour = date.getHours();
  hour < 10 ? hour = '0'+ hour : null;
  let minute = date.getMinutes();
  minute < 10 ? minute = '0' + minute : null;
  let second = date.getSeconds();
  second < 10 ? second = '0' + second : null;

  switch(format){
    case "YYYY/MM/DD" :
      return year + '/' + month + '/' + day;
    case "HH:mm" :
      return hour + ':' + minute;
    case "HH" :
      return hour;
    case "YYYY, MM, DD":
      return year + ',' + month + ',' + day;
    case "YYYYMMDD":
      return year+month+day;
    case "YYYY-MM-DD":
      return year + '-' + month + '-' + day;
    default :
      return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ":" + second;
  }
};
