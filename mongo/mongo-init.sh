#!/bin/bash

# Restaurar la base de datos desde el archivo de volcado
mongorestore -d --username root --password example movies /docker-entrypoint-initdb.d/movies
