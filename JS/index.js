
// INVOCA PRIMERO LAS FUNCIONES PRIORITARIAS---------------
document.addEventListener('DOMContentLoaded', () => {
    mostrarEstilos(listaEstilos)
    mostrarTarjetas(listaTarjetas)
    mostrarArquis(listaArquis)
    txtDescripcion.style.padding = '8px'
    txtDescripcion.focus()
})

// CREA Y CARGA LOS OPTIONS DEL SELECT----------------------
listaAmbientes.forEach(ambienteLista => {
    const option = document.createElement('option')
    option.value = ambienteLista.id
    option.innerText = ambienteLista.ambiente
    selectAmbientes.appendChild(option)
})

// GUARDA EN UNA VARIABLE EL CONTENIDO DEL TEXT AREA CON LA DESCRIPCION DE LO REQUERIDO------
txtDescripcion.addEventListener('change', () => {
    descripcionAgregada = (txtDescripcion.value).toUpperCase()
    console.log(descripcionAgregada);
})

// CREA Y GUARDA EN UN ARRAY EL OBJETO CREADO----------------
agregaAmbienteBtn.addEventListener('click', () => {
    const indice = selectAmbientes.selectedIndex
    const valores = selectAmbientes.options

    if (valores[indice].text === 'Elegí un ambiente' || anchoInput.value == '' || largoInput.value == '') {
        alert('Completa los datos del ambiente que querés agregar')
        // selectAmbientes.focus()
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
function cargaStyles(objeto) {
    objeto.style.display = 'inline-block'
    objeto.style.padding = '8px 30px 4px 30px'
    objeto.style.width = '100px'
}
function mostrar(listaAmb) {
    divAmbientes.innerHTML = ''
    divSupTotal.innerHTML = ''
    listaAmb.forEach(amb => {
        const divAmb = document.createElement('div')
        divAmb.classList.add('card-ambiente')

        const nombreAmb = document.createElement('p')
        nombreAmb.classList.add('valores')
        nombreAmb.textContent = amb.nombre
        cargaStyles(nombreAmb)

        const anchoAmb = document.createElement('p')
        anchoAmb.classList.add('valores')
        anchoAmb.textContent = `${amb.ancho}m`
        cargaStyles(anchoAmb)

        const largoAmb = document.createElement('p')
        largoAmb.classList.add('valores')
        largoAmb.textContent = `${amb.largo}m`
        cargaStyles(largoAmb)

        const superficieAmb = document.createElement('p')
        superficieAmb.classList.add('valores')
        superficieAmb.textContent = `${amb.superficie}m²`
        cargaStyles(superficieAmb)

        const iconoBorrar = document.createElement('img')
        iconoBorrar.src = '/multimedia/img/trash-2.svg'
        iconoBorrar.style.width = '18px'

        const btnBorrar = document.createElement('button')
        btnBorrar.classList.add('borrar')
        btnBorrar.style.border = 'none'
        btnBorrar.style.backgroundColor = 'transparent'
        btnBorrar.style.margin = '10px 30px 0px 30px'
        btnBorrar.appendChild(iconoBorrar)
        btnBorrar.onclick = () => {
            borrarAmbiente(amb.id)
        }
        divAmb.appendChild(nombreAmb)
        divAmb.appendChild(anchoAmb)
        divAmb.appendChild(largoAmb)
        divAmb.appendChild(superficieAmb)
        divAmb.appendChild(btnBorrar)
        divAmbientes.appendChild(divAmb)
    })
    let supTotal = 0
    for (let i = 0; i < listaAmb.length; i++) {
        supTotal += Number(listaAmb[i].superficie)
    }
    const divSup = document.createElement('div')

    const supTot = document.createElement('p')
    supTot.textContent = `Superficie total de remodelación: ${supTotal}m²`
    supTot.style.margin = '10px 30px 10px 30px'
    supTot.style.border = '3px solid #ffd900'
    supTot.style.borderRadius = '10px'
    supTot.style.padding = '5px 20px 5px 20px'

    divSup.appendChild(supTot)
    divSupTotal.appendChild(divSup)
}
function borrarAmbiente(id) {
    console.log(id);
    console.log(listaAmbientesAgreados.indexOf(listaAmbientesAgreados.find(item => item.id === id)))
    listaAmbientesAgreados.splice(listaAmbientesAgreados.indexOf(listaAmbientesAgreados.find(item => item.id === id)), 1)
    mostrar(listaAmbientesAgreados)
}

// AGREGAR MULTIPLES ARCHIVOS(FOTOS) PARA ENVIAR-----------------
btnFotos.addEventListener('change', () => {
    mostrarFotos()
})
function mostrarFotos() {
    divFotos.innerHTML = ''
    let nombre = "";
    listaFotosAgregadas = []
    if ('files' in btnFotos) {
        if (btnFotos.files.length == 0) {
            nombre = "Selecciona alguna foto.";
        } else {
            for (let i = 0; i < btnFotos.files.length; i++) {
                nombre = ` ${(i + 1)} . Archivo`;

                if ('name' in btnFotos.files[i]) {
                    nombre += btnFotos.files[i].name;
                }
                listaFotosAgregadas.push(new Fotos(i + 1, btnFotos.files[i].name))
                const divArchivo = document.createElement('div')
                const nombreArchivo = document.createElement('p')
                nombreArchivo.textContent = nombre
                divArchivo.appendChild(nombreArchivo)
                divFotos.appendChild(divArchivo)
            }
            console.log(listaFotosAgregadas)
            listaFotosAgregadas.forEach(foto => {
                console.log(typeof foto.id);
                console.log(foto.id)
                console.log(foto.nombre)
            })
        }
    }
    else {
        if (btnFotos.value == "") {
            nombre += "Seleccioná alguna foto";
        } else {
            nombre += "Archivo no soportado";
        }
    }
}
// CREA INTERFAZ DE IMAGENES(ESTILOS) Y CHECKS EN EL DOM---------------
function mostrarEstilos(estilo) {
    ulEstilos.innerHTML = ''
    let i = 0
    estilo.forEach(est => {
        const liEstilo = document.createElement('li')
        liEstilo.classList.add('img' + est.id)

        const estiloAmb = document.createElement('h3')
        estiloAmb.textContent = est.estilo

        const inputAmb = document.createElement('input')
        inputAmb.id = 'check' + est.estilo
        inputAmb.name = est.estilo
        inputAmb.type = 'checkbox'
        inputAmb.onclick = () => {
            estiloSelecc += `${est.estilo} `
            console.log(estiloSelecc);
        }
        if (i === 3) inputAmb.checked = true
        i++
        estiloAmb.appendChild(inputAmb)
        liEstilo.appendChild(estiloAmb)
        ulEstilos.appendChild(liEstilo)
    })
}
// GUARDA VALORES DE COLORES SELECCIONADOS EN UN ARRAY--------------------
colorPrim.addEventListener('change', () => {
    cargarColores()
    // console.log(colorPrim.value);
})
colorSec.addEventListener('change', () => {
    cargarColores()
    // console.log(colorSec.value);
})
colorNeutro.addEventListener('change', () => {
    cargarColores()
    // console.log(colorNeutro.value);
})
function cargarColores() {
    listaColoresElegidos = []
    listaColoresElegidos.push(new Colores(colorPrim.value, colorSec.value, colorNeutro.value))
    console.log(listaColoresElegidos)
}
// CREA INTERFAZ EN DOM DE ARQUITECTOS---------------------
function mostrarArquis(arquis) {
    divPersonas.innerHTML = ''
    let i = 0
    arquis.forEach(arq => {
        const divArq = document.createElement('div')
        divArq.classList.add('img' + arq.id)

        const nombreArq = document.createElement('h3')
        nombreArq.textContent = arq.nombre

        const checkArq = document.createElement('input')
        checkArq.type = 'radio'
        checkArq.name = 'arq'
        checkArq.onclick = () => {
            arqElegido = arq.nombre
            console.log(arqElegido = arq.nombre)
        }

        const bioArq = document.createElement('p')
        bioArq.textContent = arq.bio

        if (i === 1) checkArq.checked = true
        i++
        nombreArq.appendChild(checkArq)
        divArq.appendChild(nombreArq)
        divArq.appendChild(bioArq)
        divPersonas.appendChild(divArq)
    })
}

// GUARDA EL ESTADO DEL PLAN ELEGIDO-------------------------------
chkPersonalizado.addEventListener('change', () => {
    verificaPlan()
})
chkPremium.addEventListener('change', () => {
    verificaPlan()
})
let paso = 0
function verificaPlan() {
    if (chkPersonalizado.checked) {
        if (paso === 1) {
            const divPremium = document.querySelector('#divPremCtas')
            articlePremium.removeChild(divPremium)
        }
        planElegido = listaPagos[0].tipo
        const divCuotas = document.createElement('div')
        divCuotas.id = 'divPersonCtas'

        const labelCuotas = document.createElement('p')
        labelCuotas.textContent = 'Ingresa la cantidad de cuotas'
        labelCuotas.style.fontWeight = 'bold'

        const inputCuotas = document.createElement('input')
        inputCuotas.required = true
        inputCuotas.placeholder = '3'
        inputCuotas.maxLength = 1
        inputCuotas.onblur = ()=>{
            if(inputCuotas.value === '' || isNaN(inputCuotas.value)){
                console.log('verifique los datos')
                inputCuotas.value = ''
                inputCuotas.focus()
            }else cuotas = inputCuotas.value
        }
        inputCuotas.style.width = '3rem'
        inputCuotas.style.marginBottom = '1rem'

        divCuotas.appendChild(labelCuotas)
        divCuotas.appendChild(inputCuotas)
        articlePersonalizado.appendChild(divCuotas)
        paso = 1
    } else {
        if (paso === 1) {
            const divPersonalizado = document.querySelector('#divPersonCtas')
            articlePersonalizado.removeChild(divPersonalizado)
        }
        planElegido = listaPagos[1].tipo

        const divCuotas = document.createElement('div')
        divCuotas.id = 'divPremCtas'

        const labelCuotas = document.createElement('p')
        labelCuotas.textContent = 'Ingresa la cantidad de cuotas'
        labelCuotas.style.fontWeight = 'bold'

        const inputCuotas = document.createElement('input')
        inputCuotas.required = true
        inputCuotas.placeholder = '3'
        inputCuotas.maxLength = 1
        inputCuotas.onblur = ()=>{
            if(inputCuotas.value === '' || isNaN(inputCuotas.value)){
                console.log('verifique los datos')
                inputCuotas.value = ''
                inputCuotas.focus()
            }else cuotas = inputCuotas.value
        }
        inputCuotas.style.width = '3rem'
        inputCuotas.style.marginBottom = '1rem'

        divCuotas.appendChild(labelCuotas)
        divCuotas.appendChild(inputCuotas)
        articlePremium.appendChild(divCuotas)
        paso = 1
    }
}

// CREA Y MUESTRA TARJETAS Y FORMAS DE PAGO  EN DOM----------------
function mostrarTarjetas(tarjetas) {
    divPagos.innerHTML = ''
    let i = 0
    tarjetas.forEach(tarj => {

        const divTarjeta = document.createElement('div')

        const img = document.createElement('img')
        img.src = tarj.path

        const checkTarjeta = document.createElement('input')
        checkTarjeta.type = 'radio'
        checkTarjeta.name = 'forma-pago'
        checkTarjeta.onclick = () => {
            tarjetaElegida = tarj.nombre
            console.log(tarjetaElegida = tarj.nombre)
        }
        if (i === 0) checkTarjeta.checked = true
        i++
        divTarjeta.appendChild(img)
        divTarjeta.appendChild(checkTarjeta)
        divPagos.appendChild(divTarjeta)
    })
}
inCelular.addEventListener('blur', () => {
    if (inNombre.value === '' || inEmail.value === '' || inCelular.value === '') {
        console.log('Faltan datos');
    }else{
        cliente.push(new Cliente(inNombre.value, inEmail.value, inCelular.value))
        console.log(cliente);}
})

// CARGA LOS DATOS DEL CLIENTE EN UN OBJETO------------------
enviarBtn.addEventListener('click', () => {

})