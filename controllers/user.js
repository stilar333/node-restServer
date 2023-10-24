const { response } = require("express");


const usuariosGet = (req, res = response) => {
    const {q, nombre, apikey} = req.query;

    res.json({
        ok: true,
        "msg": "get api - Controller",
        q, nombre, apikey
    });
};


const usuariosPost = (req, res = response) => {

    res.json({
        ok: true,
        "msg": "Post api - Controller",
    });
};


const usuariosPut = (req, res = response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        "msg": "Put api - Controller",
        id
    });
};


const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        "msg": "Delete api - Controller"
    });
};




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}