# Usamos la imagen oficial de Node.js
FROM node:18

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto del servicio
EXPOSE 3003

# Comando para ejecutar la aplicación
CMD ["node", "src/index.js"]
