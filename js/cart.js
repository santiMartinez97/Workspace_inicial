const trash = `<div id="trash" title="Eliminar producto" onclick="deleteProduct(this.id)" style="cursor:pointer;"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path title="Eliminar producto" d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></div>`
var shipValue = "";
var chosenPayment = "card";
var paymentCompleted = false;
var cityData = false;
var directionData = false;
let noArts = document.getElementById("noArtsError");
let buyError = document.getElementById("buyError");
let paymentForm = document.getElementById("paymentFormError");
let directionError = document.getElementById("direction");
let departmentError = document.getElementById("departmentSelect");
let shipError = document.getElementById("shipError");

//Función que mostrará los artículos del carrito.
function showCartArtsList(cartArray) {
    let htmlContentToAppend = "";
    for (let i = 0; i < cartArray.articles.length; i++) {
        let cartArt = cartArray.articles[i];
        htmlContentToAppend = `<tr id="product` + i + `">
        <td><img src="` + cartArt.src + `" class="img-thumbnail" width=100px></td>
        <td>` + cartArt.name + `</td>
        <td>` + cartArt.currency + ` <span id="cost` + i + `">` + cartArt.unitCost + `</span></td>
        <td><input class="form-control" type="number" placeholder="cant." value="` + cartArt.count + `"min="0" max="500" maxlength="3" id="inputCant` + i + `" onchange="calculateSubtotalByProduct(this.value,` + i + `)" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"></td>
        <td><strong>` + cartArt.currency + ` <span id="subCost` + i + `">` + cartArt.unitCost + `</span></strong></td>
        <td>` + trash + `</td>
      </tr>`
        document.getElementById("cartContainer").innerHTML += htmlContentToAppend;
        document.getElementById("trash").id = "trash" + i;
        calculateSubtotalByProduct(cartArt.count, i);
    }
    calculateSubtotalTotal();
    totalCost();
}

//Función que calcula el subtotal de un producto, según la cantidad ingresada por el usuario.
function calculateSubtotalByProduct(value, product) {
    let uCost = parseInt(document.getElementById("cost" + product).innerHTML);
    var newSubtotal = Math.round(uCost * value);
    document.getElementById("subCost" + product).innerHTML = newSubtotal;
    calculateSubtotalTotal();
    calculateShipCost(shipValue);
}

//Función que calcula la suma del subtotal de los productos.
function calculateSubtotalTotal() {
    let product0 = document.getElementById("product0");
    let product1 = document.getElementById("product1");
    if (product0 == undefined && product1 == undefined) {
        document.getElementById("subtotalCost").innerHTML = 0;
        totalCost();
    } else {
        if (product0 == undefined) {
            let subCost1 = parseInt(document.getElementById("subCost1").innerHTML);
            document.getElementById("subtotalCost").innerHTML = subCost1;
            totalCost();
        } else {
            if (product1 == undefined) {
                let subCost0 = parseInt(document.getElementById("subCost0").innerHTML);
                var newSubtotalTotal = Math.round(subCost0 / 40);
                document.getElementById("subtotalCost").innerHTML = newSubtotalTotal;
                totalCost();
            } else {
                let subCost0 = parseInt(document.getElementById("subCost0").innerHTML);
                let subCost1 = parseInt(document.getElementById("subCost1").innerHTML);
                var newSubtotalTotal = Math.round(subCost0 / 40 + subCost1);
                document.getElementById("subtotalCost").innerHTML = newSubtotalTotal;
                totalCost();
            }
        }
    }
}

//Función que calcula el costo de envío según la opción elegida por el usuario.
function calculateShipCost(value) {
    let subtotalTotal = document.getElementById("subtotalCost").innerHTML;
    if (value == "premium") {
        let newShipCost = Math.round(subtotalTotal * 0.15);
        document.getElementById("shipCost").innerHTML = newShipCost;
        shipError.style.display = "none";
    } else
        if (value == "express") {
            let newShipCost = Math.round(subtotalTotal * 0.07);
            document.getElementById("shipCost").innerHTML = newShipCost;
            shipError.style.display = "none";
        } else
            if (value == "standard") {
                let newShipCost = Math.round(subtotalTotal * 0.05);
                document.getElementById("shipCost").innerHTML = newShipCost;
                shipError.style.display = "none";
            }
    totalCost();
    shipValue = value;
}

//Función que calcula el total de la compra.
function totalCost() {
    let stc = parseInt(document.getElementById("subtotalCost").innerHTML);
    let sc = parseInt(document.getElementById("shipCost").innerHTML);
    var newTotalCost = stc + sc;
    document.getElementById("totalCost").innerHTML = newTotalCost;
}

//Función que elimina un producto.
function deleteProduct(id) {
    let product0 = document.getElementById("product0");
    let product1 = document.getElementById("product1");
    if (id == "trash0") {
        product0.remove();
        product0 = document.getElementById("product0");
    } else {
        if (id == "trash1") {
            product1.remove();
            product1 = document.getElementById("product1");
        }
    }
    if (product0 == undefined && product1 == undefined) {
        document.getElementById("cartContainer").innerHTML += `<tr><td colspan="5" align="center">No tienes productos en tu carrito :(</td></tr>`
    }
    calculateSubtotalTotal();
    calculateShipCost(shipValue);
}

//Función para desplegables de seleccionar departamento y ciudad.
var citiesByDepartment = {
    "Artigas": ["Artigas", "Baltasar Brum", "Bella Unión", "Sequeira", "Tomás Gomensoro", "Otro"],
    "Canelones": ["18 de mayo", "Aguas Corrientes", "Atlántida", "Barros Blancos", "Canelones", "Casarino", "Ciudad de la Costa", "Colonia Nicolich", "Empalme Olmos", "Estación Atlántida", "Estación La Floresta", "Fracc. Ruta 74", "Joaquín Suárez", "Juanicó", "La Floresta", "La Paz", "Las Piedras", "Las Toscas", "Los Cerrillos", "Marindia", "Migues", "Montes", "Neptunia", "Pando", "Parque del Plata", "Paso Carrasco", "Pinamar - Pinepark", "Progreso", "Salinas", "San Antonio", "San Bautista", "San Jacinto", "San Luis", "San Ramón", "Santa Lucía", "Santa Rosa", "Sauce", "Soca", "Tala", "Toledo", "Villa Aeroparque", "Villa Crespo y San Andrés", "Villa Felicidad", "Villa San José", "Otro"],
    "Cerro Largo": ["Aceguá", "Fraile Muerto", "Isidoro Noblía", "Melo", "Río Branco", "Tupambaé", "Otro"],
    "Colonia": ["Carmelo", "Colonia del Sacramento", "Colonia Valdense", "Florencio Sánchez", "Juan Lacaze", "Nueva Helvecia", "Ombúes de Lavalle", "Rosario", "Tarariras", "Otro"],
    "Durazno": ["Blanquillo", "Carmen", "Centenario", "Durazno", "La Paloma", "Santa Bernardina", "Sarandí del Yi", "Otro"],
    "Flores": ["Andresito", "Ismael Cortinas", "La Casilla", "Trinidad", "Otro"],
    "Florida": ["25 de Agosto", "25 de Mayo", "Alejandro Gallinal", "Cardal", "Casupá", "Florida", "Fray Marcos", "Nico Pérez", "Sarandí Grande", "Otro"],
    "Lavalleja": ["José Batlle y Ordóñez", "José Pedro Varela", "Mariscala", "Minas", "Solís de Mataojo", "Otro"],
    "Maldonado": ["Aiguá", "Balneario Buenos Aires", "Cerro Pelado", "El Tesoro", "Hipódromo", "La Capuera", "Maldonado", "Pan de Azúcar", "Pinares-Las Delicias", "Piriápolis", "Playa Grande", "Punta del Este", "San Carlos", "San Rafael-El Placer", "Otro"],
    "Montevideo": ["Abayubá", "Montevideo", "Pajas Blancas", "Santiago Vázquez", "Otro"],
    "Paysandú": ["Chacras de Paysandú", "Guichón", "Nuevo Paysandú", "Paysandú", "Piedras Coloradas", "Porvenir", "Quebracho", "San Félix", "Tambores", "Otro"],
    "Río Negro": ["Fray Bentos", "Nuevo Berlín", "San Javier", "Young", "Otro"],
    "Rivera": ["Minas de Corrales", "Rivera", "Tranqueras", "Vichadero", "Otro"],
    "Rocha": ["Castillos", "Cebollatí", "Chuy", "La Aguada-Costa Azul", "La Paloma", "Lascano", "Rocha", "Velázquez", "Otro"],
    "Salto": ["Belén", "Constitución", "Salto", "Otro"],
    "San José": ["Ciudad del Plata", "Ecilda Paullier", "Libertad", "Puntas de Valdez", "Rafael Perazza", "Rodríguez", "San José de Mayo", "Otro"],
    "Soriano": ["Cardona", "Chacras de Dolores", "Dolores", "José Enrique Rodó", "Mercedes", "Palmitas", "Villa Soriano", "Otro"],
    "Tacuarembó": ["Curtina", "Las Toscas", "Paso de los Toros", "San Gregorio de Polanco", "Tacuarembó", "Tambores", "Villa Ansina", "Otro"],
    "Treinta y Tres": ["Cerro Chato", "Ejido de Treinta y Tres", "General Enrique Martínez", "Santa Clara de Olimar", "Treinta y Tres", "Vergara", "Villa Sara", "Otro"]
}
function makeSubmenu(value) {
    cityData = true;
    departmentError.removeAttribute("style");
    //Recibe un valor desde el desplegable de departamentos.
    if (value.length == 0) document.getElementById("citySelect").innerHTML = "<option></option>";
    else {
        //Dependiendo del valor, agregará un array al desplegable de ciudades
        var citiesOptions = "";
        document.getElementById("citySelect").removeAttribute("disabled");
        for (cityId in citiesByDepartment[value]) {
            citiesOptions += "<option>" + citiesByDepartment[value][cityId] + "</option>";
        }
        document.getElementById("citySelect").innerHTML = citiesOptions;
    }
}

function directionTrue(value) {
    if (value != "") {
        directionData = true;
        directionError.removeAttribute("style");
    } else {
        directionData = false;
    }
}

//Resetea selección al cargar pagina.
function resetSelection() {
    document.getElementById("departmentSelect").selectedIndex = 0;
    document.getElementById("citySelect").selectedIndex = 0;
}
//Terminan funciones para los desplegables de departamentos y ciudades.

//Función que se utiliza en el modal, dependiendo del botón seleccionado mostrará un form u otro.
function changeForm(id) {
    var buttonA = document.getElementById("payWithCard");
    var buttonB = document.getElementById("payWithPaypal")
    var card = document.getElementById("cardForm");
    var paypal = document.getElementById("paypalForm");
    if (id == "payWithCard") {
        buttonA.className = "btn btn-primary";
        buttonB.className = "btn btn-secondary";
        card.style.display = "block";
        paypal.style.display = "none";
        chosenPayment = "card";
    } else {
        buttonA.className = "btn btn-secondary";
        buttonB.className = "btn btn-primary";
        card.style.display = "none";
        paypal.style.display = "block";
        chosenPayment = "paypal";
    }
}

//Función que evalua si los datos del método de pago están completados.
function savePaymentData() {
    var internalCompleted = document.getElementById("modalCompleted")
    var internalError = document.getElementById("formError");
    var externalError = document.getElementById("paymentFormError");
    var externalCompleted = document.getElementById("paymentFormCompleted");
    if (chosenPayment == "card") {
        var number = document.getElementById("cardNumber");
        var expiry = document.getElementById("cardExpiry");
        var month = document.getElementById("cardMonth");
        var year = document.getElementById("cardYear");
        var cvc = document.getElementById("cardCvc");
        if (number.value.length != 19) {
            number.style.borderColor = "red";
        } else {
            number.removeAttribute("style");
        }
        if (month.value == "" || month.value == "0" || year.value.length != 2) {
            expiry.style.borderColor = "red";
        } else {
            expiry.removeAttribute("style");
        }
        if (cvc.value.length <= 2) {
            cvc.style.borderColor = "red";
        } else {
            cvc.removeAttribute("style");
        }
        if (number.value.length == 19 && month.value != "0" && month.value != "" && year.value.length == 2 && cvc.value.length >= 3) {
            internalCompleted.style.display = "block";
            externalCompleted.style.display = "block";
            internalError.style.display = "none";
            externalError.style.display = "none";
            paymentCompleted = true;
        } else {
            internalCompleted.style.display = "none";
            externalCompleted.style.display = "none";
            internalError.style.display = "block";
            paymentCompleted = false;
        }
    } else {
        var email = document.getElementById("paypalEmail");
        var password = document.getElementById("paypalPassword");
        if (email.value == "" || email.value.indexOf("@") == -1) {
            email.style.borderColor = "red";
            password.style.borderColor = "red";
        } else {
            email.removeAttribute("style");
            if (password.value == "") {
                password.style.borderColor = "red";
            } else {
                password.removeAttribute("style");
            }
        }
        if (email.value != "" && email.value.indexOf("@") > -1 && password.value != "") {
            internalCompleted.style.display = "block";
            externalCompleted.style.display = "block";
            internalError.style.display = "none";
            externalError.style.display = "none";
            paymentCompleted = true;
        } else {
            internalCompleted.style.display = "none";
            externalCompleted.style.display = "none";
            internalError.style.display = "block";
            paymentCompleted = false;
        }
    }
}

function showAlert() {
    getJSONData(CART_BUY_URL).then(function (resultObj) {
        let msgToShowHTML = document.getElementById("resultSpan");
        let msgToShow = "";

        //Si la publicación fue exitosa, devolverá mensaje de éxito,
        //de lo contrario, devolverá mensaje de error.
        if (resultObj.status === 'ok') {
            msgToShow = resultObj.data.msg;
            document.getElementById("alertResult").classList.add('alert-success');
        }
        else if (resultObj.status === 'error') {
            msgToShow = "Ha habido un error :(, verifica qué pasó.";
            document.getElementById("alertResult").classList.add('alert-danger');
        }

        msgToShowHTML.innerHTML = msgToShow;
        document.getElementById("alertResult").classList.add("show");
    });
}

function incompleteData() {
    buyError.style.display = "block";
    if (shipValue == "") {
        shipError.style.display = "block";
    }
    if (!paymentCompleted) {
        paymentForm.style.display = "block";
    }
    if (!cityData) {
        departmentError.style.borderColor = "red";
    }
    if (!directionData) {
        directionError.style.borderColor = "red";
    }
}

//Función para el botón de compra.
function completePurchase() {
    let cost0 = document.getElementById("subCost0");
    let cost1 = document.getElementById("subCost1");
    if (cost0 != undefined && cost1 != undefined) {
        cost0 = cost0.innerHTML;
        cost1 = cost1.innerHTML;
        if ((cost0 > 0 || cost1 > 0) && cost0 >= 0 && cost1 >= 0 && shipValue != "" && paymentCompleted && cityData && directionData) {
            if (confirm("¿Confirmas tu compra?")) {
                buyError.style.display = "none";
                noArts.style.display = "none";
                showAlert();
            }
        } else if ((cost0 <= 0 && cost1 <= 0) || (cost0 < 0 || cost1 < 0)) {
            noArts.style.display = "block";
            buyError.style.display = "none";
        } else {
            incompleteData();
        }
    } else if (cost0 != undefined && cost1 == undefined) {
        cost0 = cost0.innerHTML;
        if (cost0 > 0 && shipValue != "" && paymentCompleted && cityData && directionData) {
            if (confirm("¿Confirmas tu compra?")) {
                buyError.style.display = "none";
                noArts.style.display = "none";
                showAlert();
            }
        } else if (cost0 <= 0) {
            noArts.style.display = "block";
            buyError.style.display = "none";
        } else {
            incompleteData();
        }
    } else if (cost0 == undefined && cost1 != undefined) {
        cost1 = cost1.innerHTML;
        if (cost1 > 0 && shipValue != "" && paymentCompleted && cityData && directionData) {
            if (confirm("¿Confirmas tu compra?")) {
                buyError.style.display = "none";
                noArts.style.display = "none";
                showAlert();
            }
        } else if (cost1 <= 0) {
            noArts.style.display = "block";
            buyError.style.display = "none";
        } else {
            incompleteData();
        }
    } else {
        noArts.style.display = "block";
        buyError.style.display = "none";
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showCartArtsList(resultObj.data);
        }
    });
});