const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

// Cargar variables del .env
dotenv.config();


// Mostrar variables para depurar (opcional)
const databaseUrl =
	process.env.NODE_ENV === "development" ? process.env.DATABASE_URL : process.env.DATABASE_TEST_URL;
if (!databaseUrl) {
	throw new Error("Database URL is not defined in environment variables");
}

const sequelizeConfig = new Sequelize(databaseUrl, {
	dialect: "postgres",
	dialectOptions:
	  process.env.NODE_ENV === "production"
		? {
			ssl: {
			  require: true,
			  rejectUnauthorized: false,
			},
		  }
		: {}, // sin SSL en desarrollo
	logging: console.log,
  });
  


module.exports = {
	sequelize: sequelizeConfig, 
  };
  