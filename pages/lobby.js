import css from './lobby.module.scss';
import ListArea from '#components/lobby/ListArea';

export default function lobby() {
  return (
    <div className={css.wrap}>
      <ListArea />
    </div>
  );
}
