class Ambiente {
    constructor(nombre, ancho, largo) {
        this.nombre = nombre
        this.ancho = (parseFloat(ancho)).toFixed(2)
        this.largo = (parseFloat(largo)).toFixed(2)
        this.superficie = [(this.ancho * this.largo).toFixed(2)]
    }
    mostrarAmbientesAgregados() {
        alert(`El ambiente agregado es: ${this.nombre}, con un ancho de ${this.ancho} y un largo de ${this.largo}`)
    }
}

// VARIABLES---------------------------------------------
const listaAmbientes = [
    { id: 01, ambiente: 'Cocina' }, { id: 02, ambiente: 'Baño' },
    { id: 03, ambiente: 'Comedor' }, { id: 04, ambiente: 'Estar' },
    { id: 05, ambiente: 'Dormitorio' }, { id: 06, ambiente: 'Quincho' }, { id: 07, ambiente: 'Cochera' }, { id: 08, ambiente: 'Otro' }
]
const agregaAmbienteBtn = document.querySelector('#agregarAmb-Btn')
const selectAmbientes = document.querySelector('#ambientes-Select')
const anchoInput = document.querySelector('#ancho-Input')
const largoInput = document.querySelector('#largo-Input')
const cardAmbientes = document.querySelector('#card-ambientes')
let listaAmbientesAgreados = []

// CREO Y CARGO LOS OPTIONS DEL SELECT-------------------
// for(let i=0; i < listaAmbientes.length; i++){
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
        // ME COSTO MUCHO ENTENDER COMO MANEJAR EL SELECT
        listaAmbientesAgreados.push(new Ambiente(valores[indice].text, anchoInput.value, largoInput.value))

        // NO ME ANDA, TRATO DE INVOCAR A LA FUNCION DE ABAJO
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

function cargaEstilos(objeto) {
    objeto.style.display = 'inline-block'
    objeto.style.padding = '8px 30px 4px 30px'
    objeto.style.width = '100px'
}

function mostrar(listaAmb) {
    cardAmbientes.innerHTML = ''

    listaAmb.forEach(amb => {
        const divAmb = document.createElement('div')
        divAmb.classList.add('div-ambiente')
        divAmb.style.backgroundColor = '#d6d6d6'
        divAmb.style.border = '1px solid #ffd900'
        divAmb.style.borderRadius = '10px'
        divAmb.style.margin = '5px'

        const nombreAmb = document.createElement('p')
        nombreAmb.classList.add('valores')
        nombreAmb.textContent = amb.nombre
        cargaEstilos(nombreAmb)


        const anchoAmb = document.createElement('p')
        anchoAmb.classList.add('valores')
        anchoAmb.textContent = amb.ancho
        cargaEstilos(anchoAmb)

        const largoAmb = document.createElement('p')
        largoAmb.classList.add('valores')
        largoAmb.textContent = amb.largo
        cargaEstilos(largoAmb)

        const superficieAmb = document.createElement('p')
        superficieAmb.classList.add('valores')
        superficieAmb.textContent = amb.superficie
        cargaEstilos(superficieAmb)

        const iconoBorrar = document.createElement('img')
        iconoBorrar.src = '/multimedia/img/trash-2.svg'
        iconoBorrar.style.width = '18px'

        const btnBorrar = document.createElement('button')
        btnBorrar.classList.add('borrar')
        btnBorrar.style.border = 'none'
        btnBorrar.style.backgroundColor = 'transparent'
        btnBorrar.style.margin = '10px 30px 0px 0px'
        btnBorrar.appendChild(iconoBorrar)
        
        

        divAmb.appendChild(nombreAmb)
        divAmb.appendChild(anchoAmb)
        divAmb.appendChild(largoAmb)
        divAmb.appendChild(superficieAmb)
        divAmb.appendChild(btnBorrar)

        cardAmbientes.appendChild(divAmb)
    })
}