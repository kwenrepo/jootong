declare global {
  interface GetUser {
    email?: string
    nickname?: string
    user_key?: string
    provider?: string
    item?: {
      item_nickname?:number
    }
  };

  interface Alert {
    isAlert:boolean,
    message?:ReactElement,
    confirm?:ReactElement,
    cancel?:ReactElement
  }

  interface Math {
    easeInOutQuad: Function
  }
}

export default global;