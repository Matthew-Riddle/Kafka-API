import express, { Request, Response, Application } from 'express'
import cors from 'cors'
import routes from './routes/routes'

const app = express()
const port = 3000
// import { Kafka } from 'kafkajs'
import { connectKafka } from './kafkaClient'

// const kafka = new Kafka({
//   clientId: 'OnRamp-API-proxy',
//   brokers: [process.env.KAFKA_BROKER || 'kafka-dev:9092'],
//   retry: {
//     initialRetryTime: 300,
//     retries: 10
//   }
// })

// const producer = kafka.producer()
// const consumer = kafka.consumer({ groupId: 'test-group' })
const start = async () => {

  await connectKafka()
  // await producer.connect()
  // console.log('Producer Connected')

  // await producer.send({
  //   topic: 'topic-test',
  //   messages: [
  //     { value: 'Message from the producer sent to the consumer.' },
  //   ],
  // })
  
  // await consumer.connect()
  // await consumer.subscribe({ topic: 'topic-test', fromBeginning: true })

 // await consumer.run({
 //   eachMessage: async ({ topic, partition, message }) => {
 //     console.log({
 //       value: message.value.toString(),
 //     })
 //   }
 // })

  app.use(cors())
  app.use(express.json())
  app.use('/', routes)
  app.listen(port, () => {
    console.log(`API running on port ${port}`)
  })
}


start()



process.on('SIGINT', async () => {
  await producer.disconnect()
  console.log('Producer disconnected')
  await consumer.disconnect()
  console.log('Consumer disconnected')
  process.exit(0)
})
