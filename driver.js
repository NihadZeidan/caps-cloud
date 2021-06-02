const uuid = require('uuid').v4;


const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const producer = Producer.create({
    queueUrl: `https://sqs.us-east-1.amazonaws.com/866993042921/vendor`,
    region: `us-east-1`,
});

let counter = 0;
const app = Consumer.create({
    queueUrl: 'https://sqs.us-east-1.amazonaws.com/866993042921/driver',
    handleMessage: async(msg) => {
        let parsedBody = JSON.parse(msg.Body);
        let parseMsg = JSON.parse(parsedBody.Message);
        await done();
    }
});


app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});



app.start();



// ---------------------

function done() {
    setTimeout(async() => {

        try {
            const message = {
                id: uuid(),
                body: `${counter++}-Request Delivery}`,
            };

            const response = await producer.send(message);
            console.log(response);
        } catch (e) {
            console.error(e);
        }
    }, 5000);

}