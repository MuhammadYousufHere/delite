import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AppService } from './app.service'
import { AppController } from './app.controller'
import { AppResolver } from './app.resolver'
import config from './common/configs/config'
import { GqlConfigService } from './gql-config-service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver]
})
export class AppModule {}
