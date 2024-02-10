// Conectarse a la base de datos admin
var db = connect('mongodb://127.0.0.1');

// Asignar roles de restore y backup al usuario root en la base de datos movies
db.grantRolesToUser('root', ['restore'], { db: 'movies' });
db.grantRolesToUser('root', ['backup'], { db: 'movies' });

// Ejecutar el comando mongorestore para restaurar los datos
var restoreCommand =
  'mongorestore --username root --password example -d movies /docker-entrypoint-initdb.d/movies'
var restoreResult = system(restoreCommand)
