import css from './Navigator.module.scss';
import { useRouter } from 'next/router';

export default function Navigator({text = ""}) {
  const router = useRouter();

  return (
    <nav className={css.nav}>
      <span>{text}</span>
      {/* <button onClick={() => { router.back(); }}>
        <i></i>
        back
      </button> */}
    </nav>
  );
}