const formEditar = document.querySelector('#formEditar');
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const thumbnail = document.querySelector('#thumbnail')
const socket = io();

const ID =  document.querySelector('#contenedor').dataset.id;

const displayProduct = (product) => {
  document.querySelector('#articulo').textContent = product.title
  title.value = product.title;
  price.value = product.price;
  thumbnail.value = product.thumbnail;
}

const getData = async () => {
  try {
    const res = await fetch(`/api/products/${ID}`);
    const {product} = await res.json();
    displayProduct(product);
  } catch (err) {
    console.warn(err);
  }
  
}

formEditar?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = formEditar.dataset.id;  

  try { 
    const res = await fetch(`/api/products/${id}`, {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value
      })
    });
    const data = await res.json();
      
    if(data.ok) {
      socket.emit('change', data.products);
      socket.emit('display', data.product);
    }
  } catch (err) {
      console.warn(err);
    };
});

window.onload = getData;

socket.on('productUpdated', data => {
 displayProduct(data);
})