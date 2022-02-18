const socket = io();
const formEditar = document.querySelector('#formEditar');
const title = document.querySelector('#title')
const price = document.querySelector('#price')
const thumbnail = document.querySelector('#thumbnail')

const ID =  document.querySelector('#contenedor').dataset.id;

const displayProduct = (product) => {
  document.querySelector('#articulo').textContent = product.title
  title.value = product.title;
  price.value = product.price; 
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

  const title = document.querySelector('#title');
  const price = document.querySelector('#price');
  const thumbnail = document.querySelector('#thumbnail');

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('price', price.value);
  formData.append(`images`, thumbnail.files[0]);

  try { 
    const res = await fetch(`/api/products/${id}`, {
      method: "put",
      headers: {
        'admin': 'true'
      },
      body: formData
    });
    const data = await res.json();
      
    if(data.ok) {
      socket.emit('update', data.product);
      socket.emit('change', data.products);
    } else {
      alert(data.msg);
    }
  } catch (err) {
      console.warn(err);
    };
});

window.onload = getData;

socket.on('productUpdated', data => {
 displayProduct(data);
})