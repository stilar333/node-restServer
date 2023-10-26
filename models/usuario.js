/* {
    nombre : "Asdadssad",
    correo: "asasdas@.com",
    password: "2131123123",
    img: "213213123",
    rol: "weqeqeqe",
    estado: true,
    google: true, //o true si fue creado por google o false por mi autenticacion 
} */

const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({
    nombre: {
        type: String,

    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ["ADMIN_ROL", "USER_ROL"]
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false,
    }
})

UsuarioSchema.methods.toJSON = function (){
    const {__v, password, ...user} = this.toObject();
    return user;
}


module.exports = model("Usuario", UsuarioSchema);