import '../styles/globals.css';
import { ReactQueryProvider } from '../utils/react-query';

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}

export default MyApp;
