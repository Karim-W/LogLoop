import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import NavBar from '../components/NavBar'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  if (router.pathname.toLowerCase() == "/login") {
    return (<ChakraProvider>

      <Component {...pageProps} />
    </ChakraProvider>)
  }
  else {
    return (
      <ChakraProvider>
        <NavBar />
        <Component {...pageProps} />
      </ChakraProvider>)

  }
}
export default MyApp
