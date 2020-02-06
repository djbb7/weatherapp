
//const apiKey = process.env.API_KEY || '';
const mapURI = "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";
const fetch = require('node-fetch');
const AWS = require('aws-sdk');

const fetchApiKey = async () => {
    let region = "eu-central-1",
        secretName = "openweather-api-key",
        secret,
        decodedBinarySecret;

    let client = new AWS.SecretsManager({
        region: region
    });

    let data = await client.getSecretValue({ SecretId: secretName }).promise();

    if (data && data.SecretString) {
        const secret = data.SecretString;
        const parsedSecret = JSON.parse(secret);
        return parsedSecret.api_key;
    }
};

const fetchWeather = async (apiKey) => {
    const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${apiKey}&units=metric`;
    const response = await fetch(endpoint);  
    return response ? response.json() : {}
  };


exports.lambdaHandler = async (event, context) => {
    let response;
    try {
        const apiKey = await fetchApiKey();
        const weatherData = await fetchWeather(apiKey);
        
        const body = weatherData;

        response = {
            'statusCode': 200,
            'body': JSON.stringify(body),
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        }
    } catch (err) {
        console.log(err)
        response = {
            'statusCode': 500,
            'body': JSON.stringify(err),
            'headers': {
                "Access-Control-Allow-Origin": "*"
            }
        }
    }

    return response
};
