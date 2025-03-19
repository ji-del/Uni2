# Usamos la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del servicio
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "src/index.js"]
