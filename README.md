# Streetcred's API Example

## Steps to create: 
 - clone the repository
 `git clone https://github.com/streetcred-id/biz-card-demo`

 - install the dependencies
 `npm install .`

 - go to the Streetcred [developer portal](https://developer.streetcred.id) and create an account

 - In the Subscriptions tab, create a sandbox subscription

 - In the Keys and Secrets tab, add a subscription key. 

- Paste your subscription key and access token into your .env file 

- Create an organization 

- Add the tenant_id to your .env file

- Create a credential definition with the swaggerhub documents
 - authenticate with your api keys. Make sure to add bearer to the beginning of the subscription key
 - add the schema ID from the .env file to the `id` value
 - change revocation to false
 
- Add the credential definition ID to your .env file

- run the application
`npm run start`

- pray to whatever god you believe in

- add the fields of the credential

- click issue credential

- scan with your iOS device

- receive your business card


 