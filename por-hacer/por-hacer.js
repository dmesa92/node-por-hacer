"use strict"
const fs = require("fs");
const db = "db/data.json";
let listadoPorHacer = [];

const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };
    let encontrada = false;
    listadoPorHacer.forEach(tarea => {
        if (tarea.descripcion === porHacer.descripcion) encontrada = true
    });
    if (!encontrada) {
        listadoPorHacer.push(porHacer);
        guardarDB();
        return porHacer;
    }
    return 'La tarea no ha sido creada porque ya existe.';

}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    let boolean = false;
    if (listadoPorHacer.length !== nuevoListado.length) {
        boolean = true;
        listadoPorHacer = nuevoListado;
        guardarDB();
    }
    return boolean;
}


const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile(db, data, (err) => {
        if (err) throw new Error("No se pudo grabar,", err)
    });
}

const cargarDB = () => {

    try {
        listadoPorHacer = require('./../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}