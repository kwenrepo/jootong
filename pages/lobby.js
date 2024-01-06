import css from './lobby.module.scss';
import ListArea from '#components/lobby/ListArea';
import ChatArea from '#components/lobby/ChatArea';

export default function lobby() {
  return (
    <div className={css.wrap}>

      <div className={css.lobby}>
        <ListArea />
        {/* <ChatArea /> */}
      </div>

    </div>
  );
}
