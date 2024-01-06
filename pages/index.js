import Head from 'next/head';
import Lobby from './lobby';
import Header from '#components/Header';
import Footer from '#components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>JOOTONG-주간통계</title>
        <meta name="description" content="재미로 보는 통계, 주간 통계, 통계, 날씨, 엔터" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Lobby />
        <Footer />

      </main>
    </>
  )
}
