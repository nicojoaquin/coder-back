const socket = io();
const productsContainer = document.querySelector('#productsContainer');
const button = document.querySelectorAll('#eliminarBtn');
const confirmModal = document.querySelector('#confirm-modal');
const formAdd = document.querySelector('#form-add')
const messages = document.querySelector("#messages");
const listaUsuarios = document.querySelector("#lista-usuarios");
const form = document.querySelector("#form-chat");
const inputEmail = document.querySelector("#input-email");
const inputUser = document.querySelector("#input-user");
const inputMsg = document.querySelector("#input-msg");

const displayProducts = (product) => {    
    productsContainer.innerHTML += 
      `
        <tr>
          <th scope="row">
            ${product.images.length === 0
            ?
            `<img width= "45" height= "40" class= "rounded-circle" src = "/assets/desconocido.jpg" alt= "product.title" />`
            :
            `<img width= "45" height= "40" class= "rounded-circle product-img" src = ${product.images[0].url} alt= "product.title" />`
            }
          </th>
          <td>${product.title}</td>
          <td>${product.marca}</td>
          <td>${product.cat}</td>
          <td>$${product.price}</td>
          <td>${product.stock}</td>
          <td>
            <a
              href="/admin/product/${product.id}"
              class="text-decoration-none"
            >
              <button class="btn btn-primary" id="editarBtn">
                <i class="bi bi-pencil-fill"></i>
              </button>
            </a>
            <button
              class="btn btn-danger ms-3"
              data-id="${product.id}"
              data-bs-toggle="modal"
              data-bs-target="#confirm-modal"
            >
              <i
                class="bi bi-trash-fill"
                id="eliminarBtn"
                data-id="${product.id}"
              ></i>
            </button>
          </td>
        </tr>
      `
}

const getProductsData = async () => {
  try {
    const res = await fetch('/api/products');
    const {products} = await res.json();
    products.map( product => {
      displayProducts(product)
    })
  } catch (err) {
    console.warn(err);
  }
  
}

formAdd.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titleValue = document.querySelector('#title');
  const marcaValue = document.querySelector('#marca');
  const catValue = document.querySelector('#cat');
  const descValue = document.querySelector('#desc');
  const priceValue = document.querySelector('#price');
  const stockValue = document.querySelector('#stock');
  const thumbnailValue = document.querySelector('#thumbnail');

  const formData = new FormData();
  formData.append('title', titleValue.value);
  formData.append('marca', marcaValue.value);
  formData.append('cat', catValue.value);
  formData.append('desc', descValue.value);
  formData.append('price', priceValue.value);
  formData.append('stock', stockValue.value);
  formData.append(`images`, thumbnailValue.files[0]);

  try {
    const res = await fetch('api/products', {
      method: "POST",
      headers: {
        'admin': "true"
      },
      body: formData
    });
    const data = await res.json();
    if(data.ok){
      socket.emit('display', data.product);
    } else {
      alert(data.msg);
    }
    getMessagesData()
  } catch (err) {
    console.warn(err);
  } 

  formAdd.reset();
})

productsContainer?.addEventListener('click', (e) => {
  const btn = e.target;
  
  if(btn.classList.contains('bi-trash-fill') || btn.classList.contains("btn-danger")){
    const id = btn.dataset.id;
    confirmModal.addEventListener('click', async (e) => {
      if(e.target.classList.contains('cancel-btn')) return;
      else if(e.target.classList.contains('conf-btn')) {

        try { 
          const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
              'admin': "true"
            },
          })
          const data = await res.json();
          if(data.ok) {
            socket.emit('change', data.products);
          } else {
            alert(data.msg);
          }
        } catch (err) {
          console.warn(err);
        }  
        
      }
    })
  }
}); 

socket.on('products', data => {
  productsContainer.innerHTML = '';
  data.map( product => {
    displayProducts(product)
  })
})

socket.on('product', data => {
  displayProducts(data)
})


// .....................................................

//Chat
const getMessagesData = async () => {
  try {
    const res = await fetch('/api/mensajes');
    const data = await res.json();
    data.messages.map( mensaje => {
      displayData(mensaje);
    });
  } catch (err) {
    console.warn(err);
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if([inputEmail.value, inputUser.value, inputMsg.value].includes('')) return;

  try {
    const res = await fetch('/api/mensajes', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: inputEmail.value,
        nombre: inputUser.value,
        msg: inputMsg.value,
        date: dayjs().format('DD/MM/YY - HH:mm:ss')
      })
    })
    const data = await res.json();
    if(data.ok) {
      socket.emit('message', data.message);
    }
  } catch (err) {
    console.warn(err);
  }

  inputEmail.value= '';
  inputUser.value= '';
  inputMsg.value= '';
});

const displayData = ({email, date, msg}) => {
  let mensaje = ''
  mensaje += `
                <li class="mb-2">
                  <h6 class= "text-primary">${email}</h6>
                  <p class= "fst-italic text-success">${msg}</p>
                  <p class= "msg-date">${date}</p>
                </li>
              `
  messages.innerHTML += mensaje;
}

socket.on('msg', data => {
  displayData(data);
  window.scrollTo(0, document.body.scrollHeight);
});


window.onload = () => {
  getProductsData()
  getMessagesData();
}