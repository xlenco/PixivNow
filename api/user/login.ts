import { VercelRequest, VercelResponse } from '@vercel/node'
import { handleError } from '../utils'
// import PixivApp from 'pixiv-app-api'
import PixivApp from 'pixiv-api-client'

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' })
  }
  const { username, password } = req.body || {}
  if (!username || !password) {
    return res.status(403).send({ error: 'Invalid request' })
  }

  const app = new PixivApp()
  return app.login(username, password).then(
    (data) => {
      return res.send(data)
    },
    (err) => {
      return handleError(err, res)
    }
  )
}
