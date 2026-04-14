import { Kafka, Producer } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'OnRamp-API-proxy',
  brokers: [process.env.KAFKA_BROKER || 'kafka-dev:9092'],
  retry: {
    initialRetryTime: 300,
    retries: 10
  }
})

export const producer: Producer = kafka.producer()

export const connectKafka = async () => {
  await producer.connect()
  console.log('Producer Connected')
}
