# <center>Actividad Final </center>

**Despliegue de Aplicacions Web**

> **Pablo Cortés Bravo** - _2nd DAW Semipresencial_

---

## <center>Documentación de la Práctica</center>

---

### Tareas Iniciales

- Crear un repositorio nuevo en github.
  - Una vez creado el repositorio clonamos el mismo en una carpeta de nuestro ordenador con el comando git clone [URL].

![Crear Repositorio](./public/img/Captura%20desde%202024-02-10%2012-18-55.png)

- Ahora vamos a crear una rama nueva con git branch a la que denominamos _main_docker_compose_

![Crear Rama](./public/img/Captura%20desde%202024-02-10%2012-20-11.png)

- Por último vamos a crear el archivo _docker-compose.yml_ en la carpeta raiz del proyecto en el que implementaremos los servicios.

![Docker-Compose](./public/img/Captura%20desde%202024-02-10%2012-50-35.png)

---

### Servicio mongdb

1. Utilizará la imagen de docker oficial de mongo.
2. El contenedor asociado se denominará _mongo_container_.
3. Será el primer servicio en arrancar.
4. La primera tarea que hará nada más arrancar será crear las tablas necesarias y realizar una restauración de datos partiendo de un fichero dump que previamente habréis generado y almacenado en una carpeta mongo de vuestro proyecto.
5. Todos los ficheros de configuración necesarios residirán en una carpeta mongo de nuestro repositorio

> Por lo tanto, lo primero que vamos a realizar es crear el archivo .yml y implementar las configuraciones básicas del servicio:

- Rellenamos el docker-compose con los 2 primeros puntos y asignamos el volumen con la carpeta mongo al container, como és el primer servicio que escribimos será el primer contenedor en ejecutarse (punto 3).

![Docker-Compose](./public/img/Captura%20desde%202024-02-10%2013-16-14.png)

![Carpeta_Mongo](./public/img/Captura%20desde%202024-02-10%2013-19-51.png)

> Vamos ahora con el cuarto apartado, y lo primero que hacemos un dump a la carpeta mongo de la base de datos de nuestro proyecto 'movies' que hemos realizado en la asignatura de 'Servidor'.

![DumpDB](./public/img/Captura%20desde%202024-02-10%2014-41-16.png)

![Archivos_Dump](./public/img/Captura%20desde%202024-02-10%2014-44-02.png)

> Luego creamos un archivo Javascript con el que nos conectaremos a la base de datos, restauraremos los datos que tenemos en los archivos exportados .bson y en el que crearemos un usuario en la base de datos restaurada.

![Javascript](./public/img/Captura%20desde%202024-02-13%2005-55-35.png)

> Añadimos toda la información necesaria al servicio mongodb, que en este caso serian el volumen junto con la ejecución del archivo Javascript y la red que vamos a crear para todos los servicios.

![MongoDB](./public/img/Captura%20desde%202024-02-13%2005-59-28.png)

- _Antes de seguir avanzando es muy recomendable ejecutar el servicio y comprobar que todo funciona correctamente_

---

### Servicio Backend

-Servicio de backend

- Igual que el servicio anterior, utilizará una multi-stage build (al menos tendrá dos etapas) para generar la imagen de la parte backend de vuestro proyecto implementada con express. Partirá de una imagen node:21
- No arrancará hasta que el servicio de mongodb no esté preparado completamente
- El contenedor asociado se denominará backend_container
- Ejecutará como primer comando nada más arrancar: npm start

> Para poder conseguir esto, lo primero que vamos a hacer es crear una carpeta dentro de la raiz de nuestro proyecto a la que denominaremos backend. Alli añadiremos todo el proyecto creado anteriormente

![Backend-Dependencies](./public/img/Captura%20desde%202024-02-13%2006-07-33.png)

> Una vez copiado todo el proyecto vamos a crear un Dockerfile para generar una imagen con todos los elementos del proyecto y que realize un npm install para instalar todas las dependencias. Vamos a utilizar la última versión de node, la 21.

![Dockerfile_Backend](./public/img/Captura%20desde%202024-02-13%2006-16-00.png)

> _Esto nos generará una imagen del proyecto con todas las dependencias instaladas y sobre esta imagen arrancaremos un contenedor en nuestro servicio de backend._

Ahora que tenemos definido el Dockerfile vamos a componer el servicio en Docker-Compose, para ello le indicaremos que realize el build de la imagen indicando la ubicación y el nombre del archivo, esta será la imagen que utilizará el contenedor, añadimos también la opción _**'depends on'**_ para que no arranque hasta que el servicio mongo este preparado.

![Docker_Compose_backend](./public/img/Captura%20desde%202024-02-13%2006-32-38.png)

> Aqui definimos también el volumen donde se encuentra nuestro proyecto y la carpeta de trabajo donde ejecutaremos el comando **node index.js** para arrancar nuestro servicio, esto dependera ya de como tenemos configurado nuestro proyecto.

> Notas de configuración: Para que nuestro servicio sea accesible desde fuera del contenedor tenemos que especificar el HOST como **'0.0.0.0'**, porque de otro modo no podremos acceder a él.

#### Si todo funciona correctamente podremos acceder a nuestro proyecto en la siguiente dirección : [http://localhost:9001](http://localhost:9001)

![Home](./public/img/Captura%20desde%202024-02-13%2007-23-53.png)

![Lista](./public/img/Captura%20desde%202024-02-13%2007-24-19.png)

---

### Servicio mongo-express

- Servicio mongo-express.
  - Nos permitirá administrar la base de datos mongo. Utilizará la imagen oficial de mongo-express (link)
  - El contenedor asociado se denominará adminMongo_container
  - Arrancará después del servicio de mongodb

> Vamos a configurar el servicio de mongo-express en nuestro docker-compose, para ello solamente necesitamos definir la imagen, que en este caso es _**mongo-express:latest**_ el nombre del contenedor _**adminMongo_container**_ , el comando _**depends on**_ , el puerto de acceso y la red de todo nuestro docker_compose. Quedando de la siguiente manera:

![Mongo-Express](./public/img/Captura%20desde%202024-02-13%2007-28-38.png)

Una vez todos los servicios en marcha, podemos acceder al servicio desde el puerto que hemos especificado, también indicar que si no le indicamos un usuario y una contraseña, el acceso que viene por defecto es **user:admin** y **password:pass**.

Una vez dentro podremos gestionar la base de datos:

![Home-Express](./public/img/Captura%20desde%202024-02-13%2007-39-24.png)

![Movies-Express](./public/img/Captura%20desde%202024-02-13%2007-41-02.png)

---

### Servicio loadbalancer nginx

- Servicio de loadbalancer de nginx
  - Nos permitirá implementar un sistema de balanceo de carga/proxy en nuestro sistema
  - Partirá de la imagen oficial de nginx
  - Asociará un fichero de configuración de nginx (nginx.conf) que tendremos en la carpeta loadbalancer de nuestro repositorio con el mismo fichero de la carpeta /etc/nginx/ de la imagen. Este fichero nos permitirá implementar el balanceador de carga y su contenido será similar al adjuntado a esta tarea (realizando las modificaciones oportunas para adecuarlo a vuestras necesidades).
  - Ejecutará como primer comando nada más arrancar: nginx -g daemon off.

> Para ello crearemos una carpeta en nuestra raiz del proyecto llamada ./loadbalancer y dentro de ella colocaremos el archivo de configuración de nuestro nginx.

![loadbalancer](./public/img/Captura%20desde%202024-02-13%2008-53-53.png)

---

Ahora configurarmos nuestro nginx con las características de nuestros servicios.

![nginx.conf](./public/img/Captura%20desde%202024-02-13%2009-04-06.png)

---

Y por último añadimos el servicio al docker-compose para que ejecute el contenedor, hay que indicarle el puerto, el volumen donde copiaremos el archivo nginx.conf y el comando _**nginx -g daemon off**_ para que Nginx se ejecute en primer plano, no en segundo plano cuando se inicie el contenedor.

![nginx-docker](./public/img/Captura%20desde%202024-02-13%2009-13-45.png)
