import '../styles/globals.css';
import { ReactQueryProvider } from '../utils/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ReactQueryProvider>
  );
}

export default MyApp;
