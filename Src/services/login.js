const { CognitoIdentityProviderClient, AdminInitiateAuthCommand } = require("@aws-sdk/client-cognito-identity-provider");
const jwt = require('jsonwebtoken');
const { fromIni } = require("@aws-sdk/credential-provider-ini");
exports.handler = async (event) => {
    // Extract user input from the event body
    const { username, password } = JSON.parse(event.body);
console.log(username);
console.log(password);
    // Define parameters for the AdminInitiateAuth operation
    const params = {
        AuthFlow: 'ALLOW_REFRESH_TOKEN_AUTH',
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
        const client = new CognitoIdentityProviderClient({ region: "me-south-1", credentials: fromIni({}) });

        console.log("client");
        console.log(params)
        // Call the AdminInitiateAuthCommand to authenticate the user
        const data = await client.send(new AdminInitiateAuthCommand(params));

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