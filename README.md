# weather-app-sam



This app is made for a workshop for introduction of serverless aplication. This app use AWS Serverless Application Model:


sam package --s3-bucket sam-bucket-mahdi --template-file template.yaml --region eu-central-1 --output-template-file packaged.yaml


sam deploy --template-file packaged.yaml --capabilities CAPABILITY_NAMED_IAM --stack-name weather-app