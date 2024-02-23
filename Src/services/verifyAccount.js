const { CognitoIdentityProviderClient, ConfirmSignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

exports.handler = async (event) => {
    // Extract user input from the event body
    const { username, confirmationCode } = JSON.parse(event.body);

    // Define parameters for the confirmation operation
    const params = {
        ClientId: '6qg78b8vprghqonr5tn48pfjjo', // Specify your Cognito app client ID
        ConfirmationCode: confirmationCode,
        Username: username
    };

    try {
        // Create a new CognitoIdentityProviderClient instance
        const client = new CognitoIdentityProviderClient({ region: "me-south-1" });

        // Call the ConfirmSignUpCommand to confirm the user sign-up
        const data = await client.send(new ConfirmSignUpCommand(params));

        // Log the data retrieved from Cognito
        console.log('User sign-up confirmed:', data);
      
      
        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User sign-up confirmed successfully' })
        };
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