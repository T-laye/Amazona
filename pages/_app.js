import '@/styles/globals.css';
import { StoreProvider } from '@/utils/store';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
