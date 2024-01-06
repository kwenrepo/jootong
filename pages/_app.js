import '../styles/globals.scss'
import { useEffect, useState} from 'react';
import { SessionProvider } from "next-auth/react"
import { getSessionAsync } from "#utils/getSessionAsync"
import { SocketContext } from '#context/SocketContext';
import ioClient from "socket.io-client";
import { getTime } from '#utils/getTime';
import { getTimeDiff } from '#utils/getTimeDiff';
import UAParser from "ua-parser-js";

export default function App({ Component, pageProps, session }) { 
  const [socket, setSocket] = useState();
  const [socketConnect, setSocketConnect] = useState(false);
  const [user_key, setUserKey] = useState("");
  const [chatArea, setChatArea] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(()=>{
    if(socket){
      if(!user_key){
        getSessionAsync().then((session)=>{
          if(session){
            setUserKey(session.user.user_key)
            if(socketConnect && session.user.user_key){
              socket.emit("privateConnect", session.user.user_key)
            }
          } 
        })
      } else if(socketConnect && (user_key !== "")){
        socket.emit("privateConnect", user_key)
      }

      socket.on("connect", function(){
        if(!socketConnect){
          setSocketConnect(true)
        }
      })
      
    }else{
      fetch('/api/message/websocket?namespace=/', {
        method: "GET"
      })
      .then(() => {
        setSocket(ioClient("/", { 
          transports: ['websocket'] 
        }))
      })
    }

  }, [socket, user_key, socketConnect])

  useEffect(()=>{
    let time = getTime();
    window.addEventListener("focus", function(){
      let parser = new UAParser()

      if(parser.getDevice().type === "mobile"){
        setReload(true)
      }else if(getTimeDiff(time).type){
        setReload(true)
      } 
      time = getTime();
   })
   return () => window.removeEventListener("focus")
  }, [])

  return (
    <SessionProvider session={session}>
    <SocketContext.Provider value={{socket, socketConnect, user_key, setUserKey, chatArea, setChatArea, reload, setReload}}>
      <Component {...pageProps} />
    </SocketContext.Provider>
    </SessionProvider>
  );
}
