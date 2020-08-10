import { DynamoDB, CognitoIdentityServiceProvider } from 'aws-sdk'
import { DynamoDBStreamHandler } from 'aws-lambda'
import 'source-map-support/register'

const createGroups = async (organizationId: string) => {
  const cognito = new CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' })
  await cognito
    .createGroup({
      GroupName: `org:${organizationId}:managers`,
      UserPoolId: process.env.AUTH_COVIDWATCH_USERPOOLID
    })
    .promise()
  await cognito
    .createGroup({
      GroupName: `org:${organizationId}:users`,
      UserPoolId: process.env.AUTH_COVIDWATCH_USERPOOLID
    })
    .promise()
}

export const handler: DynamoDBStreamHandler = async (event) => {
  const promises: Promise<any>[] = []
  event.Records.forEach((record) => {
    console.log(record.eventID)
    console.log(record.eventName)
    console.log('DynamoDB Record: %j', record.dynamodb)
    const newRecord = DynamoDB.Converter.unmarshall(record.dynamodb.NewImage)
    if (record.eventName === 'INSERT') {
      promises.push(createGroups(newRecord.id))
    }
  })
  await Promise.all(promises)
}
