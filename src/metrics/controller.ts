import { Controller, Get, Res } from '@nestjs/common'
import { register } from 'prom-client'
import type { Response } from 'express'

@Controller()
export class MetricsController {
  constructor() {}

  @Get('/metrics')
  async index(@Res() res: Response): Promise<void> {
    res.header('Content-Type', register.contentType)

    const appMetrics = await register.metrics()
    res.send(appMetrics)
  }
}
