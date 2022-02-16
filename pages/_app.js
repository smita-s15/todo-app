import { AuthProvider } from '../Auth'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
       <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
