import '../styles/globals.scss'
import { RecoilRoot } from 'recoil';
import UAParser from "ua-parser-js";

export default function App({ Component, pageProps, session }) { 

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
