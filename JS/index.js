class Ambiente{
    constructor(nombre, ancho, largo){
        this.nombre = nombre
        this.ancho = ancho
        this.largo = largo
    }
    mostrarAmbientesAgregados(){
        alert(`El ambiente agregado es: ${this.nombre}, con un ancho de ${this.ancho} y un largo de ${this.largo}`)
    }
}

// VARIABLES---------------------------------------------
const listaAmbientes = [
    {id:01, ambiente:'Cocina'}, {id:02, ambiente:'Baño'},
    {id:03, ambiente:'Comedor'}, {id:04, ambiente:'Estar'},
    {id:05, ambiente:'Dormitorio'}, {id:06, ambiente:'Quincho'},{id:07, ambiente:'Cochera'}, {id:08, ambiente:'Otro'}
]
const selectAmbientes = document.querySelector('#ambientes-Select')
const agregaAmbienteBtn = document.querySelector('#agregarAmb-Btn')
const anchoInput = document.querySelector('#ancho-Input')
const largoInput = document.querySelector('#largo-Input')
const ulElement = document.querySelector('#ul-element')
let listaAmbientesAgreados = []

// CREO Y CARGO LOS OPTIONS DEL SELECT-------------------
for(let i=0; i < listaAmbientes.length; i++){
    const option = document.createElement('option')
    option.value = listaAmbientes[i].id
    option.innerText = listaAmbientes[i].ambiente
    selectAmbientes.appendChild(option)
}

// CREO Y GUARDO EN UN ARRAY EL OBJETO CREADO
agregaAmbienteBtn.addEventListener('click', function(){
    const indice = selectAmbientes.selectedIndex
    const valores = selectAmbientes.options

    // ME COSTO MUCHO ENTENDER COMO MANEJAR EL SELECT
    listaAmbientesAgreados.push(new Ambiente(valores[indice].text, anchoInput.value, largoInput.value))

    // NO ME ANDA, TRATO DE INVOCAR A LA FUNCION DE ABAJO
    mostrar(listaAmbientesAgreados)

    // PREPARO LOS INPUTS PARA UNA NUEVA CARGA
    anchoInput.value = ''
    largoInput.value = ''
    selectAmbientes.selectedIndex = 0
})

// FUNCION PARA AGREGAR TAGS HTML LI CON EL AMBIENTE CARGADO
function mostrar(lista){
    let listaAgregar = ''
    for(let i = 0; i< lista.length; i++){
        listaAgregar += 
        `<li>Ambiente: ${lista[i].nombre}</li>`
    }
    console.log(listaAgregar);
    ulElement.innerHTML = listaAgregar
}
