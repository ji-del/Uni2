# Usa Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que corre el servicio
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "src/index.js"]
