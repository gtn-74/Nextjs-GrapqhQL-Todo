import { createYoga, createSchema } from 'graphql-yoga'
import type { NextApiRequest, NextApiResponse } from 'next'
import { YogaSchemaDefinition } from 'graphql-yoga/typings/plugins/useSchema';

export const config = {
  api: {
    bodyParser: false
  }
}

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      greetings: String
    }
  `,
  resolvers: {
    Query: {
      greetings: () => 'This is the `greetings` field of the root `Query` type'
    }
  }
}) as YogaSchemaDefinition<{
  req: NextApiRequest;
  res: NextApiResponse;
}>

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql'
})
