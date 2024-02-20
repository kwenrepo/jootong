import css from './lobby.module.scss';
import { ListArea } from '@components/index';

export default function lobby() {
  return (
    <div className={css.wrap}>
      <ListArea />
    </div>
  );
}
