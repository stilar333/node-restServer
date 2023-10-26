const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");


const usuariosGet = async(req, res = response) => {
    let {limit = 5, desde = 0} = req.query;
    const query = {estado:true}
    if(isNaN(Number(limit)) || isNaN(Number(desde))){
        limit = 5;
        desde = 0
    }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    });
};


const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar si correo existe //esto se paso a corroborar con la db


    //encriptar
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)


    //guardar db
    await usuario.save();
    res.json({
        ok: true,
        "msg": "Post api - Controller",
        usuario
    });
};


const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id,password, google, correo,...resto } = req.body;
    //validar id contra base de datos
    if (password) {
        //encriptar
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuario);
};


const usuariosDelete = async (req, res = response) => {
    const {id} = req.params

    //borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id)
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.json({
        usuario
    });
};




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}