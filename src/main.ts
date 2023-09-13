import 'dotenv/config'
// import { graphqlUploadExpress } from 'graphql-upload'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
// import { PrismaClient } from '@prisma/client'

// const client = new PrismaClient()

const PORT = process.env.PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))

  app.startAllMicroservices()

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false
    })
  )
  // Swagger Api
  // if (swaggerConfig.enabled) {
  //   const options = new DocumentBuilder()
  //     .setTitle(swaggerConfig.title || 'Nestjs')
  //     .setDescription(swaggerConfig.description || 'The nestjs API description')
  //     .setVersion(swaggerConfig.version || '1.0')
  //     .build()
  //   const document = SwaggerModule.createDocument(app, options)

  //   SwaggerModule.setup(swaggerConfig.path || 'api', app, document)
  // }
  // enable shutdown hook
  app.enableShutdownHooks()
  // Cors
  if (process.env.CORS_ENABLE === '1') {
    app.enableCors()
  }

  await app.listen(PORT)
  // const user = await client.user.create({
  //   data: {
  //     email: 'lar@sim.com',
  //     firstname: 'Laraib',
  //     lastname: 'Hashim',
  //     password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
  //     role: 'User'
  //   }
  // })
  // console.log(user)
}

bootstrap().catch((error) => {
  // new Logger({ component: SERVICE_NAME, isProduction: true }).error(
  //   error.message,
  //   error
  // )
  console.log(error)
  process.exit(1)
})
