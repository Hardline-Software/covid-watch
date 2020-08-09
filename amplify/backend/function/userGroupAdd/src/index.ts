import { DynamoDB, CognitoIdentityServiceProvider } from 'aws-sdk'
import { DynamoDBStreamHandler } from 'aws-lambda'
import 'source-map-support/register'

const addToGroups = async (userId: string, organizationId: string, role: string) => {
  const cognito = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })
  const promises: Promise<any>[] = []
  promises.push(
    cognito
      .adminAddUserToGroup({
        Username: userId,
        GroupName: `org:${organizationId}:users`,
        UserPoolId: process.env.AUTH_COVIDWATCH_USERPOOLID
      })
      .promise()
  )
  promises.push(
    cognito
      .adminAddUserToGroup({
        Username: userId,
        GroupName: 'users',
        UserPoolId: process.env.AUTH_COVIDWATCH_USERPOOLID
      })
      .promise()
  )
  if (role === 'MANAGER') {
    promises.push(
      cognito
        .adminAddUserToGroup({
          Username: userId,
          GroupName: 'managers',
          UserPoolId: process.env.AUTH_COVIDWATCH_USERPOOLID
        })
        .promise()
    )
    promises.push(
      cognito
        .adminAddUserToGroup({
          Username: userId,
          GroupName: `org:${organizationId}:managers`,
          UserPoolId: process.env.AUTH_COVIDWATCH_USERPOOLID
        })
        .promise()
    )
  }
  await Promise.all(promises)
}

export const handler: DynamoDBStreamHandler = async (event) => {
  const promises: Promise<any>[] = []
  event.Records.forEach((record) => {
    console.log(record.eventID)
    console.log(record.eventName)
    console.log('DynamoDB Record: %j', record.dynamodb)
    const newRecord = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
    if (record.eventName === 'INSERT') {
      promises.push(addToGroups(newRecord.id, newRecord.organizationId, newRecord.role))
    }
  })
  await Promise.all(promises)
}
