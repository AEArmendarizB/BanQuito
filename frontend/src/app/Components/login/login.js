function validate(){
    var usr=document.getElementById("user").value;
    var password=document.getElementById("pass").value;

    if(usr=="admin" && password=="admin"){
        alert('Ingreso exitosamente');
        return false;
    }
    
}