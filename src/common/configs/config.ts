import type { Config } from './config.interface'
const config: Config = {
  nest: {
    port: 4001
  },
  cors: {
    enabled: true
  },
  swagger: {
    enabled: true,
    title: 'Nestjs Rest',
    description: 'The nestjs API description',
    version: '1.0.0',
    path: 'api'
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema/schema.graphql',
    sortSchema: true
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10
  }
}

export default (): Config => config
