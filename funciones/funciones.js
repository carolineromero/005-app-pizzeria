const posicionPizzas = document.querySelector(".pizza-item-list");
const posicionCarrito = document.querySelector(".item-selec");

//function ocultarPrincipal() {
  //document.querySelector(".paginaPrincipal").style.display = "none";
  //document.querySelector(".paginaCarrito").style.display = "block";
//}

//function mostrarPrincipal() {
  //document.querySelector(".paginaPrincipal").style.display = "block";
  //document.querySelector(".paginaCarrito").style.display = "none";
//}

function renderizaPizzas(){
  arrayPizzas.forEach((itemPizza)=>{
    posicionPizzas.innerHTML +=
  `
  <div class="item-pizza">
      <div class="padre">
      <div class="marco-pizza-img">
          <img class = 'img-pizza' src='${itemPizza.imgPizza}'>
      </div>
      </div>
      <div class="texto-pizza">
          <div class="pizza-name">
              <p class="nombre">${itemPizza.nomPizza}</p>  
              <p class="ingredientes">${itemPizza.ingredientePpal}</p>  
          </div>
      <div class="pizza-precio">
          <p class = "precio" ><span>$</span>${itemPizza.precioPizza}</p>
          <button class = "button-add" onclick= "sumaPizza(${itemPizza.idPizza})">+</button>
      </div>
      </div> 
  </div>
  `
})
} 

function sumaPizza(indiceElemento){
  if (carritoCompra.some(pizzaSel => pizzaSel.idPizza === indiceElemento)){
    alert("Pizza ya existe");
  }else{
    const pizzaSel = arrayPizzas.find((pizza)=> pizza.idPizza === indiceElemento );
    carritoCompra.push({
      ...pizzaSel,
      unidades: 1
    })
    renderizaCarritoCompra();
  }
}

function renderizaCarritoCompra(){
  posicionCarrito.innerHTML = "";

  carritoCompra.forEach((pizzaSel) => {
    posicionCarrito.innerHTML +=
    `
    <div class = "item-selec-info">
      <div class = "img-precio-nombre">
        <img src="${pizzaSel.imgPizza}" class = "item-img-pizza" alt="Pizza seleccionada">
        <p class = "item-selec-info-precio"><span>$</span>${pizzaSel.precioPizza}</p>
        <p class = "item-selec-info-nombre">${pizzaSel.nomPizza}</p>
      </div>
      <div class = "item-selec-cantidad">
        <p class ="buttn-item-selec-suma" onclick "cambiaUnidades('mas',${pizzaSel.idPizza})">+</p>
        <p class ="item-selec-info-cantidad">${pizzaSel.unidades}</p>
        <p class ="buttn-item-selec-resta" cambiaUnidades('menos',${pizzaSel.idPizza})">-</p>
      </div>
    </div> `
  }) 
}

function cambiaUnidades(accion,id){
  carritoCompra = carritoCompra.map((pizzaSel) =>{

    if (pizzaSel.idPizza === id){
      
    }

    return pizzaSel;

  })

}



function main(){
  document.querySelector(".paginaPrincipal").style.display = "block";
  document.querySelector(".paginaCarrito").style.display = "block";
  renderizaPizzas()
}

main();
