const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const http = require('http');
//  Crear un servidor de Express
const app = express();
// Crear un servidor de HTTP para Express
const httpServer = http.createServer(app);
// Middleware de CORS y JSON para Express
app.use(cors());
app.use(express.json());
//  Definir typeDefs, resolvers y data
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    users: [User!]
    user(id: ID!): User
  }
`;
const data = {
    users: [
        { id: '1', name: 'Juan Manuel Meneses', email: 'jmenesesi@jmenesesi.com' },
        { id: '2', name: 'Marlon Mota del Campo', email: 'rmotad@jmenesesi.com' },
    ],
};
const resolvers = {
    Query: {
        user: (parent, { id }) => data.users.find((u) => u.id === id),
        users: () => data.users,
    },
};
//  Configurar Apollo Server con typeDefs y resolvers
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
//  Iniciar Apollo Server y conectarlo con Express
(async () => {
    await server.start();
    //  Usar expressMiddleware para conectar Apollo Server con Express
    app.use(expressMiddleware(server));
    //  Iniciar el servidor de Express
    httpServer.listen(4000, () => {
        console.log('🚀 Apollo Server listo en http://localhost:4000/');
    });
})();
