#!/bin/bash

# Restaurar la base de datos desde el archivo de volcado
#mongorestore -d movies /docker-entrypoint-initdb.d
mongorestore -d  movies ./docker-entrypoint-initdb.d/movies