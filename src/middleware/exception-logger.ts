import {
  ArgumentsHost,
  Catch,
  Logger,
  HttpException,
  ExceptionFilter
} from '@nestjs/common'

import type { Request, Response } from 'express'
import { REQUEST_ID } from 'src/constants'

@Catch(HttpException)
export class ExceptionLogger implements ExceptionFilter {
  private logger = new Logger('ExceptionLogger')

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const req = ctx.getRequest<Request>()
    const reqId = req.header(REQUEST_ID)

    this.logger.error(
      new Error(`${reqId ? `request_Id-${reqId} ` : ''}${exception.message}`),
      exception.stack
    )

    const res = ctx.getResponse<Response>()
    if (exception instanceof HttpException) {
      res.json(exception.getResponse())
    } else {
      res.status(500).json({ message: exception.message, statusCode: 500 })
    }
  }
}
