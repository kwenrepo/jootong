import css from './Footer.module.scss';
import Link from "next/link";

export default function Footer() {
  return(
    <footer className={css.footer}>
      <div className={css.inner}>
        <ul>
          <li>JOOTONG</li>
        </ul>
      </div>
    </footer>
  )
}