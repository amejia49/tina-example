import { ApolloClient, ApolloLink, HttpLink , InMemoryCache} from '@apollo/client';
import { onError } from "@apollo/client/link/error";

import fetch from 'isomorphic-unfetch'

// import auth0 from './auth0';

let accessToken = null
const requestAccessToken = async () => {
  if (accessToken) return
  const res = await fetch(`${process.env.APP_HOST}/api/session`)
  if (res.ok) {
    const json = await res.json()
    accessToken = json.accessToken
  } else {
    accessToken = 'public'
  }
}
// remove cached token on 401 from the server
const resetTokenLink = onError(({ networkError }) => {
  if (networkError && networkError.name === 'ServerError' && networkError.statusCode === 401) {
    accessToken = null
  }
})
const createHttpLink = (headers) => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql',
    // credentials: 'include',
    headers, // auth token is fetched on the server side
    fetch,
    useGETForQueries: true
  })
  return httpLink;
}
// const createWSLink = () => {
//   return new WebSocketLink(
//     new SubscriptionClient('wss://learn-hasura.herokuapp.com/v1/graphql', {
//       lazy: true,
//       reconnect: true,
//       connectionParams: async () => {
//         await requestAccessToken() // happens on the client
//         return {
//           headers: {
//             authorization: accessToken ? `Bearer ${accessToken}` : '',
//           },
//         }
//       },
//     })
//   )
// }
export default function createApolloClient(initialState, headers) {
  const ssrMode = typeof window === 'undefined'
  let link
  if (ssrMode) {
    link = createHttpLink(headers) // executed on server
  } else {
    // link = createWSLink() // executed on client
    link = createHttpLink(headers) // executed on server
    console.log('lolll');
  }
  return new ApolloClient({
    ssrMode,
    link,
    cache: new InMemoryCache().restore(initialState),
  })
}