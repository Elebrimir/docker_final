// Conectarse a la base de datos admin
var db = connect('mongodb://127.0.0.1');

// Ejecutar el comando mongorestore para restaurar los datos
var restoreCommand =
  'mongorestore -d movies /docker-entrypoint-initdb.d/movies'
var restoreResult = system(restoreCommand)
