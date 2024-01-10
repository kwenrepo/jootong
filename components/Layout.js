import css from "./Layout.module.scss";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, title, footer }) {
  return (
    <>
      <Head>
        <title>{title || "JOOTONG-주간통계"}</title>
        <meta name="description" content="재미로 보는 통계, 주간 통계, 통계, 날씨, 엔터" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div id={css.root}>

        <Header />
        <div className={css.container}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}
