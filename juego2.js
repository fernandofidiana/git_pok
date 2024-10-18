// Pokemon

const nomp1p1 = document.getElementById('p1_p1')
const vidp1p1 = document.getElementById('p1_p1_vi')
const fotp1p1 = document.getElementById('p1_p1_fo')
const nomp1p2 = document.getElementById('p1_p2')
const vidp1p2 = document.getElementById('p1_p2_vi')
const fotp1p2 = document.getElementById('p1_p2_fo')
const nomp1p3 = document.getElementById('p1_p3')
const vidp1p3 = document.getElementById('p1_p3_vi')
const fotp1p3 = document.getElementById('p1_p3_fo')

const nomp2p1 = document.getElementById('p2_p1')
const vidp2p1 = document.getElementById('p2_p1_vi')
const fotp2p1 = document.getElementById('p2_p1_fo')
const nomp2p2 = document.getElementById('p2_p2')
const vidp2p2 = document.getElementById('p2_p2_vi')
const fotp2p2 = document.getElementById('p2_p2_fo')
const nomp2p3 = document.getElementById('p2_p3')
const vidp2p3 = document.getElementById('p2_p3_vi')
const fotp2p3 = document.getElementById('p2_p3_fo')

const infovs = document.getElementById('info_vs')
const info1 = document.getElementById('info_1')
const info2 = document.getElementById('info_2')

const botluch = document.getElementById('luchar')
const botrein = document.getElementById('reiniciar')
let pokSel1 = 0
let pokSel2 = 0
let turno = 1

const options = {
	method: 'GET',
	headers: {
		apikey:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6dnRmb3lycHJleW1oaG9zcWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NDU4NTMsImV4cCI6MjA0NDEyMTg1M30.HIL5UR_i5cmrUegdU6yZFSHwAOqilOAs8lhCUGSgtxo',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6dnRmb3lycHJleW1oaG9zcWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NDU4NTMsImV4cCI6MjA0NDEyMTg1M30.HIL5UR_i5cmrUegdU6yZFSHwAOqilOAs8lhCUGSgtxo',
	},
}
const player1 = []
const player2 = []
let copiaP1 = {}
let copiaP2 = {}

fetch(
	'https://bzvtfoyrpreymhhosqfz.supabase.co/rest/v1/pokemon?select=*',
	options,
)
	.then(response => response.json())
	.then(data => {
		const dato1 = data.filter(e => e.usuario === 1)
		const dato2 = data.filter(e => e.usuario === 2)
		player1.push(...dato1)
		player2.push(...dato2)
	})
	.then(() => {
		iniciarCopias(player1, player2)
		ponerVs()
		ponerNombres(copiaP1, copiaP2)
		ponerVida(copiaP1, copiaP2)
	})
	.catch(err => console.error(err))

/* const player1 = [
	{
		nombre: 'Pikachu1',
		tipo: 'Eléctrico',
		habilidad: 0,
		fuerza: 50,
		vida: 100,
		defensa: 4,
	},
	{
		nombre: 'Charmander1',
		tipo: 'Fuego',
		habilidad: 1,
		fuerza: 60,
		vida: 90,
		defensa: 2,
	},
	{
		nombre: 'Squirtle1',
		tipo: 'Agua',
		habilidad: 2,
		fuerza: 35,
		vida: 120,
		defensa: 5,
	},
]
*/
function iniciarCopias(p1, p2) {
	copiaP1 = player1.map(e => ({
		...e,
		vidaActual: e.vida,
		fuerzaActual: e.fuerza,
		defensaActual: e.defensa,
		usoHab: true,
	}))
	copiaP2 = player2.map(e => ({
		...e,
		vidaActual: e.vida,
		fuerzaActual: e.fuerza,
		defensaActual: e.defensa,
		usoHab: true,
	}))
}
/* let copiaP1 = player1.map(e => ({
	...e,
	vidaActual: e.vida,
	fuerzaActual: e.fuerza,
	defensaActual: e.defensa,
	usoHab: true,
})) */

/* const player2 = [
	{
		nombre: 'Pikachu2',
		tipo: 'Eléctrico',
		habilidad: 0,
		fuerza: 50,
		vida: 100,
		defensa: 4,
	},
	{
		nombre: 'Charmander2',
		tipo: 'Fuego',
		habilidad: 1,
		fuerza: 60,
		vida: 90,
		defensa: 2,
	},
	{
		nombre: 'Squirtle2',
		tipo: 'Agua',
		habilidad: 2,
		fuerza: 35,
		vida: 120,
		defensa: 5,
	},
]
	*/
/* let copiaP2 = player2.map(e => ({
	...e,
	vidaActual: e.vida,
	fuerzaActual: e.fuerza,
	defensaActual: e.defensa,
	usoHab: true,
})) */

function combate(pok1, pok2, turno, num2) {
	let vida1 = pok1.vidaActual
	let vida2 = pok2.vidaActual

	if (turno === 1) {
		vida2 = atacar(pok1, pok2)
		if (vida2 < 0) vida2 = 0
		copiaP2[num2].vidaActual = vida2
	} else if (turno === 2) {
		vida1 = atacar(pok2, pok1)
		if (vida1 < 0) vida1 = 0
		copiaP1[num2].vidaActual = vida1
	}
	cambioForzado()

	if (vida1 <= 0) console.log('Ha ganado', pok2.nombre)
	else if (vida2 <= 0) console.log('Ha ganado', pok1.nombre)
}
function atacar(pok1, pok2) {
	let dano
	const nombre1 = pok1.nombre
	const nombre2 = pok2.nombre
	let vida = pok2.vidaActual
	dano = Math.ceil(Math.random() * pok1.fuerzaActual)
	if (pok1.tipo === 'Eléctrico' && pok2.tipo === 'Agua') dano *= 2
	if (pok1.tipo === 'Agua' && pok2.tipo === 'Fuego') dano *= 2

	if (dano > 0) vida -= dano

	if (dano > 0)
		ponerInfo1(nombre1 + ' ha hecho ' + dano + ' puntos de daño a ' + nombre2)
	else ponerInfo1(nombre2 + ' lo ha bloqueado')
	if (vida <= 0) {
		ponerInfo2(nombre2 + ' ha caido')
	} else ponerInfo2('A ' + nombre2 + ' le quedan ' + vida + ' puntos de vida')
	return vida
}
function cambioForzado() {
	if (copiaP1[0].vidaActual > 0 && copiaP1[0].vidaActual !== 0) pokSel1 = 0
	else if (copiaP1[1].vidaActual > 0 && copiaP1[1].vidaActual !== 0) pokSel1 = 1
	else if (copiaP1[2].vidaActual > 0 && copiaP1[2].vidaActual !== 0) pokSel1 = 2

	if (copiaP2[0].vidaActual >= 0 && copiaP2[0].vidaActual !== 0) pokSel2 = 0
	else if (copiaP2[1].vidaActual >= 0 && copiaP2[1].vidaActual !== 0)
		pokSel2 = 1
	else if (copiaP2[2].vidaActual >= 0 && copiaP2[2].vidaActual !== 0)
		pokSel2 = 2
	ponerVs()
}

function ponerNombres(p1, p2) {
	nomp1p1.textContent = p1[0].nombre
	nomp1p2.textContent = p1[1].nombre
	nomp1p3.textContent = p1[2].nombre
	nomp2p1.textContent = p2[0].nombre
	nomp2p2.textContent = p2[1].nombre
	nomp2p3.textContent = p2[2].nombre
}
function ponerVida(p1, p2) {
	vidp1p1.textContent = p1[0].vidaActual + '/' + p1[0].vida
	vidp1p2.textContent = p1[1].vidaActual + '/' + p1[1].vida
	vidp1p3.textContent = p1[2].vidaActual + '/' + p1[2].vida
	vidp2p1.textContent = p2[0].vidaActual + '/' + p2[0].vida
	vidp2p2.textContent = p2[1].vidaActual + '/' + p2[1].vida
	vidp2p3.textContent = p2[2].vidaActual + '/' + p2[2].vida
}
function ponerVs() {
	infovs.textContent =
		copiaP1[pokSel1].nombre + ' VS ' + copiaP2[pokSel2].nombre
}
function ponerInfo1(info) {
	info1.textContent = info
}
function ponerInfo2(info) {
	info2.textContent = info
}

botluch.addEventListener('click', function () {
	if (turno === 1) {
		combate(copiaP1[pokSel1], copiaP2[pokSel2], turno, pokSel2)
		ponerVida(copiaP1, copiaP2)
		turno = 2
	} else if (turno === 2) {
		combate(copiaP1[pokSel1], copiaP2[pokSel2], turno, pokSel1)
		ponerVida(copiaP1, copiaP2)
		turno = 1
	}
})

botrein.addEventListener('click', function () {
	copiaP1 = player1.map(e => ({
		...e,
		vidaActual: e.vida,
		fuerzaActual: e.fuerza,
		defensaActual: e.defensa,
		usoHab: true,
	}))
	copiaP2 = player2.map(e => ({
		...e,
		vidaActual: e.vida,
		fuerzaActual: e.fuerza,
		defensaActual: e.defensa,
		usoHab: true,
	}))
	ponerVida(copiaP1, copiaP2)
	ponerVs()
	ponerInfo1('')
	ponerInfo2('')
})
fotp1p1.addEventListener('click', function () {
	if (turno === 1 && copiaP1[0].vidaActual > 0) {
		pokSel1 = 0
		ponerVs()
		ponerInfo1(copiaP1[pokSel1].nombre + ' seleccionado')
		ponerInfo2('')
	}
})
fotp1p2.addEventListener('click', function () {
	if (turno === 1 && copiaP1[1].vidaActual > 0) {
		pokSel1 = 1
		ponerVs()
		ponerInfo1(copiaP1[pokSel1].nombre + ' seleccionado')
		ponerInfo2('')
	}
})
fotp1p3.addEventListener('click', function () {
	if (turno === 1 && copiaP1[2].vidaActual > 0) {
		pokSel1 = 2
		ponerVs()
		ponerInfo1(copiaP1[pokSel1].nombre + ' seleccionado')
		ponerInfo2('')
	}
})
fotp2p1.addEventListener('click', function () {
	if (turno === 2 && copiaP2[0].vidaActual > 0) {
		pokSel2 = 0
		ponerVs()
		ponerInfo1(copiaP2[pokSel2].nombre + ' seleccionado')
		ponerInfo2('')
	}
})
fotp2p2.addEventListener('click', function () {
	if (turno === 2 && copiaP2[1].vidaActual > 0) {
		pokSel2 = 1
		ponerVs()
		ponerInfo1(copiaP2[pokSel2].nombre + ' seleccionado')
		ponerInfo2('')
	}
})
fotp2p3.addEventListener('click', function () {
	if (turno === 2 && copiaP2[2].vidaActual > 0) {
		pokSel2 = 2
		ponerVs()
		ponerInfo1(copiaP2[pokSel2].nombre + ' seleccionado')
		ponerInfo2('')
	}
})
