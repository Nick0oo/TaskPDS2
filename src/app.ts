// npm install @apollo/server express graphql cors
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require ("@apollo/server/plugin/drainHttpServer");
const  cors = require("cors");
const  express = require("express");
const { sequelize } = require("./config/config");
const { resolvers } = require("./resolvers/index");
const { typeDefs: typeDefsSchema } = require("./schema/index");
const http = require("http");
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
	typeDefs : typeDefsSchema,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function initializeDB() {
	try {
		await sequelize.sync();
		console.log("✅ DB synchronized");
	} catch (error) {
		console.error("❌ DB sync failed:", error);
	}
}

initializeDB();

(async () => {
	await server.start();

	app.use(
		"/graphql",
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }: { req: Request }) => ({ req }),
		})
	);

	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000/graphql`);
})();
