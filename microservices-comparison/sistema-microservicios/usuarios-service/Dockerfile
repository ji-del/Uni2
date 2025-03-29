# Usamos la imagen oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Exponer el puerto del servicio
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "src/index.js"]
