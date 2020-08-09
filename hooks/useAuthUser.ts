import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useUserQuery } from '../generated/graphql'

export const useAuthUser = () => {
  const [authUser, setAuthUser] = useState<any>()
  useEffect(() => {
    const fetchAuth = async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser()
      setAuthUser(cognitoUser)
    }
    fetchAuth()
  }, [])
  const { data, error, loading } = useUserQuery({
    variables: {
      id: authUser?.username!
    },
    skip: !authUser
  })
  return { user: data?.user, error, loading }
}
