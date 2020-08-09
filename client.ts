import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { createAuthLink, AUTH_TYPE } from '@lukeramsden/aws-appsync-auth-link'
import { createSubscriptionHandshakeLink } from '@lukeramsden/aws-appsync-subscription-link'
import { UrlInfo } from '@lukeramsden/aws-appsync-subscription-link/lib/types'
import { Auth } from 'aws-amplify'
import awsconfig from './aws-exports'

const config: UrlInfo = {
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
  }
}

const client = new ApolloClient({
  link: ApolloLink.from([createAuthLink(config), createSubscriptionHandshakeLink(config)]),
  cache: new InMemoryCache()
})

export default client
