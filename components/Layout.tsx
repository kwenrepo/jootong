import css from "./Layout.module.scss";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
  isHeader?: boolean;
  isFooter?: boolean;
}

export default function Layout({ children, title = "JOOTONG-주간통계", isHeader = true, isFooter = true }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      
      <div id={css.root}>

        {isHeader && <Header />}

        <div className={css.container}>
          {children}
        </div>

        {isFooter && <Footer />}
      </div>
    </>
  );
}
