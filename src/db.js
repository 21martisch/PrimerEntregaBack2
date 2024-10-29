const mongoose = require ("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://martinaschaller12:mabril21@cluster0.i8hjp.mongodb.net/ProyectoFinal?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Conectado")
    } catch (error){
        console.error('Error conectando a MongoDB', error);
    }
}

module.exports = connectDB;