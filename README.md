# <center>Actividad Final </center>

**Despliegue de Aplicacions Web**

> **Pablo Cortés Bravo** - _2nd DAW Semipresencial_

<hr>

## <center>Documentación de la Práctica</center>

<hr>

### Tareas Iniciales

- Crear un repositorio nuevo en github.
    - Una vez creado el repositorio clonamos el mismo en una carpeta de nuestro ordenador con el comando git clone [URL].

![Crear Repositorio](./public/img/Captura%20desde%202024-02-10%2012-18-55.png)

- Ahora vamos a crear una rama nueva con git branch a la que denominamos _main_docker_compose_

![Crear Rama](./public/img/Captura%20desde%202024-02-10%2012-20-11.png)


- Por último vamos a crear el archivo _docker-compose.yml_ en la carpeta raiz del proyecto en el que implementaremos los servicios.

![Docker-Compose](./public/img/Captura%20desde%202024-02-10%2012-50-35.png)

<hr>

### Servicio de mongdb

1. Utilizará la imagen de docker oficial de mongo.
2. El contenedor asociado se denominará _mongo_container_.
3. Será el primer servicio en arrancar.
4. La primera tarea que hará nada más arrancar será crear las tablas necesarias y realizar una restauración de datos partiendo de un fichero dump que previamente habréis generado y almacenado en una carpeta mongo de vuestro proyecto.
5. Todos los ficheros de configuración necesarios residirán en una carpeta mongo de nuestro repositorio


#### Por lo tanto, lo primero que vamos a realizar es crear el archivo .yml y implementar las configuraciones básicas del servicio:




- Rellenamos el docker-compose con los 2 primeros puntos y asignamos el volumen con la carpeta mongo al container, como és el primer servicio que escribimos será el primer contenedor en ejecutarse (punto 3).

![Docker-Compose](./public/img/Captura%20desde%202024-02-10%2013-16-14.png)

![Carpeta_Mongo](./public/img/Captura%20desde%202024-02-10%2013-19-51.png)

#### Vamos ahora con el cuarto apartado, y lo primero que hacemos un dump a la carpeta mongo de la base de datos de nuestro proyecto 'movies' que hemos realizado en la asignatura de 'Servidor'.

![DumpDB](./public/img/Captura%20desde%202024-02-10%2014-41-16.png)

![Archivos_Dump](./public/img/Captura%20desde%202024-02-10%2014-44-02.png)

- Luego creamos un archivo Javascript con el que nos conectaremos a la base de datos, restauraremos los datos que tenemos en los archivos exportados .bson y en el que crearemos un usuario en la base de datos restaurada.

![Javascript](./public/img/Captura%20desde%202024-02-10%2018-23-44.png)

- Añadimos toda la información necesaria al servicio mongodb, que en este caso serian las variables del usuario y contraseña, la base de datos y el volumen junto con la ejecución del archivo Javascript.

![MongoDB](./public/img/Captura%20desde%202024-02-10%2018-30-21.png)

- _Antes de seguir avanzando es muy recomendable ejecutar el servicio y comprobar que todo funciona correctamente_