import css from './lobby.module.scss';
import { CalendarEditor } from '@components/index';

export default function lobby() {
  return (
    <div className={css.wrap}>
      <CalendarEditor />
    </div>
  );
}
