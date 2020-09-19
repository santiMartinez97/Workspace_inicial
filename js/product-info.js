var product = {};
var productRel = {};
var commentsList = {};
var scoreList = [];
var localUser = localStorage.getItem("inputUser");
var localComment = localStorage.getItem("inputComment");
var localScore = localStorage.getItem("inputScore");
var localDate = localStorage.getItem("inputDate");

// Función que ordena los comentarios por fecha
function sortComments(array) {
    let result = [];
    result = array.sort(function (a, b) {
        let aDate = +new Date(a.dateTime);
        let bDate = +new Date(b.dateTime);
        if (aDate < bDate) { return -1; }
        if (aDate > bDate) { return 1; }
        return 0;
    });

    return result;
};

function sortAndShowComments(commentsArray) {
    if (commentsArray != undefined) {
        currentCommentsArray = commentsArray;
    }

    currentCommentsArray = sortComments(currentCommentsArray);

    //Muestro los comentarios ordenados por fecha
    showComments(currentCommentsArray);
}

// Función que agregará imágenes del auto
function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        if (i == 0) {
            htmlContentToAppend += `<div class="carousel-item active">
            <img src="` + imageSrc + `" class="d-block w-100">
          </div>`
        } else {
            htmlContentToAppend += `<div class="carousel-item">
            <img src="` + imageSrc + `" class="d-block w-100">
          </div>`
        };

    };
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
};
// Función que agregará los productos relacionados
function showProductRelated(array) {

    let htmlContentToAppend = "";
    let related = product.relatedProducts;

    for (let i = 0; i < related.length; i++) {
        // Revisa el elemento número i del array de relatedProducts
        let j = related[i];
        // Revisa el elemento número j del JSON de productos.
        let proRel = array[j];
        htmlContentToAppend += `<div class="card" style="width: 18rem;">
        <img src="` + proRel.imgSrc + `" class="card-img-top" alt="Artículo relacionado">
        <div class="card-body">
          <h5 class="card-title">` + proRel.name + ` - ` + proRel.currency + proRel.cost + `</h5>
          <p class="card-text">` + proRel.description + `</p>
          <a href="product-info.html" class="stretched-link"></a>
        </div>
      </div>`
    };
    document.getElementById("productRelated").innerHTML = htmlContentToAppend;
};
// Función que agregará los comentarios almacenados
function showComments(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];

        htmlContentToAppend += `
           <dt>` + comment.user + `</dt> <i>` + comment.dateTime + `</i> - `

        let stars = comment.score;
        // Código en el que se verificará si agregar una estrella amarilla o negra, hasta llegar a un
        // máximo de cinco estrellas.
        for (let k = 1; k < 6; k++) {
            if (k <= stars) {
                htmlContentToAppend += `<span class="fa fa-star checked"></span>`
            } else {
                htmlContentToAppend += `<span class="fa fa-star"></span>`
            }
        };

        htmlContentToAppend += `<dd>` + comment.description + `</dd><hr class="my-3">`
    };
    document.getElementById("productCommentaries").innerHTML = htmlContentToAppend;
    if (localComment != null && localComment.length != 0 && localScore != 0) {
        addComment();
    }
    averageScore(array);
};

// Esta función realiza un promedio de calificaciones en los comentarios.
function averageScore(array) {
    var totalScore = 0;
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let commentScore = array[i].score;
        scoreList.push(commentScore);
    }
    if (localComment != null && localComment.length != 0 && localScore != 0) {
        scoreList.push(parseInt(localScore));
    }
    for (var i = 0; i < scoreList.length; i++) {
        totalScore += scoreList[i];
    }
    var avg = totalScore / scoreList.length;
    htmlContentToAppend += `<span class="review-summary-average">` + avg + `</span><span class="star-container">`
    for (let k = 1; k < 6; k++) {
        if (k <= avg) {
            htmlContentToAppend += `<span class="fa fa-star checked"></span>`
        } else {
            htmlContentToAppend += `<span class="fa fa-star"></span>`
        }
    };
    htmlContentToAppend += `</span><div class="review-summary-average-legend">Promedio en base a ` + scoreList.length + ` opiniones.</div>`
    document.getElementById("averageScore").innerHTML += htmlContentToAppend;
}


//Esta función guarda la hora y fecha del comentario realizado por el usuario.
function saveDate() {
    var dateComment = new Date();
    var dd = String(dateComment.getDate()).padStart(2, '0');
    var mm = String(dateComment.getMonth() + 1).padStart(2, '0'); //Enero es 0!
    var yyyy = dateComment.getFullYear();
    var hour = String(dateComment.getHours()).padStart(2, '0');
    var min = String(dateComment.getMinutes()).padStart(2, '0');
    var sec = String(dateComment.getSeconds()).padStart(2, '0');

    dateComment = yyyy + "-" + mm + "-" + dd + " " + hour + ":" + min + ":" + sec;
    return dateComment;
};


// Esta función guarda los datos necesarios para agregar un comentario del usuario.
function saveComment() {
    var newComment = document.getElementById("inputComment").value;
    localStorage.setItem("inputComment", newComment);
    var newScore = document.getElementById("newComment").getElementsByClassName("fa fa-star checked").length;
    localStorage.setItem("inputScore", newScore);
    var dateComment = saveDate();
    localStorage.setItem("inputDate", dateComment);
};

// Esta función agrega un comentario escrito por el usuario a la web.
function addComment() {
    let localUser = localStorage.getItem("inputUser");
    let localComment = localStorage.getItem("inputComment");
    let localScore = localStorage.getItem("inputScore");
    let localDate = localStorage.getItem("inputDate");
    if (localComment.length != 0 && localScore != 0) {
        let htmlContentToAppend = "";
        htmlContentToAppend += `<dt>` + localUser + `</dt> <i>` + localDate + `</i> - `
        let stars = localScore;
        // Código en el que se verificará si agregar una estrella amarilla o negra, hasta llegar a un
        // máximo de cinco estrellas.
        for (let k = 1; k < 6; k++) {
            if (k <= stars) {
                htmlContentToAppend += `<span class="fa fa-star checked"></span>`
            } else {
                htmlContentToAppend += `<span class="fa fa-star"></span>`
            }
        };

        htmlContentToAppend += `<dd>` + localComment + `</dd>
            <a href="#deleteComment" id="deleteComment">Borrar</a><hr class="my-3">`
        document.getElementById("productCommentaries").innerHTML += htmlContentToAppend;
        document.getElementById("newComment").innerHTML = "Ya has calificado este producto.";
        document.getElementById("deleteComment").addEventListener("click", function () {
            deleteComment();
        });
    } else {
        alert("Por favor, ingresa un comentario y elige una puntuación.")
    };

};

// Esta función elimina el comentario del usuario.
function deleteComment() {
    localStorage.removeItem("inputComment");
    localStorage.removeItem("inputDate");
    localStorage.removeItem("inputScore");
    location.reload();
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            //Agrega los datos del auto a la pagina web.
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imágenes en forma de galería
            showImagesGallery(product.images);
            //Realizo este getJSON dentro del otro getJSON para que así este se ejecute cuando el array
            // "product" ya esté definido y entonces evitar errores en los que la función
            // showProductRelated se ejecute con el array product aún sin definirse.
            getJSONData(PRODUCTS_URL).then(function (resultObj2) {
                if (resultObj2.status === "ok") {
                    productRel = resultObj2.data;
                    showProductRelated(productRel);
                }
            });
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj3) {
        if (resultObj3.status === "ok") {
            commentsList = resultObj3.data;
            // Primero ordena los comentarios por fecha y luego los publica
            sortAndShowComments(commentsList);
        }
    });

    //Función para la sección de calificar en los comentarios.
    let star1 = document.getElementById("star1");
    let star2 = document.getElementById("star2");
    let star3 = document.getElementById("star3");
    let star4 = document.getElementById("star4");
    let star5 = document.getElementById("star5");

    star1.addEventListener("click", function (e) {
        star1.className = "fa fa-star checked";
        star2.className = "fa fa-star";
        star3.className = "fa fa-star";
        star4.className = "fa fa-star";
        star5.className = "fa fa-star";
    });

    star2.addEventListener("click", function (e) {
        star1.className = "fa fa-star checked";
        star2.className = "fa fa-star checked";
        star3.className = "fa fa-star";
        star4.className = "fa fa-star";
        star5.className = "fa fa-star";
    });

    star3.addEventListener("click", function (e) {
        star1.className = "fa fa-star checked";
        star2.className = "fa fa-star checked";
        star3.className = "fa fa-star checked";
        star4.className = "fa fa-star";
        star5.className = "fa fa-star";
    });

    star4.addEventListener("click", function (e) {
        star1.className = "fa fa-star checked";
        star2.className = "fa fa-star checked";
        star3.className = "fa fa-star checked";
        star4.className = "fa fa-star checked";
        star5.className = "fa fa-star";
    });

    star5.addEventListener("click", function (e) {
        star1.className = "fa fa-star checked";
        star2.className = "fa fa-star checked";
        star3.className = "fa fa-star checked";
        star4.className = "fa fa-star checked";
        star5.className = "fa fa-star checked";
    });
    // Termina función de calificación en los comentarios

    document.getElementById("submitComment").addEventListener("click", function () {
        saveComment();
        addComment();
        if (localStorage.getItem("inputComment").length != 0 && localStorage.getItem("inputScore") != 0) {
            location.reload();
        }
    });
});