# Documentación para Levantar el proyecto en Docker

Esta documentación detalla cómo levantar un proyecto compuesto por un frontend en Angular 16 y un backend en Python 3.6.0, utilizando Docker para contenerización.

---

### **Requisitos Previos**

1. **Instalar Docker**:
    - Asegúrate de tener Docker instalado y funcionando.
2. **Base de datos MySQL**:
    - Debes tener una base de datos MySQL configurada y accesible desde tu entorno local.
    - Configura los siguientes parámetros para la base de datos:
        - **Host**: `<IP_LOCAL>`
        - **Puerto**: `3306` (o el configurado en tu sistema)
        - **Nombre de la base de datos**: `<nombre_base_datos>`
        - **Usuario**: `<usuario>`
        - **Contraseña**: `<contraseña>`

---

### **Pasos para Levantar el Proyecto**

### **1. Levantar el Frontend**

1. **Instalar dependencias**:
Desde la carpeta del frontend, ejecuta el siguiente comando para instalar las dependencias de Node.js:
    
    ```bash
    npm install
    ```
    
2. **Generar el distribuido (build)**:
Ejecuta el siguiente comando para generar el artefacto de producción:
    
    ```bash
    ng build --configuration production
    ```
    
3. **Construir la imagen Docker**:
Genera la imagen del contenedor Docker para el frontend con el comando:
    
    ```bash
    docker build --no-cache -t front .
    ```
    

---

### **2. Levantar el Backend**

1. **Construir la imagen Docker**:
Desde la carpeta del backend, ejecuta el siguiente comando para construir la imagen Docker:
    
    ```bash
    docker build --no-cache -t back .
    ```
    

---

### **3. Configurar la Base de Datos**

Asegúrate de que la base de datos MySQL esté configurada para aceptar conexiones desde el backend:

1. **Configura la base de datos para aceptar conexiones externas** (en caso necesario).
    - Verifica que `bind-address` en la configuración de MySQL (`my.cnf` o `mysqld.cnf`) esté establecido como `0.0.0.0`:
        
        ```
        [mysqld]
        bind-address = 0.0.0.0
        ```
        
    - Otorga permisos al usuario para acceder desde cualquier dirección:
        
        ```sql
        GRANT ALL PRIVILEGES ON *.* TO '<usuario>'@'%' IDENTIFIED BY '<contraseña>';
        FLUSH PRIVILEGES;
        ```
        
2. **Verifica que el puerto 3306 esté accesible**.

---

### **4. Ejecutar los Contenedores**

Una vez que ambas imágenes (frontend y backend) estén construidas y la base de datos configurada, ejecuta los contenedores:

- **Levantar el frontend**:
    
    ```bash
    docker run -d -p 4200:4200 --name front-container front
    ```
    
    Esto hará que el frontend sea accesible desde `http://<IP_LOCAL>:4200`.
    
- **Levantar el backend**:
    
    ```bash
    docker run -d -p 5000:5000 --name back-container back
    ```
    
    Esto hará que el backend sea accesible desde `http://<IP_LOCAL>:5000`.
    

---


1. **Frontend**:
    - Abre en tu navegador: http://`<IP_LOCAL>`4200.
2. **Backend**:
    - Usa herramientas como Postman o cURL para enviar solicitudes al backend en: http://`<IP_LOCAL>`:5000/rest/bss_service/v1.0/ui.


### **Adicional** Manual de usuario

https://honey-hose-fed.notion.site/Manual-de-Usuario-Sistema-Telco-X-228bf64affe743f787774fcfef70b96a
