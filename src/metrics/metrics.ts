import { Injectable, OnModuleDestroy } from '@nestjs/common'

import { register } from 'prom-client'
import { metricsCreator } from './helper'

@Injectable()
export class Metrics implements OnModuleDestroy {
  onModuleDestroy(): void {
    register.clear()
  }
  socketIoEventCounter = metricsCreator.counter('socket_io_counter', ['event'])
  socketIoEventTimer = metricsCreator.timer('socket_io_timer', ['event'])
  socketIoConnectionGuage = metricsCreator.guage('socket_io_connection_counter')

  gqlRequest = metricsCreator.counter('gql_resguest', ['operation'])
  gqlError = metricsCreator.counter('gql_error', ['operation'])
  gqlTimer = metricsCreator.timer('gql_timer', ['operation'])
}
