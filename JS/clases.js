class Ambiente {
    constructor(indice, nombre, ancho, largo) {
        this.id = indice
        this.nombre = nombre
        this.ancho = Number((parseFloat(ancho)).toFixed(2))
        this.largo = Number((parseFloat(largo)).toFixed(2))
        this.superficie = Number((this.ancho * this.largo).toFixed(2))
    }
}
class Fotos {
    constructor(id, nombre) {
        this.id = id
        this.nombre = nombre
    }
}
class Colores {
    constructor(primario, secundario, neutro) {
        this.primario = primario
        this.secundario = secundario
        this.neutro = neutro
    }
}
class Cliente {
    constructor(nombre, email, celular) {
        this.nombre = nombre.toUpperCase()
        this.email = email
        this.celular = celular
    }
}

class PlanPago {
    constructor(nombre, precioCdo, cuotas) {
        this.nombre = nombre
        this.precioContado = precioCdo
        this.cuotass = cuotas
    }
}
class Reporte {
    constructor(descripcion, ambiente, fotos, estilo, colores, arq, plan, tarjeta, cliente) {
        this.descripcion = descripcion
        this.ambiente = ambiente
        this.fotos = fotos
        this.estilo = estilo
        this.colores = colores
        this.arq = arq
        this.plan = plan
        this.tarjeta = tarjeta
        this.cliente = cliente
        this.fecha = new Date()
    }
}

// VARIABLES---------------------------------------------
const listaAmbientes = [
    { id: 01, ambiente: 'Cocina' }, { id: 02, ambiente: 'Baño' },
    { id: 03, ambiente: 'Comedor' }, { id: 04, ambiente: 'Estar' },
    { id: 05, ambiente: 'Dormitorio' }, { id: 06, ambiente: 'Quincho' }, { id: 07, ambiente: 'Cochera' }, { id: 08, ambiente: 'Otro' }
]
const listaEstilos = [
    { id: 01, estilo: 'Clasico' }, { id: 02, estilo: 'Vintage' }, { id: 03, estilo: 'Green' }, { id: 04, estilo: 'Rústico' }, { id: 05, estilo: 'Moderno' }]

const listaArquis = [
    { id: 01, nombre: 'Carlos B.', bio: 'Arquitecto de la UNLP, con 15 años de experiencia en la empresa, siendo su gran fuerte,instalaciónes y estructuras' }, { id: 02, nombre: 'Carla P.', bio: 'Arquitecta de grandes habilidades en visualización y artistica, especialista en grandes interiores comerciales' }, { id: 03, nombre: 'Marcos H.', bio: 'Estudiante de arquitectura, entusiasta, de altísimo nivel de representación y montaje. Ideal para ambientes de escala residencial.' }, { id: 04, nombre: 'Martina L.', bio: 'Martina, es el alma tecnológica del grupo, al tanto de todos los avances y actualizaciones sustentables en arquitectura.' }]

const listaTarjetas = [{ id: 01, path: '../multimedia/img/mercadpagorecurso_color.png', alt: 'Logo Mercado pago', nombre: 'Mercado Pago' }, { id: 02, path: '../multimedia/img/Uala-logo color.png', alt: 'Logo Tarjeta Uala', nombre: 'Uala' }, { id: 03, path: '../multimedia/img/Visa logo color.png', alt: 'Logo Tarjeta Visa', nombre: 'Visa' }, { id: 04, path: '../multimedia/img/Master logo color.png', alt: 'Logo Tarjeta Mastercard', nombre: 'Master Card' }, { id: 05, path: '../multimedia/img/Red link logo color.png', alt: 'Logo Tarjeta Link', nombre: 'Link' }, { id: 06, path: '../multimedia/img/Banelco logo color.png', alt: 'Logo Tarjeta Banelco', nombre: 'Banelco' }]

const listaPagos = [{ id: 01, tipo: 'Personalizado', precio: 30000 }, { id: 02, tipo: 'Premium', precio: 48000 }]

const divRegistroExistente = document.querySelector('#el-registroTop')
const formulario = document.querySelector('#formulario')
const enviarForm = document.querySelector('#enviar')
const txtDescripcion = document.querySelector('#el-txt')
const agregaAmbienteBtn = document.querySelector('#agregarAmb-Btn')
const selectAmbientes = document.querySelector('#ambientes-Select')
const anchoInput = document.querySelector('#ancho-Input')
const largoInput = document.querySelector('#largo-Input')
const divAmbientes = document.querySelector('#div-ambientes')
const divSupTotal = document.querySelector('#div-supTotal')
const btnFotos = document.querySelector('#foto-btn')
const divFotos = document.querySelector('#div-fotos')
const ulEstilos = document.querySelector('#ul-estilos')
const colorPrim = document.querySelector('#el-primario')
const colorSec = document.querySelector('#el-secundario')
const colorNeutro = document.querySelector('#el-neutro')
const articlePersonalizado = document.querySelector('.personalizado')
const articlePremium = document.querySelector('.premium')
const chkPersonalizado = document.querySelector('#chk-personalizado')
const chkPremium = document.querySelector('#chk-premium')
const divPagos = document.querySelector('.pagos')
const divPersonas = document.querySelector('.personas')
const sectionContactar = document.querySelector('.contactar')
const inNombre = document.querySelector('#in-nombre')
const inEmail = document.querySelector('#in-email')
const inCelular = document.querySelector('#in-celular')
const enviarBtn = document.querySelector('#enviar-btn')
const borrarBtn = document.querySelector('#borrar-btn')
const formularioPagina = document.querySelector('#formulario')
const ulReporte = document.querySelector('#ul-reporte')
const divBtn = document.querySelector('#contiene-btn')
const divContenedor = document.querySelector('.contenedor')
const chksEstilos = document.querySelectorAll('input')
// VARIABLES QUE GUARDAN VALORES PARA REGISTRO FINAL
// const nombreToast = ''
let descripcionAgregada = ''
let listaAmbientesAgreados = []
let listaFotosAgregadas = []
let estiloSelecc = []
let listaColoresElegidos = ''
let arqElegido = ''
let planElegido = []
let listaPlanCuotas = []
let tarjetaElegida = ''
let cliente = []
let nombreCliente = ''
let cuotas = 1
let mostrarReporte = ''
let bajaDelLocalStorage = []
let repoActualizado = []