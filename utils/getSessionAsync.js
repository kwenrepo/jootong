import { getSession} from "next-auth/react"

export const getSessionAsync = async function(){
  try{
    return await getSession()
  } catch {
    return "error get session"
  }
}