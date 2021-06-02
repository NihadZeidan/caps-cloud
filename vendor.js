const uuid = require('uuid').v4;
const { Producer } = require('sqs-producer');

const producer = Producer.create({
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/866993042921/packages',
    region: `us-east-1`,
});

// let counter = 0;

setInterval(async() => {

    try {
        const message = {
            orderId: uuid(),
            customer: "Jane Doe",
            vendorId: 'arn:aws:sqs:us-east-1:866993042921:vendor'
        }

        const response = await producer.send(message);
        console.log(response);
    } catch (e) {
        console.error(e);
    }
}, 4000);