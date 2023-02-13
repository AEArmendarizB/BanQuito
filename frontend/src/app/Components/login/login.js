function validate(){
    var usr=$("#user").val();
    var password=$("#pass").val();

    if(usr=="admin" && password=="admin"){
        window.alert('Ingreso exitosamente');
    }
    return false;
    
}
$("#validate").bind("click", validate);

/*
XCon NgOniti cargo los usuarios
una vez cin ek arreglo de objetos debemos validar los usuarios por el formulario

Coger los datos y mandar a consultar
res.status.redirect

angular login and redirect

Dentro del componente login, user and password
metodo comparacion

capturar los datos con un metodo

login page angular

*/