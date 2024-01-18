import css from "./404.module.scss";
import Layout from '#components/Layout';
import Link from "next/link";
export default function Custom404() {
  return (
    <Layout title="404 - jootong" isHeader={false} isFooter={false}>
      <div className={css.wrap}>
        <h1>404</h1>
        <span>아무것도 없어요! 🙄</span>
        <Link href="/"> <i></i> 홈으로</Link>

      </div>
    </Layout>
  )
}