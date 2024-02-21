import css from './Footer.module.scss';
import Link from "next/link";

export default function Footer() {
  return(
    <footer className={css.footer}>
      <div className={css.inner}>
        <ul>
          <li>JOOTONG</li>
          <li><Link href="/support">Support</Link></li>
          {/* <li>회사소개</li> */}
          {/* <li><Link href="/policy/service">이용약관</Link></li>
          <li><Link href="/policy/privacy">개인정보처리방침</Link></li> */}
        </ul>
      </div>
    </footer>
  )
}