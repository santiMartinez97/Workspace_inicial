//Función que guarda los datos ingresados en los input de la web.
function saveData(){
    var user = document.getElementById("inputUser").value;
    sessionStorage.setItem("inputUser", user);
    var password = document.getElementById("inputPassword").value;
    sessionStorage.setItem("inputPassword", password);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //Función que se ejecuta al hacer click en el botón de enviar, guardará los datos del input
    //y, si estos cumplen con la condición, redireccionará a la pagina de inicio de la web.
    document.getElementById("submitData").addEventListener("click", function(){
        saveData();
        var sessionUser = sessionStorage.getItem("inputUser");
        var sessionPassword = sessionStorage.getItem("inputPassword");
        if(sessionUser.length != 0 && sessionPassword.length != 0){
            window.location.href="index.html";
            alert("¡Bienvenido a eMercado! Gracias por elegirnos.");
        };
    });
});