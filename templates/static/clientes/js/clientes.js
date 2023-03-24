function add_carro() {
  let container = document.getElementById('form-carro')

  let html = `
    <br> 
    <div class='row'> 
      <div class='col-md'> 
        <input type='text' placeholder='Carro' class='form-control' name='carro'> 
      </div> 
      <div class='col-md'>
        <input type='text' placeholder='Placa' class='form-control' name='placa'> 
      </div>
      <div class='col-md'> 
        <input type='number' placeholder='Ano' class='form-control' name='ano'> 
      </div>
    </div>
  `

  container.innerHTML += html

  const urlParams = window.location.href

  return_client(urlParams)
}

function return_client(url) {
  

  console.log(url)
}

function exibir_form(tipo) {
  let add_cliente = document.getElementById('adicionar-cliente')
  let att_cliente = document.getElementById('att_cliente')

  if(tipo == "1") {
    att_cliente.style.display = 'none'
    add_cliente.style.display = 'block'
  } else if(tipo == "2") {
    att_cliente.style.display = 'block'
    add_cliente.style.display = 'none'
  }

}

function dados_cliente() {
  let cliente = document.getElementById('cliente-select')
  let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value
  let id_cliente = cliente.value
  let data = new FormData()
  
  data.append('id_cliente', id_cliente)

  fetch('/clientes/atualiza_cliente/', {
    method: "POST",
    headers: {
      'X-CSRFToken': csrf_token,
    },
    body: data,
  }).then((result) => {
    return result.json()
  }).then((data) => {
    document.getElementById('form-att-cliente').style.display = 'block'

    id = document.getElementById('id')
    id.value = data['cliente_id']

    let nome = document.getElementById('nome')
    nome.value = data['cliente']['nome']
    

    let sobrenome = document.getElementById('sobrenome')
    sobrenome.value = data['cliente']['sobrenome']

    let email = document.getElementById('email')
    email.value = data['cliente']['email']

    let cpf = document.getElementById('cpf')
    cpf.value = data['cliente']['cpf']

    let div_carros = document.getElementById('carros')
    div_carros.innerHTML = ""

    console.log(data)

    for(i=0; i<data['carros'].length; i++){

      div_carros.innerHTML += `
        <form action='/clientes/update_carro/${data['carros'][i]['id']}' method='POST'>
          <div class='row'>
            <div class='col-md'>
              <input class='form-control' type='text' name='carro' value=${data['carros'][i]['fields']['carro']}>
            </div>
            <div class='col-md'>
              <input class='form-control' type='text' name='placa' value=${data['carros'][i]['fields']['placa']}>
            </div>
            <div class='col-md'>
              <input class='form-control' type='text' name='ano' value=${data['carros'][i]['fields']['ano']}>
            </div>
            <div class='col-md'>
              <input class='btn btn-success' type='submit' value='Submeter Pedido'>
            </div>
        </form>
          <div class='col-md'>
            <a class='btn btn-danger' href='/clientes/excluir_carro/${data['carros'][i]['id']}'>Excluir</a>
          </div>
        </div><br>
      `
    }
  })
}

function update_cliente() {
  let csrf_token = document.querySelector('[name=csrfmiddlewaretoken]').value

  let nome = document.getElementById('nome').value
  let sobrenome = document.getElementById('sobrenome').value
  let email = document.getElementById('email').value
  let cpf = document.getElementById('cpf').value
  let id = document.getElementById('id').value

  fetch('/clientes/update_cliente/' + id, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrf_token,
    },
    body: JSON.stringify({
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      cpf: cpf
    })
  }).then((result) => {
    return result.json()
  }).then((data) => {
    if (data['status'] == '200') {
      stats = data['status']
      nome = data['nome']
      sobrenome = data['sobrenome']
      email = data['email']
      cpf = data['cpf']

      let alert_success = document.getElementById('alert_success')
      alert_success.style.display = 'block'
    }else {
      let alert_danger = document.getElementById('alert_danger')
      alert_danger.style.display = 'block'
    }
  })
}

function close_alert_success() {
  let alert_success = document.getElementById('alert_success')
  alert_success.style.display = 'none'
}

function close_alert_danger() {
  let alert_danger = document.getElementById('alert_danger')
  alert_danger.style.display = 'none'
}
