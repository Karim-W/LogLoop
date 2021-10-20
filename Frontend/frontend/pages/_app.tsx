import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import NavBar from '../components/NavBar'
import { useRouter } from 'next/router'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
  });
  return (<ApolloProvider client={client}><ChakraProvider>
    {router.pathname.toLowerCase() === "/login" ? null : <NavBar />}
    <Component {...pageProps} />
  </ChakraProvider></ApolloProvider>
  )

}
export default MyApp
