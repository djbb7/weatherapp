# weather-app-sam



This app is made for a workshop for introduction of serverless aplication. This app use AWS Serverless Application Model:



How to make it working

Register on https://openweathermap.org/ and get an apikey



cd backend
Login to AWS with your credentials, make sure your ar in eu-central-1 region, open Cloud9 in your services, create a new Cloud9 IDE, choose Ubuntu as your OS.


In terminal, press following


git clone https://github.com/azarboon/weatherapp.git


aws configure

add the credentials that your received earlier.



yourGroupNumber
aws s3api create-bucket --bucket serverless-workshop-eficode-1  --create-bucket-configuration LocationConstraint=eu-central-1 







open file backend/weather/app.js and replace apiKey empty value with your api key (make sure to add it as string 'your-api-key')

cd weatherapp/backend

sam package --s3-bucket serverless-workshop-eficode-1 --template-file template.yaml --region eu-central-1 --output-template-file packaged.yaml


sam deploy --template-file packaged.yaml --capabilities CAPABILITY_NAMED_IAM --stack-name weather-app-yourGroupNumber