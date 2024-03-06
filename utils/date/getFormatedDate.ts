export const getFormatedDate = (data:any = {}) => {
  let date = data.target ? new Date(data.target) : new Date();

  let year:string|number = date.getFullYear();
  let month:string|number = date.getMonth() + 1;
  month < 10 ? month = '0' + month : null;
  let day:string|number = date.getDate();
  day < 10 ? day = '0'+ day : null;
  let hour:string|number = date.getHours();
  hour < 10 ? hour = '0'+ hour : null;
  let minute:string|number = date.getMinutes();
  minute < 10 ? minute = '0' + minute : null;
  let second:string|number = date.getSeconds();
  second < 10 ? second = '0' + second : null;

  switch(data.format){
    case "YYYY/MM/DD" :
      return year + '/' + month + '/' + day;
    case "HH:mm" :
      return hour + ':' + minute;
    case "HH" :
      return hour;
    case "YYYY, MM, DD":
      return year + ',' + month + ',' + day;
    case "YYYYMMDD":
      return year + '' + month + '' + day;
    case "YYYY-MM-DD":
      return year + '-' + month + '-' + day;
    default :
      return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ":" + second;
  }
};

