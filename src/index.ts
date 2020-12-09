import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { todosRepo } from './modules/todos/repos';
import { TodoRepo } from './modules/todos/repos/todoRepo';
const express = require('express');

export type Context = { todosRepo: TodoRepo };

const server = new ApolloServer({
  context: () => ({ todosRepo } as Context),
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

if ((module as any).hot) {
  (module as any).hot.accept();
  (module as any).hot.dispose(() => {
    console.log('Module disposed');
  });
}
