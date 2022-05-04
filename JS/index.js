

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
        Swal.fire({
            toast: true,
            icon: 'warning',
            iconColor: '#414141',
            title: 'Completa los datos del ambiente remodelar ;)',
            showConfirmButton: false,
            timer: 2000
        })
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

// AGREGAR MULTIPLES ARCHIVOS(FOTOS) PARA ENVIAR-----------------
btnFotos.addEventListener('change', () => {
    mostrarFotos()
})

// GUARDA VALORES DE COLORES SELECCIONADOS EN UN ARRAY--------------------
colorPrim.addEventListener('change', () => {
    cargarColores()
})
colorSec.addEventListener('change', () => {
    cargarColores()
})
colorNeutro.addEventListener('change', () => {
    cargarColores()
})

// GUARDA EL ESTADO DEL PLAN ELEGIDO-------------------------------
chkPersonalizado.addEventListener('change', () => {
    verificaPlan()
})
chkPremium.addEventListener('change', () => {
    verificaPlan()
})
let paso = 0

inCelular.addEventListener('blur', () => {
    if (inNombre.value === '' || inEmail.value === '' || inCelular.value === '') {
        const Toast = Swal.mixin({
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'warning',
            title: 'Error en los datos de contacto, proba de nuevo!'
        })
        inNombre.focus()
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

