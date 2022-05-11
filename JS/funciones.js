//PROBANDO OBTENER COORDENADAS DE GEOLOCALIZACION, CARGA AUTOMATICAMENTE EL INPUT EN CONTACTO------
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(ubicacion => {
            const lat = ubicacion.coords.latitude
            const lon = ubicacion.coords.longitude
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c8039287a702d0842ec17782871aba21`
            fetch(url)
                .then(response => { return response.json() })

                .then(ciudad => {
                    console.log(ciudad)
                    if (ciudad.name === 'Departamento de Capital') {
                        ciudadAct = `Córdoba - ${ciudad.sys.country}`
                        paisAct = ciudad.sys.country
                        inCiudad.value = `${ciudadAct}`
                        inCiudad.disabled = true
                    } else ciudadAct = `${ciudad.sys.country} - ${ciudad.sys.country}`
                })
                .catch(error => { console.log(error) })
        })
    }
})
// const cargarUbicacion = async () => {
//     const respuesta = await fetch(url)
//     const ciudad = await respuesta.json()
//     console.log(ciudad);
//     } 
// INVOCA PRIMERO LAS FUNCIONES PRIORITARIAS---------------
document.addEventListener('DOMContentLoaded', () => {
    // debugger
    Swal.fire({
        title: "Bienvenido!!, ingresá tú nombre",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Registrar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: '#d3b300',
        confirmButtonColor: '#414141',
        color: '#000',
        toast: true,

        inputValidator: nombre => {
            if (!nombre) {
                return "No ingresaste nada, proba de nuevo"
            } else {
                return undefined;
            }
        }
    })
        .then(resultado => {
            if (resultado.value) {
                let nombre = resultado.value.toUpperCase().trim()
                Swal.fire({
                    toast: true,
                    icon: 'success',
                    iconColor: '#414141',
                    color: '#414141',
                    background: '#ffe656',
                    title: `Bien hecho ${nombre}!, ahora comenzemos con el presupuesto!`,
                    showConfirmButton: false,
                    timer: 2000
                })
                cardRegistrosExistentes(nombre)
            }
        })

    mostrarEstilos()
    mostrarTarjetas(listaTarjetas)
    txtDescripcion.focus()
    listaColoresElegidos = new Colores(colorPrim.value, colorSec.value, colorNeutro.value)
    ocultaBotonesEnvio()
})

function cardRegistrosExistentes(inputNombre) {
    repoActualizado = JSON.parse(localStorage.getItem(inputNombre)) ?? []

    if (repoActualizado.length != 0) {
        divRegistroExistente.innerHTML = ''
        let i = 1
        let nomAmbiente = ''

        const tituloRegistro = document.createElement('h4')
        tituloRegistro.id = 'tituloreg'
        tituloRegistro.textContent = repoActualizado.length > 1 ? `Hola ${inputNombre.toUpperCase()}, tenes éstas remodelaciones registradas!` : `Hola ${inputNombre.toUpperCase()}, tenes una remodelación registrada!`
        divRegistroExistente.appendChild(tituloRegistro)
        if (inputNombre != '') {
            inNombre.value = `${inputNombre}`.toUpperCase()
            inEmail.value = repoActualizado[0].cliente.email
            inCelular.value = repoActualizado[0].cliente.celular
            inCiudad.value = `${ciudadAct}`
            inNombre.disabled = true
            inCiudad.disabled = true
        }

        repoActualizado.forEach(({ ambiente, arq, plan, fecha }) => {
            nomAmbiente = ''
            ambiente.forEach(({ nombre, superficie }) => {
                nomAmbiente += `${nombre} sup.: ${superficie}m2 `
            })
            const registro = document.createElement('p')
            registro.id = 'registroExtist'
            registro.textContent = `${fecha} -${i} - ${nomAmbiente} -  ${plan.nombre}  - arq.: ${arq}`
            divRegistroExistente.appendChild(registro)
            i++
        })
    } else {
        divRegistroExistente.innerHTML = ''
        const tituloRegistro = document.createElement('h4')
        tituloRegistro.id = 'tituloreg'
        tituloRegistro.textContent = `Hola ${inputNombre}!`
        divRegistroExistente.appendChild(tituloRegistro)
        const registro = document.createElement('p')
        registro.style.textAlign = 'center'
        registro.id = 'registroExtist'
        registro.textContent = `No hay registros de remodelaciones a tú nombre`
        inNombre.value = `${inputNombre}`.toUpperCase()
        inCiudad.value = `${ciudadAct}`
        inNombre.disabled = true
        inCiudad.disabled = true
        divRegistroExistente.appendChild(registro)
    }
}

function ocultaBotonesEnvio() {
    enviarBtn.style.display = 'none'
    borrarBtn.style.display = 'none'
}

// CARGA LISTA DESDE JSON LOCAL---------------------------------------------------------------------------
const cargarLista = async () => {
    const respuesta = await fetch('../JS/listaAmbientes.json')
    ambientes = await respuesta.json()

    ambientes.forEach(({ id, ambiente }) => {
        const option = document.createElement('option')
        option.value = id
        option.innerText = ambiente
        selectAmbientes.appendChild(option)
    })
}
//SIMULA CARGA ASINCRONICA - RETARDO CON PROMESA Y SETTIMEOUT --------------------------------------
// const uploadSelectDelay = () =>{
//     return new Promise((resolve) =>{
//         setTimeout(()=>{
//             resolve (listaAmbientes.forEach(({ id, ambiente }) => {
//                 const option = document.createElement('option')
//                 option.value = id
//                 option.innerText = ambiente
//                 selectAmbientes.appendChild(option)
//             }))
//         }, 4000)
//     })
// }
// uploadSelectDelay()
// .then((select) => select)

function cargaStyles(objeto) {
    objeto.style.display = 'inline-block'
    objeto.style.padding = '8px 20px 4px 20px'
    objeto.style.width = '70px'
}

function mostrar(listaAmb) {
    divAmbientes.innerHTML = ''
    divSupTotal.innerHTML = ''
    listaAmb.forEach(({ id, nombre, ancho, largo, superficie }) => {

        const divAmb = document.createElement('div')
        divAmb.classList.add('card-ambiente')

        const nombreAmb = document.createElement('p')
        nombreAmb.classList.add('valores')
        nombreAmb.textContent = nombre
        cargaStyles(nombreAmb)
        nombreAmb.style.width = '100px'

        const anchoAmb = document.createElement('p')
        anchoAmb.classList.add('valores')
        anchoAmb.textContent = `${ancho}m`
        cargaStyles(anchoAmb)

        const largoAmb = document.createElement('p')
        largoAmb.classList.add('valores')
        largoAmb.textContent = `${largo}m`
        cargaStyles(largoAmb)

        const superficieAmb = document.createElement('p')
        superficieAmb.classList.add('valores')
        superficieAmb.textContent = `${superficie}m²`
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
            borrarAmbiente(id)
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
    listaAmbientesAgreados.splice(listaAmbientesAgreados.indexOf(listaAmbientesAgreados.find(item => item.id === id)), 1)
    mostrar(listaAmbientesAgreados)
}

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
// function mostrarEstilos(estilo) {
//     ulEstilos.innerHTML = ''
//     estilo.forEach(({ id, estilo }) => {

//         const liEstilo = document.createElement('li')
//         liEstilo.classList.add('img' + id)

//         const estiloAmb = document.createElement('h3')
//         estiloAmb.textContent = estilo

//         const inputAmb = document.createElement('input')
//         inputAmb.id = 'check' + estilo
//         inputAmb.name = estilo
//         inputAmb.type = 'checkbox'
//         inputAmb.style.width = '1.2rem'
//         inputAmb.style.height = '1.2rem'

//         estiloAmb.appendChild(inputAmb)
//         liEstilo.appendChild(estiloAmb)
//         ulEstilos.appendChild(liEstilo)
//     })
// }

// CARGA ESTILOS DE SERVIDOR REMOTO (JSON ALOJADO EN https://www.mockable.io/)
const mostrarEstilos = async () => {
    const respuesta = await fetch('http://demo3158107.mockable.io/estilos')
    estilos = await respuesta.json()

    ulEstilos.innerHTML = ''
    estilos.forEach(({ id, estilo }) => {

        const liEstilo = document.createElement('li')
        liEstilo.classList.add('img' + id)

        const estiloAmb = document.createElement('h3')
        estiloAmb.textContent = estilo

        const inputAmb = document.createElement('input')
        inputAmb.id = 'check' + estilo
        inputAmb.name = estilo
        inputAmb.type = 'checkbox'
        inputAmb.style.width = '1.2rem'
        inputAmb.style.height = '1.2rem'

        estiloAmb.appendChild(inputAmb)
        liEstilo.appendChild(estiloAmb)
        ulEstilos.appendChild(liEstilo)
    })
}

function cargarColores() {
    listaColoresElegidos = ''
    listaColoresElegidos = new Colores(colorPrim.value, colorSec.value, colorNeutro.value)
    console.log(listaColoresElegidos)
}

// CREA INTERFAZ EN DOM DE ARQUITECTOS---------------------

const cargarArquis = async () => {
    const respuesta = await fetch('../JS/listaArquis.json')
    arquis = await respuesta.json()

    divPersonas.innerHTML = ''
    arquis.forEach(({ id, nombre, bio }) => {
        const divArq = document.createElement('div')
        divArq.classList.add('img' + id)

        const nombreArq = document.createElement('h3')
        nombreArq.textContent = nombre

        const checkArq = document.createElement('input')
        checkArq.type = 'radio'
        checkArq.name = 'arq'
        checkArq.style.width = '1.2rem'
        checkArq.style.height = '1.2rem'
        checkArq.style.marginLeft = '0.8rem'

        checkArq.onclick = () => {
            arqElegido = nombre
            console.log(arqElegido)
        }

        const bioArq = document.createElement('p')
        bioArq.textContent = bio
        nombreArq.appendChild(checkArq)
        divArq.appendChild(nombreArq)
        divArq.appendChild(bioArq)
        divPersonas.appendChild(divArq)
    })
}

// VARIABLE PASO, CHEQUEA SI ES LA PRIMERA VEZ Q SE EJECUTA LA FUNCION----

function verificaPlan() {
    if (chkPersonalizado.checked) {
        if (paso === 1) {
            const divPremium = document.querySelector('#divPremCtas')
            articlePremium.removeChild(divPremium)
        }
        const divCuotas = document.createElement('div')
        divCuotas.id = 'divPersonCtas'

        const labelCuotas = document.createElement('p')
        labelCuotas.textContent = 'Ingresa la cantidad de cuotas'
        labelCuotas.style.fontWeight = 'bold'

        const inputCuotas = document.createElement('input')
        inputCuotas.required = true
        inputCuotas.placeholder = '3'
        inputCuotas.maxLength = 1
        inputCuotas.onblur = () => {
            if (inputCuotas.value === '' || isNaN(inputCuotas.value)) {
                console.log('verifique los datos')
                inputCuotas.value = ''
                inputCuotas.focus()
            } else {
                planElegido = new PlanPago(listaPagos[0].tipo, listaPagos[0].precio, inputCuotas.value)
                console.log(planElegido)
            }
        }
        console.log(cuotas)
        inputCuotas.style.width = '3rem'
        inputCuotas.style.height = '1.5rem'
        inputCuotas.style.marginBottom = '1rem'
        inputCuotas.style.border = '2px solid #ff156f'
        inputCuotas.style.borderRadius = '8px'
        inputCuotas.style.textAlign = 'center'
        inputCuotas.style.fontSize = '1.1rem'

        divCuotas.appendChild(labelCuotas)
        divCuotas.appendChild(inputCuotas)
        articlePersonalizado.appendChild(divCuotas)
        paso = 1
    } else {
        if (paso === 1) {
            const divPersonalizado = document.querySelector('#divPersonCtas')
            articlePersonalizado.removeChild(divPersonalizado)
        }

        const divCuotas = document.createElement('div')
        divCuotas.id = 'divPremCtas'

        const labelCuotas = document.createElement('p')
        labelCuotas.textContent = 'Ingresa la cantidad de cuotas'
        labelCuotas.style.fontWeight = 'bold'

        const inputCuotas = document.createElement('input')
        inputCuotas.required = true
        inputCuotas.placeholder = '3'
        inputCuotas.maxLength = 1
        inputCuotas.onblur = () => {
            if (inputCuotas.value === '' || isNaN(inputCuotas.value)) {
                console.log('verifique los datos')
                inputCuotas.value = ''
                inputCuotas.focus()
            } else {
                planElegido = new PlanPago(listaPagos[1].tipo, listaPagos[1].precio, inputCuotas.value)
                console.log(planElegido)
            }
        }
        inputCuotas.style.width = '3rem'
        inputCuotas.style.height = '1.5rem'
        inputCuotas.style.marginBottom = '1rem'
        inputCuotas.style.border = '2px solid #ff156f'
        inputCuotas.style.borderRadius = '8px'
        inputCuotas.style.textAlign = 'center'
        inputCuotas.style.fontSize = '1.1rem'

        divCuotas.appendChild(labelCuotas)
        divCuotas.appendChild(inputCuotas)
        articlePremium.appendChild(divCuotas)
        paso = 1
    }
}

// CREA Y MUESTRA TARJETAS Y FORMAS DE PAGO  EN DOM----------------
function mostrarTarjetas(tarjetas) {
    divPagos.innerHTML = ''
    tarjetas.forEach(({ path, nombre }) => {

        const divTarjeta = document.createElement('div')

        const img = document.createElement('img')
        img.src = path

        const checkTarjeta = document.createElement('input')
        checkTarjeta.type = 'radio'
        checkTarjeta.name = 'forma-pago'
        checkTarjeta.className = 'tarjetasChk'
        checkTarjeta.onclick = () => {
            tarjetaElegida = nombre
            console.log(tarjetaElegida = nombre)
        }

        divTarjeta.appendChild(img)
        divTarjeta.appendChild(checkTarjeta)
        divPagos.appendChild(divTarjeta)
    })
}

function subeALocalSorage(clave, archivo) {
    bajaDelLocalStorage = JSON.parse(localStorage.getItem(clave)) ?? []
    bajaDelLocalStorage.push(archivo)
    localStorage.setItem(clave, JSON.stringify(bajaDelLocalStorage))
}
// ESTOY LOGRANDO HACER ANDAR LA FUNCION, MANIPULAR LOS DATOS
function cargarReporte(repo) {
    ulReporte.innerHTML = ''
    let repoFotos = ''
    let supTotalAmb = 0
    mostrarReporte = ''
    repo.forEach(({ descripcion, ambiente, fotos, estilo, colores, arq, plan, tarjeta, cliente, fecha }) => {
        let repoAmb = ''
        ambiente.forEach(({ nombre, superficie }) => {
            repoAmb += `${nombre} superficie: ${superficie}m²<br> `
            supTotalAmb += parseInt(superficie)
        })
        repoFotos = ''
        fotos.forEach(({ nombre }) => {
            repoFotos += `Imagen: ${nombre}<br>`
        })

        mostrarReporte += `
        <div>
        <h2>Hola ${cliente.nombre}</h2>
        <li>
            ${descripcion}<br>
        </li>
        <li>
            ${repoAmb}
        </li>
        <li>
            ${repoFotos}
        </li>
        <li>
            Los estilos elegidos: ${estilo}
        </li>
        <li>
            Color primario: ${colores.primario}<br>
            Color secundario: ${colores.secundario}<br>
            Color neutro: ${colores.neutro}
        </li>
        <li>
            Responsable del proyecto: ${arq}
        </li>
        <li>
            PLAN: ${plan.nombre.toUpperCase()}<br>
            Precio de contado por ambiente(hasta 18m²): $${plan.precioContado}<br>
            Superficie total a remodelar: ${supTotalAmb}m²<br>
            con un precio total de obra de: $${Number(parseFloat((supTotalAmb / 18) * plan.precioContado).toFixed(2))}<br>
            en ${plan.cuotass} cuotas de : $${Number(parseFloat(((supTotalAmb / 18) * plan.precioContado) / plan.cuotass).toFixed(2))}
        </li>
        <li>
            Los pagos los harías por medio de: ${tarjeta}
        </li>
        <li>
            Fecha del presupuesto: ${fecha}
        </li>
        </div>
        `
    })
    ulReporte.innerHTML = mostrarReporte
}
function manejadorSubm(e) {
    e.preventDefault()

    const validaForm = formularioPagina.checkValidity()
    console.log(validaForm)
    if (validaForm) {

        const nuevoCliente = new Cliente(inNombre.value, inEmail.value, inCelular.value, `${inCiudad.value} - ${paisAct}`)
        console.log(nuevoCliente)

        const nuevoReporte = new Reporte(descripcionAgregada, listaAmbientesAgreados, listaFotosAgregadas, estiloSelecc, listaColoresElegidos, arqElegido, planElegido, tarjetaElegida, nuevoCliente)
        console.log(nuevoReporte)

        subeALocalSorage(`${inNombre.value.toUpperCase()}`, nuevoReporte)
        repoActualizado = []
        console.log(`${inNombre.value}`)
        repoActualizado = JSON.parse(localStorage.getItem(`${inNombre.value.toUpperCase()}`)) ?? []

        cargarReporte(repoActualizado)
        cardRegistrosExistentes(`${inNombre.value.toUpperCase()}`)
        ocultaBotonesEnvio()

        Swal.fire({
            Title: "Presupuesto enviado",
            html: "<b class ='aviso'>Gracias por confiar en nosortros!<br>Vamos a trabajar en con tu caso y te contactaremos en no mas de 48hs!</b>",
            icon: 'success',
            iconColor: '#414141',
            color: '#414141',
            background: '#ffe656',
            timer: 5000,
            timerProgressBar: true,
            toast: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterkey: false,
            stopKeydownPropagation: true,
            confirmButtonColor: '#414141'
        })
        nombreCliente = `${inNombre.value.toUpperCase()}`
        divAmbientes.innerHTML = ''
        divSupTotal.innerHTML = ''
        divFotos.innerHTML = ''
        e.target.reset()
        inhabilitaForm()
    }

    const borraLStorageBtn = document.createElement('button')
    borraLStorageBtn.id = 'borraLocS-Btn'
    borraLStorageBtn.textContent = 'Borrar ultimo registro'

    borraLStorageBtn.addEventListener('click', () => {

        Swal.fire({
            title: 'Estás seguro que queres borrar el registro?',
            text: "Una vez borrado, no se podra recuperar!",
            icon: 'warning',
            iconColor: '#414141',
            background: '#ffe656',
            cancelButtonColor: '#414141',
            confirmButtonColor: '#F44336',
            color: '#000',
            showCancelButton: true,
            confirmButtonText: 'Borrar!',
            toast: true
        }).then((result) => {
            if (result.isConfirmed) {
                repoActualizado = JSON.parse(localStorage.getItem(nombreCliente)) ?? []
                console.log(repoActualizado)

                if (repoActualizado.length != 0) {
                    repoActualizado.pop()
                    localStorage.removeItem(nombreCliente)
                    localStorage.setItem(nombreCliente, JSON.stringify(repoActualizado))
                    cargarReporte(repoActualizado)
                    cardRegistrosExistentes(nombreCliente)

                    if (repoActualizado.length === 0) borraLStorageBtn.style.display = 'none'
                } else {
                    borraLStorageBtn.style.display = 'none'
                }
            }
        })
    })

    divBtn.appendChild(borraLStorageBtn)
}

function inhabilitaForm() {
    txtDescripcion.disabled = true
    agregaAmbienteBtn.disabled = true
    selectAmbientes.disabled = true
    btnFotos.disabled = true
    colorPrim.disabled = true
    colorSec.disabled = true
    colorNeutro.disabled = true
    chkPersonalizado.disabled = true
    chkPremium.disabled = true
    chksEstilos.forEach(checkbox => {
        checkbox.disabled = true
    })
}




