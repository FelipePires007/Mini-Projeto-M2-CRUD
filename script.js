const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const nome = document.querySelector('#nome')
const genero = document.querySelector('#genero')
const idade = document.querySelector('#idade')
const btnsalvar = document.querySelector('#btnsalvar')

let itens
let id 

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfuc', JSON.stringify(itens))

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}

loadItens()

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.genero}</td>
      <td>${item.idade}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
  }
  
  function editItem(index) {

    openModal(true, index)
  }

  function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
  }

  function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      nome.value = itens[index].nome
      genero.value = itens[index].genero
      idade.value = itens[index].idade
      id = index
    } else {
      nome.value = ''
      genero.value = ''
      idade.value = ''
    }
}

btnSalvar.onclick = e => {
  
    if (nome.value == '' || genero.value == '' || idade.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].nome = nome.value
      itens[id].genero = genero.value
      itens[id].idade = idade.value
    } else {
      itens.push({'nome': nome.value, 'genero': genero.value, 'idade': idade.value})
    }
  
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }

