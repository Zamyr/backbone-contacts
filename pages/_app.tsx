import '../styles/globals.css'
import type { AppProps } from "next/app";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";
import Header from "../src/components/Header";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
