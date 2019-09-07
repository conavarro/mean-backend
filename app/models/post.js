const mongoose = require('mongoose');

const postSchema = mongoose.Schema({// Schema es un blueprint (una especie de inteface)
    nombre: String,
    contenido: String,
    detalle: String    
});

module.exports = mongoose.model('Post', postSchema);
//aca transformo a ese esquema en un modelo para poder usar su magia (ODM)