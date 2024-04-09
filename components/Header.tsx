import css from './Header.module.scss';
import Link from "next/link";

export default function Header() {

  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <div className={css.left_area}>
          <div className={css.logo}>
            <Link href="/">JOOTONG</Link>
          </div>
        </div>
        <div className={css.right_area}>
          <Link className={css.create} href="/create">
            <i></i>
          </Link>
        </div>
      </div>
    </div>
  );
}