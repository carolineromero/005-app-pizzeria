const posicionPizzas = document.querySelector(".pizza-item-list");
const posicionCarrito = document.querySelector("#item-selec");

function ocultarPrincipal() {
  document.querySelector(".paginaPrincipal").style.display = "none";
  document.querySelector(".paginaCarrito").style.display = "block";
}

function mostrarPrincipal() {
  document.querySelector(".paginaPrincipal").style.display = "block";
  document.querySelector(".paginaCarrito").style.display = "none";
}

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

function isInCart(indiceElemento){
  let result = carritoCompra.some(pizzaSel => pizzaSel.idPizza === indiceElemento);
 return result
}

function sumaPizza(indiceElemento){
  if (isInCart(indiceElemento)){
    cambiaUnidades("mas",indiceElemento);
  return;
  }
  const pizzaSel = arrayPizzas.find((pizza)=> pizza.idPizza === indiceElemento );
  carritoCompra.push({
    ...pizzaSel,
    unidades: 1
  })
  renderizaCarritoCompra();
}

function renderizaCarritoCompra(){
  posicionCarrito.innerHTML = "";
  carritoCompra.forEach((pizzaSel) => {
    posicionCarrito.innerHTML +=
    `
    <div class = "item-selec-info" id ="${pizzaSel.idPizza}">
      <div class = "img-precio-nombre">
        <img src="${pizzaSel.imgPizza}" class = "item-img-pizza" alt="Pizza seleccionada">
        <p class = "item-selec-info-precio"><span>$</span>${pizzaSel.precioPizza}</p>
        <p class = "item-selec-info-nombre">${pizzaSel.nomPizza}</p>
      </div>
      <div class = "item-selec-cantidad">
        <button class ="buttn-item-selec-suma" onclick = "cambiaUnidades('mas',${pizzaSel.idPizza})">+</button>
        <p class ="item-selec-info-cantidad">${pizzaSel.unidades}</p>
        <button class ="buttn-item-selec-resta" onclick = "cambiaUnidades('menos',${pizzaSel.idPizza})">-</button>
      </div>
    </div> `
  })
  renderizaUnidades(carritoCompra); 
  despliegaTotal();
}

function renderizaUnidades(carritoCompra){
  let items = carritoCompra.length;
  let cuentaItems = 0;
  if (items > 0){
    carritoCompra.forEach((item) => {
      cuentaItems = cuentaItems + item.unidades;
    })
    document.querySelector(".suma-items").innerHTML = cuentaItems;
  }
}

function removeItemFromCart(id){
  carritoCompra = carritoCompra.filter((pizzaSel) => pizzaSel.idPizza !== id);
  renderizaCarritoCompra();
}

function cambiaUnidades(accion,id){
  let idCambio = id;

  carritoCompra = carritoCompra.map((pizzaSel) =>{
  let unidadesPrevias = pizzaSel.unidades;

  if (pizzaSel.idPizza === idCambio){
    if (accion ==="menos" && unidadesPrevias > 0) {
      unidadesPrevias --;
      if (unidadesPrevias === 0){
        const pizzaRemove = document.getElementById(idCambio);
        console.log(pizzaRemove);
        pizzaRemove.remove();
        removeItemFromCart(idCambio);
        console.log(carritoCompra);
      }
    } else if (accion === "mas"){
      unidadesPrevias ++;
    }
  }
  return{
    ...pizzaSel,
    unidades: unidadesPrevias,
  };
  });
  // renderizaCarritoCompra()
  renderizaUnidades(carritoCompra);
}

function sumaItemTotal(carrito){
  let suma = 0;

  carrito.forEach((pizzaSel)=>{
    suma = suma + (pizzaSel.precioPizza * pizzaSel.unidades) 
    })
  return suma;
}

function calculaTax(subtotal){
  return (subtotal * 0.27);
}

function calculaTotal(subtotal, tax, delivery){
  let total = Number(subtotal) + Number(tax) + Number(delivery);
  return total;
}

function despliegaTotal(){
  let itemTotal = sumaItemTotal(carritoCompra);
  itemTotal = itemTotal.toFixed(2);
  let delCharge= 2.50;
  let tax = calculaTax(itemTotal);
  tax = tax.toFixed(2);
  let total =  calculaTotal(itemTotal, tax, delCharge);
  //total = total.toFixed(2);

  document.querySelector(".resComItemTotalEuros").innerHTML = itemTotal;
  document.querySelector(".resComDeliveryChargeEuros").innerHTML = delCharge;
  document.querySelector(".resComTaxEuros").innerHTML = tax;
  document.querySelector(".resComTotalEuros").innerHTML = total
}

function main(){
  //document.querySelector(".paginaPrincipal").style.display = "block";
  //document.querySelector(".paginaCarrito").style.display = "block";
  renderizaPizzas()
}

main();
