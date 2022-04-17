class Ambiente {
    constructor(indice, nombre, ancho, largo) {
        this.id = indice
        this.nombre = nombre
        this.ancho = (parseFloat(ancho)).toFixed(2)
        this.largo = (parseFloat(largo)).toFixed(2)
        this.superficie = [(this.ancho * this.largo).toFixed(2)]
    }
    mostrarAmbientesAgregados() {
        alert(`El ambiente agregado es: ${this.nombre}, con un ancho de ${this.ancho} y un largo de ${this.largo}`)
    }
}

class Cliente{
    constructor(nombre, email, celular){
        this.nombre = nombre
        this.email = email
        this.celular = celular
    }
}

// VARIABLES---------------------------------------------
const listaAmbientes = [
    { id: 01, ambiente: 'Cocina' }, { id: 02, ambiente: 'Baño' },
    { id: 03, ambiente: 'Comedor' }, { id: 04, ambiente: 'Estar' },
    { id: 05, ambiente: 'Dormitorio' }, { id: 06, ambiente: 'Quincho' }, { id: 07, ambiente: 'Cochera' }, { id: 08, ambiente: 'Otro' }
]

const listaEstilos = [
    {id:01, estilo: 'Clasico'}, {id:02, estilo: 'Vintage'}, {id:03, estilo: 'Green'}, {id:04, estilo: 'Rústico'}, {id:05, estilo: 'Moderno'}]

const listaArquis = [
    {id:01, nombre: 'Carlos B.', bio:'Arquitecto de la UNLP, con 15 años de experiencia en la empresa, siendo su gran fuerte,instalaciónes y estructuras'}, {id:02, nombre: 'Carla P.', bio:'Arquitecta de grandes habilidades en visualización y artistica, especialista en grandes interiores comerciales'}, {id:03, nombre: 'Marcos H.', bio:'Estudiante de arquitectura, entusiasta, de altísimo nivel de representación y montaje. Ideal para ambientes de escala residencial.'}, {id:04, nombre: 'Martina L.', bio:'Martina, es el alma tecnológica del grupo, al tanto de todos los avances y actualizaciones sustentables en arquitectura.'}]
         
const enviarForm = document.querySelector('#enviar')
const agregaAmbienteBtn = document.querySelector('#agregarAmb-Btn')
const selectAmbientes = document.querySelector('#ambientes-Select')
const anchoInput = document.querySelector('#ancho-Input')
const largoInput = document.querySelector('#largo-Input')
const divAmbientes = document.querySelector('#div-ambientes')
const ulEstilos = document.querySelector('#ul-estilos')
const divPersonas = document.querySelector('.personas')
const inNombre = document.querySelector('#in-nombre')
const inEmail = document.querySelector('#in-email')
const inCelular = document.querySelector('#in-celular')
const enviarBtn = document.querySelector('#enviar-btn')
let listaAmbientesAgreados = []
let cliente = []

document.addEventListener('DOMContentLoaded', ()=>{
    mostrarEstilo(listaEstilos)
    mostrarArquis(listaArquis)
} )

// CREO Y CARGO LOS OPTIONS DEL SELECT-------------------
listaAmbientes.forEach(ambienteLista => {
    const option = document.createElement('option')
    option.value = ambienteLista.id
    option.innerText = ambienteLista.ambiente
    selectAmbientes.appendChild(option)
})

// CREO Y GUARDO EN UN ARRAY EL OBJETO CREADO
agregaAmbienteBtn.addEventListener('click', function () {
    const indice = selectAmbientes.selectedIndex
    const valores = selectAmbientes.options

    if (valores[indice].text === 'Elegí un ambiente' || anchoInput.value == '' || largoInput.value == '') {
        alert('Completa los datos del ambiente que querés agregar')
        selectAmbientes.focus()
    } else {
        listaAmbientesAgreados.push(new Ambiente(indice, valores[indice].text, anchoInput.value, largoInput.value))
        // INVOCO A LA FUNCION DE ABAJO
        mostrar(listaAmbientesAgreados)
        // PREPARO LOS INPUTS PARA UNA NUEVA CARGA
        anchoInput.value = ''
        largoInput.value = ''
        selectAmbientes.selectedIndex = 0
    }
})
// FUNCION PARA AGREGAR TAGS HTML LI CON EL AMBIENTE CARGADO
// function mostrar(lista){
//     let listaAgregar = ''
//     for(let i = 0; i< lista.length; i++){
//         listaAgregar += 
//         `<li>Ambiente: ${lista[i].nombre}</li>`
//     }
//     console.log(listaAgregar);
//     ulElement.innerHTML = listaAgregar
// }
function cargaStyles(objeto) {
    objeto.style.display = 'inline-block'
    objeto.style.padding = '8px 30px 4px 30px'
    objeto.style.width = '100px'
}

function mostrar(listaAmb) {
    divAmbientes.innerHTML = ''

    listaAmb.forEach(amb => {
        const divAmb = document.createElement('div')
        divAmb.classList.add('card-ambiente')
        // divAmb.style.backgroundColor = '#d6d6d6'
        // divAmb.style.border = '1px solid #ffd900'
        // divAmb.style.borderRadius = '10px'
        // divAmb.style.margin = '5px'

        const nombreAmb = document.createElement('p')
        nombreAmb.classList.add('valores')
        nombreAmb.textContent = amb.nombre
        cargaStyles(nombreAmb)


        const anchoAmb = document.createElement('p')
        anchoAmb.classList.add('valores')
        anchoAmb.textContent = amb.ancho
        cargaStyles(anchoAmb)

        const largoAmb = document.createElement('p')
        largoAmb.classList.add('valores')
        largoAmb.textContent = amb.largo
        cargaStyles(largoAmb)

        const superficieAmb = document.createElement('p')
        superficieAmb.classList.add('valores')
        superficieAmb.textContent = amb.superficie
        cargaStyles(superficieAmb)

        const iconoBorrar = document.createElement('img')
        iconoBorrar.src = '/multimedia/img/trash-2.svg'
        iconoBorrar.style.width = '18px'

        const btnBorrar = document.createElement('button')
        btnBorrar.classList.add('borrar')
        btnBorrar.style.border = 'none'
        btnBorrar.style.backgroundColor = 'transparent'
        btnBorrar.style.margin = '10px 30px 0px 0px'
        btnBorrar.appendChild(iconoBorrar)

        btnBorrar.onclick = () =>{
            borrarAmbiente(amb.id)
        }

        divAmb.appendChild(nombreAmb)
        divAmb.appendChild(anchoAmb)
        divAmb.appendChild(largoAmb)
        divAmb.appendChild(superficieAmb)
        divAmb.appendChild(btnBorrar)

        divAmbientes.appendChild(divAmb)
    })
}

function borrarAmbiente(id){
    // const ambienteSeleccionado = listaAmbientesAgreados.find(item => item.id === index)
    // console.log(listaAmbientesAgreados.splice(ambienteSeleccionado.id, 1))
    // mostrar()
    console.log(id);
    console.log(listaAmbientesAgreados.indexOf(listaAmbientesAgreados.find(item => item.id === id)))
    listaAmbientesAgreados.splice(listaAmbientesAgreados.indexOf(listaAmbientesAgreados.find(item => item.id === id)),1) 
    mostrar(listaAmbientesAgreados)
}


function mostrarEstilo(estilo) {
    ulEstilos.innerHTML = ''
    estilo.forEach(est => {

        const liEstilo = document.createElement('li')
        liEstilo.classList.add('img'+est.id)

        const estiloAmb = document.createElement('h3')
        estiloAmb.textContent = est.estilo
        
        const inputAmb = document.createElement('input')
        inputAmb.id = 'check'+est.estilo
        inputAmb.type = 'checkbox'
        
        estiloAmb.appendChild(inputAmb)
        liEstilo.appendChild(estiloAmb)
        ulEstilos.appendChild(liEstilo)
    })
}

function mostrarArquis(arquis) {
    divPersonas.innerHTML = ''
    arquis.forEach(arq => {

        const divArq = document.createElement('div')
        divArq.classList.add('img'+arq.id)

        const nombreArq = document.createElement('h3')
        nombreArq.textContent = arq.nombre
        
        const bioArq = document.createElement('p')
        bioArq.textContent = arq.bio
        
        divArq.appendChild(nombreArq)
        divArq.appendChild(bioArq)
        divPersonas.appendChild(divArq)
    })
}


enviarBtn.addEventListener('click', ()=>{

    cliente.push(new Cliente(inNombre.value, inEmail.value, inCelular.value))
    console.log(cliente);
})