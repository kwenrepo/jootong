import { selector } from "recoil";
import { user, dataList, calendarDataList, title } from "./atoms";

export const userSelector = selector({
  key:"userSelector" + new Date().getTime(),
  get: ({get}) => get(user),
  set: ({set}, session) => {
    set(user, session);
  }
})

export const dataListSelector = selector({
  key:"dataListSelector" + new Date().getTime(),
  get: ({get}) => get(dataList),
  set: ({set}, newList:any[]) => {
    newList = newList.map((item)=>{
      item.summaryOfContent = Object.values(JSON.parse(item.content))[0];
      return item;
    })
    set(dataList, newList);
  }
})


export const calendarDataListSelector = selector({
  key:"calendarDataListSelector" + new Date().getTime(),
  get: ({get}) => get(calendarDataList),
  set: ({set}, newList:any[]) => {
    newList = newList.map((item)=>{
      item.summaryOfContent = Object.values(JSON.parse(item.content))[0];
      return item;
    })
    set(calendarDataList, newList);
  }
})

export const titleSelector = selector({
  key:"titleSelector" + new Date().getTime(),
  get: ({get}) => get(title),
  set: ({set}, newTitle) => {
    set(title, newTitle);
  }
})