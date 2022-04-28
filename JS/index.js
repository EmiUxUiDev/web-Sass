
// INVOCA PRIMERO LAS FUNCIONES PRIORITARIAS---------------
document.addEventListener('DOMContentLoaded', () => {
    mostrarEstilos(listaEstilos)
    mostrarTarjetas(listaTarjetas)
    mostrarArquis(listaArquis)
    txtDescripcion.style.padding = '8px'
    txtDescripcion.focus()
    listaColoresElegidos = new Colores(colorPrim.value, colorSec.value, colorNeutro.value)
    ocultaBotonesEnvio()
})
function ocultaBotonesEnvio() {
    enviarBtn.style.display = 'none'
    borrarBtn.style.display = 'none'
}
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
    console.log(descripcionAgregada)
})

// CREA Y GUARDA EN UN ARRAY EL OBJETO CREADO----------------
agregaAmbienteBtn.addEventListener('click', () => {
    const indice = selectAmbientes.selectedIndex
    const valores = selectAmbientes.options
    if (valores[indice].text === 'Elegí un ambiente' || anchoInput.value == '' || largoInput.value == '') {
        alert('Completa los datos del ambiente que querés agregar')
    } else {
        listaAmbientesAgreados.push(new Ambiente(indice, valores[indice].text, anchoInput.value, largoInput.value))
        console.log(listaAmbientesAgreados)
        // INVOCO A LA FUNCION DE ABAJO
        mostrar(listaAmbientesAgreados)
        // PREPARO LOS INPUTS PARA UNA NUEVA CARGA
        anchoInput.value = 0
        largoInput.value = 0
        selectAmbientes.selectedIndex = 0
        btnFotos.focus()
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
    // let i = 0
    estilo.forEach(est => {
        const liEstilo = document.createElement('li')
        liEstilo.classList.add('img' + est.id)

        const estiloAmb = document.createElement('h3')
        estiloAmb.textContent = est.estilo

        const inputAmb = document.createElement('input')
        inputAmb.id = 'check' + est.estilo
        inputAmb.name = est.estilo
        inputAmb.type = 'checkbox'
        // inputAmb.onclick = () => {
        //     estiloSelecc += `${est.estilo} `
        //     console.log(estiloSelecc);
        // }
        // if (i === 3) inputAmb.checked = true
        // i++
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
    listaColoresElegidos = ''
    listaColoresElegidos = new Colores(colorPrim.value, colorSec.value, colorNeutro.value)
    console.log(listaColoresElegidos)
}
// CREA INTERFAZ EN DOM DE ARQUITECTOS---------------------
function mostrarArquis(arquis) {
    divPersonas.innerHTML = ''
    // let i = 0
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
            console.log(arqElegido)
        }

        const bioArq = document.createElement('p')
        bioArq.textContent = arq.bio
        // if (i === 1) checkArq.checked = true
        // i++
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
// VARIABLE PASO, CHEQUEA SI ES LA PRIMERA VEZ Q SE EJECUTA LA FUNCION----
let paso = 0
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
                // planElegido.push(new PlanPago(listaPagos[1].tipo, listaPagos[1].precio, inputCuotas.value))
                // console.log(planElegido)
                planElegido = new PlanPago(listaPagos[1].tipo, listaPagos[1].precio, inputCuotas.value)
                console.log(planElegido)
            }
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
    // let i = 0
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
        // if (i === 0) checkTarjeta.checked = true
        // i++
        divTarjeta.appendChild(img)
        divTarjeta.appendChild(checkTarjeta)
        divPagos.appendChild(divTarjeta)
    })
}
inCelular.addEventListener('blur', () => {
    if (inNombre.value === '' || inEmail.value === '' || inCelular.value === '') {
        console.log('Faltan datos');
    } else {
        // CARGA CHECKBOX SELECCIONADOS------------------------------
        const chkChecked = document.querySelectorAll('input[type=checkbox]:checked')
        const chkEstilo1 = document.querySelector('#checkClasico')
        console.log(chkChecked)
        if (chkChecked.length != 0) {
            chkChecked.forEach(chkActual => {
                estiloSelecc += `${chkActual.name} `
            })
        } else {
            console.log('Selecciona algun estilo')
            chkEstilo1.focus()
        }

        enviarBtn.style.display = 'block'
        borrarBtn.style.display = 'block'
    }
})
// CARGA LOS DATOS DEL CLIENTE EN UN OBJETO------------------
formularioPagina.addEventListener('submit', manejadorSubm)
function inhabilitaContactos(){
    inNombre.disabled = true
    inEmail.disabled = true
    inCelular.disabled = true
}
function subeALocalSorage(clave, archivo) {
    bajaDelLocalStorage = JSON.parse(localStorage.getItem(clave)) || []
    bajaDelLocalStorage.push(archivo)
    localStorage.setItem(clave, JSON.stringify(bajaDelLocalStorage))
}
// ESTOY LOGRANDO HACER ANDAR LA FUNCION, MANIPULAR LOS DATOS
function cargarReporte(repo) {
    debugger
    ulReporte.innerHTML = ''
    let repoFotos = ''
    let supTotalAmb = 0
    repo.forEach(elemento => {
        let repoAmb = ''
        elemento.ambiente.forEach(item => {
            repoAmb += `${item.nombre} superficie: ${item.superficie}m²<br> `
            supTotalAmb += parseInt(item.superficie)
        })
        repoFotos = ''
        elemento.fotos.forEach(item => {
            repoFotos += `Imagen: ${item.nombre}<br>`
        })

        mostrarReporte += `
    <h2>Hola ${elemento.cliente.nombre}</h2>
        <li>
            ${elemento.descripcion}<br>
        </li><hr><br>
        <li>
            ${repoAmb}
        </li><hr><br>
        <li>
            ${repoFotos}
        </li><hr><br>
        <li>
            Los estilos elegidos: ${elemento.estilo}
        </li><hr><br>
        <li>
            Color primario: ${elemento.colores.primario}<br>
            Color secundario: ${elemento.colores.secundario}<br>
            Color neutro: ${elemento.colores.neutro}
        </li><hr><br>
        <li>
            Responsable del proyecto: ${elemento.arq}
        </li><hr><br>
        <li>
            PLAN: ${elemento.plan.nombre.toUpperCase()}<br>
            Precio de contado por ambiente(hasta 18m²): $${elemento.plan.precioContado}<br>
            Superficie total a remodelar: ${supTotalAmb}m²<br>
            con un precio total de obra de: $${Number(parseFloat((supTotalAmb / 18) * elemento.plan.precioContado).toFixed(2))}<br>
            en ${elemento.plan.cuotass} cuotas de : $${Number(parseFloat(((supTotalAmb / 18) * elemento.plan.precioContado) / elemento.plan.cuotass).toFixed(2))}
        </li><hr><br>
        <li>
            Los pagos los harías por medio de: ${elemento.tarjeta}
        </li><hr><br>
        <li>
            Fecha del presupuesto: ${elemento.fecha}
        </li><hr><br><br>
        `
    })
}
function manejadorSubm(e) {
    e.preventDefault()

    const validaForm = formularioPagina.checkValidity()
    console.log(validaForm)
    if (validaForm) {

        const nuevoCliente = new Cliente(inNombre.value, inEmail.value, inCelular.value)
        console.log(nuevoCliente)

        const nuevoReporte = new Reporte(descripcionAgregada, listaAmbientesAgreados, listaFotosAgregadas, estiloSelecc, listaColoresElegidos, arqElegido, planElegido, tarjetaElegida, nuevoCliente)
        console.log(nuevoReporte)

        subeALocalSorage(`${inNombre.value}`, nuevoReporte)
        repoActualizado = []
        repoActualizado = JSON.parse(localStorage.getItem(`${inNombre.value}`)) || []
        cargarReporte(repoActualizado)
        ocultaBotonesEnvio()
        inhabilitaContactos()
        nombreCliente =  `${inNombre.value}`
        divAmbientes.innerHTML = ''
        divSupTotal.innerHTML = ''
        divFotos.innerHTML = ''
        e.target.reset()
    }
    
    ulReporte.innerHTML = mostrarReporte

    const borraLStorageBtn = document.createElement('button')
    borraLStorageBtn.id = 'borraLocS-Btn'
    borraLStorageBtn.textContent = 'Borrar ultimo registro'
    borraLStorageBtn.addEventListener('click', () =>{
        repoActualizado = JSON.parse(localStorage.getItem(nombreCliente)) || []
        console.log(repoActualizado)
        // debugger
        if (repoActualizado != 0) {
            repoActualizado.pop()
            localStorage.removeItem(nombreCliente)
            localStorage.setItem(nombreCliente, JSON.stringify(repoActualizado))
            // NO SE PORQUE NO INVOCA A LA FUNCION 
            cargarReporte(repoActualizado)
        } else borraLStorageBtn.style.display = 'none'
    }) 
        
    divBtn.appendChild(borraLStorageBtn)
}  

