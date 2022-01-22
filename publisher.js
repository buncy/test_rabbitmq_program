const amqp = require("amqplib")

const msg = { number: process.argv[2] }
connect()
async function connect() {

    try {

        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel()
        const result = await channel.assertQueue("jobs")

        //now send to the jobs queue
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)))
        console.log(`job sent successfully ${msg.number}`)
    } catch (error) {
        console.log(error)
    }

}