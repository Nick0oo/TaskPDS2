# Dockerfile
FROM node:18-alpine

# Carpeta de trabajo
WORKDIR /app

# Copia e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del proyecto
COPY . .

# Compila TypeScript
RUN npm run compile

# Expone el puerto donde corre el servidor
EXPOSE 3000

# Comando para ejecutar la app
CMD ["node", "dist/app.js"]
