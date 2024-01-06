import css from './SupportHistory.module.scss';
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { getTime } from "#utils/getTime";
import { useRouter } from 'next/router';
import Link from "next/link";

export default function SupportHistory(){
  const {data: session} = useSession();
  const router = useRouter();

  const [isHistory, setIsHistory] = useState(false)
  const [historyItem, setHistoryItem] = useState("")
  const [supportList, setSupportList] = useState([])

  function historyItemViewHandle(itemIndex){
    if(historyItem === itemIndex){
      setHistoryItem("")
    }else{
      setHistoryItem(itemIndex)
    }
  }

  useEffect(()=>{
    if(session){
      let user_key = session.user.user_key
      fetch("/api/support?user_key="+user_key, {
        method: "get"
      })
      .then((response) => response.json())
      .then((data) => {
        let list = data.data;

        // for(let i = 0; i<list.length; i++){
        //   list[i].content = list[i].content.replaceAll("\n", "<br/>");
        // }
        setSupportList(list)
      });
    }
  }, [session])

  return(
    <div className={`${css.my_history} ${css.box}`}>
      <h2>문의내역</h2>
      <div className={css.tab}>
        <Link className={css.question} href="/support">문의하기</Link>
      </div>

      {supportList.length ? <ul className={css.list}>
        {supportList.map((item)=>{
          return (
            <li className={css.item} key={item.create_date}>
              <div className={css.item_meta}>
                <div className={css.item_top}>
                  <span>문의날짜</span>
                  <span>{getTime({"format": "YYYY/MM/DD", date:item.answer_date})}</span>
                  <span>{item.answer ? "답변완료" : "미답변"}</span>
                </div>
                <div className={css.item_title} onClick={()=>{ historyItemViewHandle(item.idx) }}>
                  <span>{item.title}</span>
                </div>
              </div>
              
              {historyItem === item.idx && 
              <div className={css.content}>
                <pre>{item.content}</pre>

                {item.answer && <div className={css.answer}>
                  --- [안녕하세요! 주식소통 입니다] ---
                  <pre>{item.answer}</pre>
                </div>}
              </div>}
              
            </li>
          );
        })}
      </ul> : <div className={css.empty}>문의 내역이 없습니다.</div>}  
     
    </div>
  )
}