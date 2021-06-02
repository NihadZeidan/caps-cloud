  const AWS = require('aws-sdk');
  const uuid = require('uuid').v4;

  AWS.config.update({ region: 'us-east-1' });

  const sns = new AWS.SNS();

  const topic = 'arn:aws:sns:us-east-1:866993042921:pickup';

  setInterval(() => {

      const message = {
          orderId: uuid(),
          customer: 'anyName',
          vendorId: 'arn:aws:sqs:us-east-1:866993042921:vendor'
      };

      const payload = {
          //   must be stringified
          Message: JSON.stringify(message),
          TopicArn: topic,
      };

      sns.publish(payload).promise()
          .then(data => {
              console.log(data);
          })
          .catch(console.error);
  }, 5000);


  //   ----------


  const { Consumer } = require('sqs-consumer');

  const app = Consumer.create({
      queueUrl: 'https://sqs.us-east-1.amazonaws.com/866993042921/vendor',
      handleMessage: handler,
  });

  function handler(message) {
      console.log(message.Body);
  }

  app.on('error', (err) => {
      console.error(err.message);
  });

  app.on('processing_error', (err) => {
      console.error(err.message);
  });


  //   ------------------


  app.start();