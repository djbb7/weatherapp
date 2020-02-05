# weather-app-sam



This app is made for a workshop for introduction of serverless aplication. This app use AWS Serverless Application Model (SAM):



How to make it working

Register on https://openweathermap.org/ and get an apikey




Login to AWS with your credentials, make sure your are in Frankfurt (eu-central-1) region, open Cloud9 from AWS Console, create a new Cloud9 IDE, choose Ubuntu as your OS. Once IDE is created, open it and do followings in terminal:



```
git clone https://github.com/azarboon/weatherapp.git

```

You will be assigned a group number by instructor. Remember to replace it with yourGroupNumber in commands. This is to avoid having same stack names.


Create a S3 bucket for packaging your SAM application (replace yourGroupNumber). 

```
aws s3api create-bucket --bucket serverless-workshop-eficode-yourGroupNumber  --create-bucket-configuration LocationConstraint=eu-central-1 

```

From the left bar (editor), open file backend/weather/app.js and replace apiKey empty value with your api key (make sure to add it as string 'your-api-key')

Install npm dependecies for backend

```
cd weatherapp/backend/weather && npm install

```

Now go to root of your backend (that is, weatherapp/backend), package your SAM app (behind the scenes, it uploads your template.yaml to your s3 bucket and creates packaged.yaml), and then deploy your application (packaged.yaml). Don't foget to replace yourGroupNumber in both commands.

```
cd ..
sam package --s3-bucket serverless-workshop-eficode-yourGroupNumber --template-file template.yaml --region eu-central-1 --output-template-file packaged.yaml --region eu-central-1

sam deploy --template-file packaged.yaml --capabilities CAPABILITY_NAMED_IAM --stack-name weather-app-yourGroupNumber --region eu-central-1

```

"sam deploy" creates a Lambda function and an API gateway and links them together. Once deployment finish, you will see BaseApi in the outputs. Copy the outputed value. Now your backend
is ready. Let's have a frontend application hosted in AWS S3:


Open file backend/frontend/src/index.jsx and replace apiURL empty string with BaseApi value that you receieved (keep it as string)

Install frontend's npm dependencies


```
cd .. && cd frontend
npm install 
```

Create a build artifact

```
npm run build
```

Create a new S3 bucket to host your frontend. (replace yourGroupNumber in all commands)

```
aws s3api create-bucket --bucket serverless-workshop-eficode-frontend-yourGroupNumber  --create-bucket-configuration LocationConstraint=eu-central-1 

```

Configure your new bucket to host static website


```
aws s3 website  s3://serverless-workshop-eficode-frontend-yourGroupNumber/ --index-document index.html

```

Upload your build artifacts to s3:

```
aws s3 cp dist s3://serverless-workshop-eficode-frontend-yourGroupNumber/ --recursive --acl public-read

```

Now, you can check your website from this url :

https://serverless-workshop-eficode-frontend-yourGroupNumber.s3.eu-central-1.amazonaws.com/index.html