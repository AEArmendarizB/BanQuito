'use strict'
var Respuesta=require('../models/respuesta');
var Cuenta=require('../models/cuenta');
var fs=require('path');
const path = require('path');
let i=0;

var controller={
    
    inicio:function(req,res){

        let result = '';
        

        let digitos = 10;
            let vr = true;

        do {

            
            
                let numero_cuenta = Math.floor(Math.random()*digitos);
                var cuenta = new Cuenta();
                cuenta.numero_cuenta = numero_cuenta;

                console.log(numero_cuenta);
                Cuenta.findOne({"cuenta":numero_cuenta},(err,usuario)=>{

            
                    if (err){
    
                        return res.status(200).send({message:'Error al recuperar los datos'});
                    } 
                    if(!usuario){
                        
                        i++;
                        return res.status(200).send({i});
                    } 
    
                    return res.status(200).send({numero_cuenta});
                    
                    
                })


        } while (i<1);

        

        
        
                

        


            
           
            
            

        

        //return res.status(200).send({message:'Error al recuperar los datos4'});
        


    },

    



    getClientes:function(req,res){
        Respuesta.find({}).sort().exec((err,respuestas)=>{
            if (err) return res.status(500).send({message:'Error al recuperar los datos'});
            if(!respuestas) return res.status(404).send({message:'No hay clientes para mostrar'});
            return res.status(200).send({respuestas});
        })

    },
    save:function(req,res){
        var respuesta=new Respuesta();
        var params=req.body;

        respuesta.respuesta=params.respuesta;
        
        respuesta.save((err,respuestaGuardado)=>{
            if (err) return res.status(500).send({message:'Error al guardar'});
            if(!respuestaGuardado) return res.status(404).send({message:'No se pudo guardar el cliente'});
            return res.status(200).send({respuestaGuardado});
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