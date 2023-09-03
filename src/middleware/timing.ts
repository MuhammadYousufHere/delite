import type { NextFunction, Request, Response } from 'express'

import onHeaders from 'on-headers'

export const serverTimingAndCache = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.res = res
  const now = process.hrtime()

  onHeaders(res, () => {
    const delta = process.hrtime(now)
    const constInMilliSeconds = (delta[0] + delta[1] / 1e9) * 1000

    const serverTiming = res.getHeader('Server-Timing') as string | undefined
    const serverTimingValue = `${
      serverTiming ? `${serverTiming} ,` : ''
    }total;dur=${constInMilliSeconds}`

    res.header('Server-Timing', serverTimingValue)
  })
  res.header('Cache-Control', 'max-age=0, private, must-revalidate')
  next()
}
