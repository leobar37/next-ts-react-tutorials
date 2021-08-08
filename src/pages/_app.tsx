import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { ThemeProvider } from "../contexts/theme-context";
import CountProvider from "../contexts/count-context";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CountProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </CountProvider>
  );
}

export default MyApp;
