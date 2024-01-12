import css from './UserCard.module.scss';
import { useRecoilValue } from 'recoil';
import { user } from "#recoilStore/index"
import { useState} from "react";
import Link from "next/link";
import Loading from '#components/Loading'
import { openWindow } from '#utils/openwindow';
import { getDateDiff } from '#utils/date';

export default function UserCard({ setUserArea, setAlarm, privateRoomList, setPrivateRoomList, setAlertData }) {
  const getUser = useRecoilValue(user);
  const [loading, setLoading] = useState(false);

  return getUser && (
    <div className={css.wrap}>
      <h1 className={css.title}>
        {/* JOOTONG */}
        <span className={css.nickname}>{getUser.nickname}</span>
      </h1>

      <div className={css.bridge}>
        <div>
          <Link className={css.mypage} href="/mypage">마이페이지</Link>
        </div>

      </div>

      {privateRoomList.length > 0 && 
      <div className={css.message_list}>
        {privateRoomList.map((item) => (
         <div></div>
        ))}
      </div>}

      {loading && <div className={css.loading}>
        <Loading />
      </div>}
    </div>
  );
}

