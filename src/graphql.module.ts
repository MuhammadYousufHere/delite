import { type ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { GraphQLModule } from '@nestjs/graphql'
import { Global, Module } from '@nestjs/common'
import type { Request, Response } from 'express'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { Metrics } from './metrics/metrics'
import { GQLLoggerPlugin } from 'graphql/logger-plugin'

@Global()
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (config, metrics: Metrics) => ({
        ...config.graphql,
        path: `${config.path}/graphql`,
        context: ({ req, res }: { req: Request; res: Response }) => ({
          req,
          res
        }),
        csrfPrevention: {
          requestHeaders: ['Content-Type']
        },
        autoSchemaFile: join(fileURLToPath(__dirname), '..', 'schema.gql'),
        plugins: [new GQLLoggerPlugin(metrics)]
      }),
      inject: [Metrics]
    })
  ]
})
export class GQLModule {}
