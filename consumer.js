const amqp = require("amqplib")

connect()
async function connect() {

    try {

        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const result = await channel.assertQueue("jobs")
        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString())
            console.log(`recieved job with input ${input.number}`)

            // if the message recieved satisfies the job execution and 
            // no error is returned we send an acknowledge on channel 

            if (input.number == 19)
                channel.ack(message);
        })
        console.log("Waiting for messages....")
    } catch (error) {
        console.log(error)
    }

}