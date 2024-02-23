const { CognitoIdentityProviderClient, SignUpCommand } = require("@aws-sdk/client-cognito-identity-provider");

exports.handler = async (event) => {
    // Extract user input from the event body
   // console.log(JSON.parse(event.body));
    const { username, password, email, CPR, PhoneNumber } = JSON.parse(event.body);
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(CPR);
    console.log(PhoneNumber);
    // Define parameters for the signup operation
    const params = {
        ClientId: '6qg78b8vprghqonr5tn48pfjjo', // Specify your Cognito app client ID
        Username: username,
        
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
                
            },
            // ,
            // {
            //     Name: 'CPR',
            //     Value: CPR,
                
            // },
             {
                 Name: 'phone_number',
                 Value: PhoneNumber,
                
             }
            // Add more user attributes if needed
        ]
    };
    console.log("first");
    // Create a new CognitoIdentityProviderClient instance
    const client = new CognitoIdentityProviderClient({ region: "me-south-1" });
    console.log("Second");
    try {
        // Call the SignUpCommand to register the user
        const data = await client.send(new SignUpCommand(params));
        console.log(data);
        // Log the data retrieved from Cognito
        console.log('Signup successful:', data);

        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User signed up successfully' })
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