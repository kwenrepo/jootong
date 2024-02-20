import css from './UserCard.module.scss';
import { signOut } from "next-auth/react";
import { useRecoilValue } from 'recoil';
import { user } from "@recoilStore/index"
import { useEffect, useState} from "react";
import Link from "next/link";
import Loading from '@components/Loading'
import { openWindow } from '@utils/openwindow';
import { getDateDiff } from '@utils/date';

export default function UserCard({ setUserArea, setAlarm, myDataList, setMyDataList, setAlertData }) {
  const getUser = useRecoilValue(user);
  const [loading, setLoading] = useState(false);

  return getUser && (
    <div className={css.wrap}>
      <div className={css.nickname}>{getUser.nickname} 님</div>

      {myDataList.length > 0 ?
        <div className={css.my_history}>
          <span>📅 내 달력</span>
          <ul>
            {myDataList.map((item)=>{
              return(
                <li key={item.create_date}>
                  <Link href={`/${item.id}/${item.title}`}>
                    <span className={css.title}><i></i>{item.title}</span>
                    <span className={ getDateDiff(item.create_date).type !== 'day' ? `${css.from_date} ${css.new}` : `${css.from_date}` }>
                      {getDateDiff(item.create_date).text}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div> 
      : 
        <div className={css.my_history}>
          <span>📅 내 달력</span>
          <div className={css.empty}>텅 비어있음</div>
        </div> 
      }
      <div className={css.bridge}>
        <div>
          <Link className={css.mypage} href="/mypage">
            <i></i>마이페이지
          </Link>
        </div>
        <div>
          <button className={css.logout} onClick={() => { signOut({ callbackUrl: `${window.location.origin}`});}}>
            <i></i>
            로그아웃
            </button>
        </div>
      </div>

      {loading && <div className={css.loading}>
        <Loading />
      </div>}
    </div>
  );
}

