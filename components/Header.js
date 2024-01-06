import css from './Header.module.scss';
import UserStatus from './auth/UserStatus';
import Link from "next/link";

export default function Header() {
  return(
    <div className={css.wrap}>
      <div className={css.inner}>
        <div className={css.left_area}>
          <div className={css.logo}>
            <Link href="/">JOOTONG</Link>
          </div>
        </div>
        <div className={css.right_area}>
          <UserStatus />
        </div>
      </div>
    </div>
  )
}