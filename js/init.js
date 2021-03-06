const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json"; //"https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Esta función verificará si el usuario se encuentra logeado.
//Si el usuario no inició sesión, se lo redireccionará a la pagina de login.
//Si el usuario inició sesión o ya se encuentra en la pagina de login, no ocurrirá la redirección.
//El innerHTML agregará el email ingresado por el usuario a la barra de navegación
document.addEventListener("DOMContentLoaded", function(e){
  var localUser = localStorage.getItem("inputUser");
  var localPassword = localStorage.getItem("inputPassword");
  var url = location.href;
  //var nav = document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between")[0];
  var nav = document.getElementById("navbarDropdownMenuLink");
  if(localUser == null && localPassword == null && url.indexOf("login.html") == -1){
    location.replace("login.html");
}else{
  // Elimina el elemento que incluye la sección de el carrito y lo agrega a un desplegable que incluye
  // el usuario, perfil y una opción de cerrar sesión.
  //var cart = document.getElementsByTagName("a")[4];
  //cart.parentNode.removeChild(cart);
  nav.innerHTML += localUser;

document.getElementById("remove").addEventListener("click", function(e){
  localStorage.removeItem("inputUser");
  localStorage.removeItem("inputPassword");
});
};
});