import { atom } from "recoil";

export const user = atom({
  key:"user"+ new Date().getTime(),
  default:{}
})

export const dataList = atom({
  key:"dataList"+ new Date().getTime(),
  default:[]
})

export const calendarDataList = atom({
  key:"calendar"+ new Date().getTime(),
  default:[]
})

export const title = atom({
  key:"title"+ new Date().getTime(),
  default:[]
})

