import express, { Request, Response, Applicaiton } from 'express'
import cors from 'cors'

const app = express()
const port = 3000
import { Kafka } from 'kafkajs'


const kafka = new Kafka({
  clientId: 'OnRamp-API-proxy',
  brokers: [process.env.KAFKA_BROKER || 'kafka-dev:9092'],
  retry: {
    initialRetryTime: 300,
    retries: 10
  }
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })
const start = async() => {

  
  await producer.connect()
  console.log('Producer Connected')

  await producer.send({
    topic: 'topic-test',
    messages: [
      { value: 'Message from the producer sent to the consumer.' },
    ],
  })
  
  await consumer.connect()
  await consumer.subscribe({ topic: 'topic-test', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    }
  })
}

app.use(cors())

start()

app.get('/', (req, res) => {
  res.send('Healthcheck OK!')
})

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})

process.on('SIGINT', async () => {
  await producer.disconnect()
  console.log('Producer disconnected')
  await consumer.disconnect()
  console.log('Consumer disconnected')
  process.exit(0)
})
