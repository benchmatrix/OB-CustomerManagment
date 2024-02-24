require("dotenv").config();
const { CognitoIdentityProviderClient, SignUpCommand,InitiateAuthCommand  } = require("@aws-sdk/client-cognito-identity-provider");
const jwt = require('jsonwebtoken');
//const { StaticCredentialsProvider } = require("@aws-sdk");
//const { fromIni } = require("@aws-sdk/credential-provider-ini");


exports.handler = async (event) => {
    // Extract user input from the event body
    const { username, password } = JSON.parse(event.body);
console.log(username);
console.log(password);
    // Define parameters for the AdminInitiateAuth operation
    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: '6qg78b8vprghqonr5tn48pfjjo', // Specify your Cognito app client ID
        UserPoolId: 'me-south-1_KaYL4fupz', // Specify your Cognito user pool ID
        AuthParameters: {
            USERNAME: username,
            PASSWORD: password
        }
    };

    try {
        // Create a new CognitoIdentityProviderClient instance
      //  const client = new CognitoIdentityProviderClient({ region: "me-south-1" });
    //  aws_access_key_id = YOUR_ACCESS_KEY_ID
//aws_secret_access_key = YOUR_SECRET_ACCESS_KEY
        //const client = new CognitoIdentityProviderClient({ region: "me-south-1", credentials: fromIni({}) });
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

// Configuring AWS SDK with credentials and region

        const client = new CognitoIdentityProviderClient({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region
            //,
          //  credentials: new NewStaticCredentials({
           //     accessKeyId: 'AKIAXJMDEWVAXYHQVDKY',
          //      secretAccessKey: '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'
          //  })
        });
        console.log("params")
        console.log("client");
        console.log(params)
        // Call the AdminInitiateAuthCommand to authenticate the user
        const data = await client.send(new InitiateAuthCommand(params));

        // If authentication is successful, generate JWT token
        if (data && data.AuthenticationResult) {
            const { AccessToken, ExpiresIn } = data.AuthenticationResult;
            const tokenPayload = { username, exp: Math.floor(Date.now() / 1000) + ExpiresIn };
            const jwtToken = jwt.sign(tokenPayload, 'BENCHMATRIXASSBMAZHARHARAMI'); // Specify your secret key
          
            // Return the JWT token to the client
            return {
                statusCode: 200,
                body: JSON.stringify({ token: jwtToken })
            };
        } else {
            throw new Error('Authentication failed');
        }
    } catch (err) {
        console.error('Error:', err);

        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal Server Error',
                message: err.message
            })
        };
    }
}