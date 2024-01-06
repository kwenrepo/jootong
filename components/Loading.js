
import css from './Loading.module.scss';

export default function Loading({shape}) {

  return (
    <div className={css.wrap}>
      <div className={css.loading}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

