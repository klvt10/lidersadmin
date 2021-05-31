import { AuthProvider } from '@/contexts/AuthContext'
import GlobalStyles from '@/styles/GlobalStyles'
import Modal from 'react-modal';

Modal.setAppElement('body');

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
