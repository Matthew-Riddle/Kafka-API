import { Router, Request, Response } from 'express'
import { producer } from '../kafkaClient'
const router = Router()


router.get('/', (req, res) => {
  res.sendStatus(200)
})

router.get('/healthcheck', (req, res) => {
  console.log('### Main api Route ###')
  res.send('Health Check OK!')
})

router.post('/', async (req, res) => {
  console.log(`### Post: ${JSON.stringify(req.body)}`)
  await producer.send({
    topic: 'topic-test',
    messages: [
      { value: JSON.stringify(req.body) },
    ],
  })
  res.send('Sent!')
})

export default router
