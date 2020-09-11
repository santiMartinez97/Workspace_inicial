//Función que guarda los datos ingresados en los input de la web.
function saveData(){
    var user = document.getElementById("inputUser").value;
    localStorage.setItem("inputUser", user);
    var password = document.getElementById("inputPassword").value;
    localStorage.setItem("inputPassword", password);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //Función que se ejecuta al hacer click en el botón de enviar, guardará los datos del input
    //y, si estos cumplen con la condición, redireccionará a la pagina de inicio de la web.
    document.getElementById("submitData").addEventListener("click", function(){
        saveData();
        var localUser = localStorage.getItem("inputUser");
        var localPassword = localStorage.getItem("inputPassword");
        if(localUser.length != 0 && localPassword.length != 0){
            window.location.href=("index.html");
            alert("¡Bienvenido a eMercado, " + localUser + "! Gracias por elegirnos.");
        }else{
            alert("Datos incompletos. Por favor, escriba su usuario y contraseña.")
        }
    });
    //Función para que al pulsar enter se envien los datos.
    document.getElementById("inputPassword").addEventListener("keyup", function(e){
        if (e.key === 'Enter') {
            // Click en el botón de enter.
            document.getElementById("submitData").click();
        }
    });
});