import { getFormatedDate } from './getFormatedDate';

export const getDateDiff = (target) =>{
  const diff = new Date(getFormatedDate()) - new Date(target);
  const day = parseInt(diff / (1000 * 60 * 60 * 24));
  const hour = parseInt(diff / (60 * 60 * 1000));
  const minute = parseInt(diff / (60 * 1000));

  if(day){
    return {
      type:"day",
      number : day,
      text : day + "일전"
    }
  } else if(hour){
    return {
      type:"hour",
      number : hour,
      text : hour + "시간전"
    }
  } else {
    return {
      number : minute,
      text : minute + "분전"
    }
  }
}

