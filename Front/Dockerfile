# Usar la imagen base de Nginx
FROM nginx:alpine

# Establecer el directorio de trabajo en Nginx
WORKDIR /usr/share/nginx/html

# Eliminar los archivos predeterminados de Nginx
RUN rm -rf ./*

# Copiar los archivos construidos de Angular al directorio de Nginx
COPY dist/telcox .

# Copiar el archivo de configuración de Nginx
COPY conf.d/default.conf /etc/nginx/conf.d/default.conf


# Exponer el puerto 80
EXPOSE 4200

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]