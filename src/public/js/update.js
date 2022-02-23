const socket = io();
const formEditar = document.querySelector('#formEditar');
const title = document.querySelector('#title');
const marca = document.querySelector('#marca');
const cat = document.querySelector('#cat');
const desc = document.querySelector('#desc');
const price = document.querySelector('#price')
const stock = document.querySelector('#stock');
const thumbnail = document.querySelector('#thumbnail');

const ID =  document.querySelector('#contenedor').dataset.id;

const displayProduct = (product) => {
  document.querySelector('#articulo').textContent = product.title
  title.value = product.title;
  marca.value = product.marca;
  cat.value = product.cat;
  desc.value = product.desc;
  price.value = product.price; 
  stock.value = product.stock; 
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

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('marca', marca.value);
  formData.append('cat', cat.value);
  formData.append('desc', desc.value);
  formData.append('price', price.value);
  formData.append('stock', stock.value);
  formData.append(`image`, thumbnail.files[0]);

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
      socket.emit('change');
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