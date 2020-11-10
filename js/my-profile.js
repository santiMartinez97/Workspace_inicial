var inputDataStorage = {
    "inputFName": "",
    "inputSName": "",
    "inputFSurname": "",
    "inputSSurname": "",
    "inputEmail": "",
    "inputPhone": "",
    "inputWebsite": "",
    "male": false,
    "female": false,
    "nogender": false,
    "inputBirthday": "",
    "inputBiography": "",
};
var firstName = document.getElementById("inputFName");
var secondName = document.getElementById("inputSName");
var firstSurname = document.getElementById("inputFSurname");
var secondSurname = document.getElementById("inputSSurname");
var email = document.getElementById("inputEmail");
var phone = document.getElementById("inputPhone");
var website = document.getElementById("inputWebsite");
var male = document.getElementById("male");
var female = document.getElementById("female");
var noGender = document.getElementById("nogender");
var birthday = document.getElementById("inputBirthday");
var biography = document.getElementById("inputBiography");
let inputArr = [firstName, secondName, firstSurname, secondSurname, email, phone, website, male, female, noGender, birthday, biography];

//Función que fija la fecha máxima de nacimiento, de forma que el usuario tenga que ser mayor de edad.
function setMaxBirthday() {
    var adult = new Date();
    var dd = adult.getDate();
    var mm = adult.getMonth() + 1; //January is 0!
    var yyyy = adult.getFullYear() - 18;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    adult = yyyy + '-' + mm + '-' + dd;
    document.getElementById("inputBirthday").setAttribute("max", adult);
}

function invalidData(id) {
    document.getElementById(id).style.borderColor = "red";
}

function inputData(id) {
    document.getElementById(id).removeAttribute("style");
}

//Función que comprobará la validez de los inputs y los guardará.
function saveData() {
    for (let i = 0; i < inputArr.length; i++) {
        let arr = inputArr[i];
        if (arr != email && arr != male && arr != female && arr != noGender && arr != birthday) {
            if (arr != "") {
                if (arr.validity.valid == true) {
                    inputDataStorage[arr.id] = arr.value;
                }
            }
        } else if (arr == email) {
            if (arr.validity.valid == true) {
                inputDataStorage[arr.id] = arr.value;
            }
        } else if (arr == male || arr == female || arr == noGender) {
            if (arr.checked == true) {
                inputDataStorage[arr.id] = true;
            } else {
                inputDataStorage[arr.id] = false;
            }
        } else if (arr == birthday) {
            if (arr.value >= '1900-01-01' && arr.value <= arr.max) {
                inputDataStorage[arr.id] = arr.value;
            } else if (arr.value == "") {
                inputDataStorage[arr.id] = arr.value;
            }
        }
    }
    localStorage.setItem("inputDataStorage", JSON.stringify(inputDataStorage));
}

//Función que, al entrar a la página, rellenará los inputs si estos fueron llenados previamente.
function completeInput() {
    var ids = JSON.parse(localStorage.getItem("inputDataStorage"));
    if (ids != null) {
        inputDataStorage = ids;
    }
    for (let i = 0; i < inputArr.length; i++) {
        let arr = inputArr[i];
        if (arr != male && arr != female && arr != noGender) {
            if (inputDataStorage[arr.id] != null && inputDataStorage[arr.id] != "") {
                arr.value = inputDataStorage[arr.id];
            }
        } else if (inputDataStorage[arr.id] == true) {
            arr.setAttribute("checked", "");
        }
    }
}

//Código que guardará la imagen cargada a localStorage.

var happyFace = document.getElementById("happyface");
happyFace.addEventListener("load", function () {
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");
    imgCanvas.width = happyFace.width;
    imgCanvas.height = happyFace.height;
    imgContext.drawImage(happyFace, 0, 0, happyFace.width, happyFace.height);
    var imgAsDataURL = imgCanvas.toDataURL("image/png");
    try {
        localStorage.setItem("happyface", imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }
    //happyFace.src = localStorage.getItem("happyface");
}, false);

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    setMaxBirthday();
    completeInput();

    document.getElementById("submitProfile").addEventListener("click", function (e) {
        saveData();
    });
});