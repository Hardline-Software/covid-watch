import { CognitoUserPoolTriggerHandler } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import 'source-map-support/register'

const dynamoDb = new DynamoDB.DocumentClient()

const findUser = async (userId: string) =>
  dynamoDb.get({ Key: { id: userId }, TableName: process.env.TABLE! }).promise()

export const handler: CognitoUserPoolTriggerHandler = async (event, _context, callback) => {
  console.info(event)
  const { sub: userId } = event.request.userAttributes
  try {
    const user = await findUser(userId)
    console.info('User Found:', user)
    // Check if the user was found
    if (!user.Item) {
      try {
        console.info('Create User:', userId)
        // Create the user and add user to group
        // await dynamoDb
        //   .put({
        //     Item: {
        //       id: userId,
        //       email,
        //       familyName:
        //     },
        //     TableName: process.env.TABLE!
        //   })
        //   .promise()
        // Add the user to the group
      } catch (err) {
        console.error('Error Creating User:', err)
      }
    }
  } catch (err) {
    console.error('Error Finding User:', err)
  }
  callback(null, event)
}
