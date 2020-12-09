import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { todosRepo } from './modules/todos/repos';
import { TodoRepo } from './modules/todos/repos/todoRepo';

export type Context = { todosRepo: TodoRepo };

const server = new ApolloServer({
  context: () => ({ todosRepo } as Context),
  typeDefs,
  resolvers,
  // cors: {
  //   credentials: true,
  //   origin: (origin, callback) => {
  //     const whitelist = [
  //       'http://localhost:3000',
  //       'https://react-typescript-saga.vuquangit.vercel.app',
  //       'https://react-typescript.vercel.app',
  //     ];

  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  // },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

if ((module as any).hot) {
  (module as any).hot.accept();
  (module as any).hot.dispose(() => {
    console.log("Module disposed");
  });
}
