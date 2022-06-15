function ocultarPrincipal() {
  document.querySelector(".paginaPrincipal").style.display = "none";
  document.querySelector(".paginaCarrito").style.display = "block";
}

function mostrarPrincipal() {
  document.querySelector(".paginaPrincipal").style.display = "block";
  document.querySelector(".paginaCarrito").style.display = "none";
}

function newNodePizza(newImg,newName,newIngred,newPrice){
    let image = newImg;
    let nombre = newName;
    let ingrediente = newIngred;
    let precio = newPrice;
    let nodoNuevo =
    `
    <div class="item-pizza">
        <div class="padre">
        <div class="marco-pizza-img">
            <img class = 'img-pizza' src='${image}'>
        </div>
        </div>
        <div class="texto-pizza">
            <div class="pizza-name">
                <p class="nombre">${nombre}</p>  
                <p class="ingredientes">${ingrediente}</p>  
            </div>
        <div class="pizza-precio">
            <p class = "precio" ><span>$</span>${precio}</p>
            <button class = "button-add" onclick= "sumarPizza()">+</button>
        </div>
        </div> 
    </div>
    `

    return nodoNuevo;
}
function insertNodePizza(nodeInfo){
    let posicion = document.querySelector(".pizza-item-list");
    posicion.innerHTML = nodeInfo;
  }
function despliegaMenu(){
  let concatNodes = ``;
  let image;
  let nombre;
  let ingrediente;
  let precio;
  let sizeArr = arrayPizzas.length;;
  let i = 0;
  for (i; i < sizeArr; i++ ){
    image = arrayPizzas[i].imgPizza;
    nombre = arrayPizzas[i].nomPizza;
    ingrediente = arrayPizzas[i].ingredientePpal;
    precio = arrayPizzas[i].precioPizza;
    concatNodes = concatNodes + newNodePizza(image,nombre,ingrediente,precio);
  }
  insertNodePizza(concatNodes);
}
despliegaMenu();