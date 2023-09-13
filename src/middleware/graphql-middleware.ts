import { type GraphQLFormattedError, GraphQLSchema } from 'graphql'
import { applyMiddleware, IMiddleware } from 'graphql-middleware'

export class GraphQLMiddlware {
  private schema: GraphQLSchema
  private middlewareFunction: IMiddleware[]

  constructor(schema: GraphQLSchema, middlewareFunction?: IMiddleware[]) {
    this.schema = schema
    this.middlewareFunction = middlewareFunction
  }
  public static errorLoggerMiddleware(
    formattedError: GraphQLFormattedError
  ): GraphQLFormattedError {
    // TODO - logger

    return formattedError
  }
  public getMiddlewareAppliedSchema() {
    return applyMiddleware(this.schema, ...this.middlewareFunction)
  }
}
