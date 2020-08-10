# COVID Watch
### Hackathon entry for the [Auth0 Hackathon 2020](https://auth0.devpost.com/).

### Addressing after effects: solutions that address the after effects of COVID-19

COVID Watch is an application designed to help employers and school adminstrators keep track of the testing, quarantines, and vaccinations of their employees/students. The application provides a portal for users to enter health check information, start a quarantine, enter testing results, and provide vaccination information. This information can then be accessed by an organization manager who is able to see the status of all users to protect the organization from outbreaks.

## Technologies
- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## How it works
The application is based on React Native/Expo and utilizes TypeScript and the Apollo GraphQL client to access information provided by the AWS AppSync API. 

All backend resources are orchestrated by AWS Amplify including the database, user authentication, and API. The GraphQL Codegen is used to automatically generate types and queries based on GraphQL query, mutation, and fragment files in the `/graphql` directory.

Authentication is preformed by the `aws-amplify` NPM package, which provides nice APIs to access user credentials and authentication state.

## Installation

### 1. Clone Repository
`git clone https://github.com/Hardline-Software/covid-watch.git`
### 2. Install Dependencies
`yarn install && expo install`

### 3. Deploy to AWS Amplify
Install the AWS Amplify CLI <br/>
`npm install -g @aws-amplify/cli`

Configure the Amplify CLI <br />
`amplify configure`

Initialize the Amplify Project <br />
`amplify init`

Push Respources to the cloud <br />
`amplify push`

### 4. Install the Expo App for iOS/Android
[Expo Docs](https://docs.expo.io/get-started/installation/)

### 5. Start the Development Server
`yarn start`

## Scripts

### `yarn start`
Starts the dev server and generates GraphQL queries/mutations for TypeScript.

### `yarn android`
Runs the app in an android emulator.

### `yarn ios`
Runs the app in the iOS emulator.

### `yarn generate`
Generates type definitions, queries, and mutations for TypeScript.