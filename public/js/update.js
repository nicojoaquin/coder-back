const formEditar = document.querySelector('#formEditar');

formEditar.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = formEditar.dataset.id;  
  const title = formEditar.elements['title'].value.trim();
  const price = formEditar.elements['price'].value.trim();
  const thumbnail = formEditar.elements['thumbnail'].value.trim();

  try { 
    const res = await fetch(`/api/products/${id}`, {
      method: "put",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, price, thumbnail})
    });
    const data = await res.json();
      
    if(data.ok) {
      window.location.href = '/admin';
    }
  } catch (err) {
      console.warn(err);
    };
});