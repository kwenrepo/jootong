import css from './lobby.module.scss';
import ListArea from '#components/lobby/ListArea';
import Layout from '#components/Layout';

export default function lobby() {
  return (
    <Layout>
      <div className={css.wrap}>
        <ListArea />
      </div>
    </Layout>
  );
}
