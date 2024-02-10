// Conectarse a la base de datos admin
var db = connect('mongodb://root:example@localhost/admin');
// Ejecutar el comando mongorestore para restaurar los datos
var result = run('mongorestore', '--username=root', '--password=example', '--authenticationDatabase=admin', '--db=movies', '/docker-entrypoint-initdb.d/movies');

// Verificar el resultado
if (result !== 0) {
  print('Error al restaurar los datos');
  quit(1);
} else {
  print('Datos restaurados con éxito');
}

db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'movies'
    }
  ]
})