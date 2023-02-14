'use strict'
var Usuario=require('../models/usuario');
var LoginUsuario= require('../models/login.usuario');
var fs=require('path');
const path = require('path');
const loginUsuario = require('../models/login.usuario');
var controller={
    inicio:function(req,res){
        return res.status(201).send(
            "<h1>Hola 2</h1>"
        );
    },

    verificarUsuario:function(req,res){

        var usuario=new Usuario();
        var params=req.body;


        
        console.log(params)
        
        Usuario.findOne(params,(err,usuario)=>{
            
            if (err) return res.status(200).send(false);
            if(!usuario) return res.status(200).send(false);
            return res.status(200).send(true);
            
            
        })

        



        

    },
    saveUsuario:function(req,res){
        var usuario=new Usuario();
        var params=req.body;
        usuario.cedula=params.cedula;
        usuario.username= params.username;

        usuario.password= params.password;
        usuario.pregunta= params.pregunta;

        usuario.save((err,usuarioGuardado)=>{
            if (err) return res.status(500).send({message:'Error al guardar'});
            if(!usuarioGuardado) return res.status(404).send({message:'No se ha guardado el usuario'});
            return res.status(200).send({usuarioGuardado});
        })
    
    },

    /*
    getLibro:function(req,res){
        var libroId=req.params.id;
        if(libroId==null) return res.status(404).send({message:'El libro no existe'});
        
        Cliente.findById(libroId,(err,libro)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!libro) return res.status(404).send({message:'El libro no existe'});
            return res.status(200).send({libro});
        })

    },
    deleteLibro:function(req,res){
        var libroId=req.params.id;
                
        Cliente.findByIdAndRemove(libroId,(err,libroBorrado)=>{
            if (err) return res.status(500).send({message:'Error al borrar los datos'});
            if(!libroBorrado) return res.status(404).send({message:'No se puede eliminar el libro'});
            return res.status(200).send({libro:libroBorrado});
        })

    },
    updateLibro:function(req,res){
        var libroId=req.params.id;
        var update=req.body;
                
        Cliente.findByIdAndUpdate(libroId,update,{new:true},(err,libroActualizado)=>{
            if (err) return res.status(500).send({message:'Error al actualizar los datos'});
            if(!libroActualizado) return res.status(404).send({message:'El libro no existe para actulizar'});
            return res.status(200).send({libro:libroActualizado});
        })

    },
    uploadImage:function(req,res){
        var libroId=req.params.id;
        var fileName='Imagen no subida';

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\');
            var fileName=file_split[1];
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[1];
            if(fileExt=='png'||fileExt=='jpg'||fileExt=='jpeg'||fileExt=='gif'){
                Cliente.findByIdAndUpdate(libroId,{imagen:fileName},{new:true},(err,libroActualizado)=>{
                    if (err) return res.status(500).send({message:'La imagen no se ha subido'});
                    if(!libroActualizado) return res.status(404).send({message:'El libro no existe y no se subiuo la imagen'});
                    return res.status(200).send({libro:libroActualizado});
                });
            }else{
                fs.unlink(filePath,(err)=>{
                    return res.status(200).send({message:'La extension no es valida'});
                });
            }
        }else{
            return res.status(200).send({message:fileName});
        }
    },
    getImagen:function(req,res){
        var file=req.params.imagen;
        var path_file="./uploads"+file;
        fs.exists(path_file,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                res.status(200).send({message:'La imagen no existe'});
            }
        })
    }
    */

}
module.exports=controller;