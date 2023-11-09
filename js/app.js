const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarcarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

function cargarEventListenners() {
    //evento cuando agregas un curso presioanndo 'Agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener('click', eliminarCurso);

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHtml();
    })

    btnVaciarcarrito.addEventListener('click', ()=>{
        articulosCarrito = []
        limpiarCarrito();
    })
}
cargarEventListenners();

function agregarCurso(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerCurso(cursoSeleccionado);
    }
}

//leer el contenido del HTML al que dimos click
function leerCurso(curso) {

    // crear un objeto con la info del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id )
    if(existe){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++
                return curso
            }else{
                return curso
            }
        } )
        articulosCarrito = [...cursos]
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    carritoHtml();
}

function carritoHtml() {
    limpiarCarrito();

    articulosCarrito.forEach(art => {
        const { titulo, id, imagen, cantidad ,precio } = art;
        const row = document.createElement('tr')
        row.innerHTML = `

            <td>
                <img src=${imagen} width="100" >
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id}>X</a>
            </td>
        `
        //agregar el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
    sincronizarStorage()
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        console.log(articulosCarrito)
        carritoHtml()
    }
}

function limpiarCarrito() {
    //!forma lenta
    // contenedorCarrito.innerHTML = ''

    //! forma optima
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}