```markdown
## Proceso para ejecutar el proyecto en NestJS

1. **Instalar Dependencias**
   ```bash
   npm install
   ```
   Esto instalará todas las dependencias necesarias para ejecutar el proyecto.

2. **Configuración del Entorno con Docker**
   El proyecto utiliza Docker para crear y gestionar un contenedor con pgAdmin y una base de datos PostgreSQL.

   - **Comando para levantar Docker:**
     ```bash
     docker-compose up -d
     ```
   
   - **Credenciales para pgAdmin:**
     - **Correo**: `prueba_tecnica@gmail.com`
     - **Contraseña**: `passdatabasepaulo`
   
   Una vez levantado Docker, accede a pgAdmin para crear una conexión usando la configuración de los archivos `.env` y `docker-compose.yml`.

3. **Crear la Base de Datos**
   En pgAdmin, crea una nueva base de datos con el nombre especificado en la configuración de TypeORM:
   
   - **Nombre de la base de datos**: `prueba_tecnica_control`

4. **Ejecutar Migraciones**
   Con la conexión y base de datos creadas, ejecuta el siguiente comando para aplicar las migraciones y crear las tablas en PostgreSQL:
   
   ```bash
   npm run migration:run
   ```

5. **Iniciar el Proyecto en Modo Desarrollo**
   Finalmente, para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:
   
   ```bash
   npm run start:dev
   ```
