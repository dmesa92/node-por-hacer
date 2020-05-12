"use strict"

const descripcion = {
        demand: true,
        alias: 'd',
    },
    completado = {
        default: true,
        alias: 'c'
    }
const optCreate = {
    descripcion
}
const optList = {}
const optActualizar = {
    descripcion,
    completado
}
const argv = require("yargs")
    .command('crear', 'Crea una tarea por hacer', optCreate)
    .command('borrar', 'Borra una tarea por hacer', optCreate)
    .command('listar', '"Listar todas las tareas por hacer', optList)
    .command('actualizar', 'Actualiza una tarea', optActualizar)
    .help().argv;
module.exports = {

    argv
}