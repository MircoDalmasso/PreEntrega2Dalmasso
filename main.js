
// arreglo de productos
const productos = [
    {id: 1, nombre: "mouse", precio: 8000, cantidad: 2, disponible: true}, 
    {id: 2,nombre: "teclado", precio: 13000, cantidad: 2, disponible: true},
    {id: 3,nombre: "auriculares", precio: 1000, cantidad: 2, disponible: true},
    {id: 4,nombre: "alfombrilla", precio: 5000, cantidad: 2, disponible: true},
    {id: 5,nombre: "webcam", precio: 9000, cantidad: 2, disponible: true}
]

function restarUnoAlProducto(nombre) {
    const productoEncontrado = productos.find(producto => producto.nombre === nombre);

    if(productoEncontrado){
        productoEncontrado.cantidad -= 1;
        productoEncontrado.cantidad = Math.max(0, productoEncontrado.cantidad);
    }
}

class Producto{
    constructor(nombre, precio, cantidad) {
        this.id = (productos.length) + 1;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad; 
        this.disponible = true;
    }
}

function verStock(){
    alert("EL STOCK DISPONIBLE ES EL SIGUIENTE")
    productos.forEach(item => {
    alert(`
    id: ${item.id}
    nombre: ${item.nombre}
    precio: ${item.precio}
    cantidad: ${item.cantidad}
    disponible: ${item.disponible}`)
    })
}

function buscarProducto(nombre) {
    return productos.find((item) => item.nombre === nombre);
}

function filtrarProductosPorPrecio() {
    const precioMaximo = Number(prompt("Ingrese un precio y se mostrara los productos q sean menor al precio ingresado"));
    const filtrados = productos.filter((item) => item.precio <= precioMaximo);

    filtrados.forEach(item => {
        alert(`
        id: ${item.id}
        nombre: ${item.nombre}
        precio: ${item.precio}
        cantidad: ${item.cantidad}
        disponible: ${item.disponible}`)
    });

}

function agregarProductos() {
    do {
        const deseaIngresar = prompt("Si desea agregar un producto escriba 'si', de lo contrario 'fin'").toLowerCase();
        if (deseaIngresar === 'fin') {
            break; 
        } else {
            const nombreProducto = prompt("Ingresa el nombre del producto ");
            const precioProducto = prompt("Ingresa el precio del producto");
            const cantidadProducto = prompt("Ingresa la cantidad del producto");

            const productoCreado = new Producto(nombreProducto, precioProducto, cantidadProducto);
            productos.push(productoCreado);
            alert(`PRODUCTO AGREGADO
            id: ${(productos.length) + 1}
            Nombre: ${nombreProducto}
            Precio: ${precioProducto}
            Cantidad: ${cantidadProducto}`);
        }
    } while (true);
}

function actualizarPrecio() {
    const nombre = prompt("ingrese el nombre del producto a actualizar su precio");
    const producto = productos.find((item) => item.nombre === nombre);

    if(producto){
        let nuevoPrecio = prompt(`Ingrese el nuevo precio a: '${producto.nombre}'`)
        producto["precio"] = nuevoPrecio;

        alert(`
        SE ACTUALIZO EL PRECIO CORRECTAMENTE
            id: ${producto.id}
            Nombre: ${producto.nombre}
            Precio: ${producto.precio}
            Cantidad: ${producto.cantidad}
        `);
        } else {
        alert("Porducto no encontrado");
        }
} 

function verificaExistencia(nombre) {
    nombre = nombre.toLowerCase();
    const verificarExistencia = productos.some(item => item.nombre.toLowerCase() === nombre);
    return verificarExistencia;
}

function eliminarProducto(nombre) {
    productos = productos.filter(producto => producto.nombre !== nombre);
    alert(`El producto ${nombre} fue eliminado`);
}

function restarUnoAlProducto(nombre) {
    let productoEncontrado = productos.find(producto => producto.nombre === nombre);

    if(productoEncontrado){
        productoEncontrado.cantidad -= 1;
        productoEncontrado.cantidad = Math.max(0, productoEncontrado.cantidad);
        alert("Has comprado el producto")

        //Elimina el producto cuando la cantidad llega a 0
        if (productoEncontrado.cantidad === 0) {
            eliminarProducto(nombre);
        }
    }else{
        alert("No hay stock del producto")
    }
}

function calculoDePago(pago, precioProducto) {
    const exitoso = pago >= precioProducto;
    if(exitoso){
        let calculo = pago - precioProducto;
        alert(`Su vuelto es ${calculo}`);
        alert("Pago finalizado.");
    }else{
        alert("Ocurrio un error.");
    }

    return exitoso;
}

alert("Bienvenidos a TecnoGamer");
const ingreso = prompt("ingresa como cliente o empleado?").toLowerCase();

if(ingreso === "empleado") {
    let tareaElijida = prompt(`ELIJA UNA TAREA:
    -ver stock
    -agregar productos
    -actualizar precios`)

    //tareas a elegir
    if(tareaElijida === "ver stock"){
        verStock();
    }else if(tareaElijida === "agregar productos"){
        agregarProductos();
    }else if(tareaElijida === "actualizar precios"){
        actualizarPrecio();
    }else{alert("Ocurrio un error")}

}else{
    alert("Se encuentra en la tienda.")
    const accionElegida = prompt(`Que le gustaria hacer
    -comprar producto
    -buscar producto
    -filtrar productos
    -SORTEO`).toLowerCase()

    if(accionElegida === "comprar producto"){
        // pasos para comprar el producto
        const nombreProducto = prompt("ingrese el nombre del producto a comprar");
        const productoEncontrado = buscarProducto(nombreProducto);
        if (productoEncontrado){
            alert(`
            id: ${productoEncontrado.id}
            Nombre: ${productoEncontrado.nombre}
            Precio: ${productoEncontrado.precio}
            Cantidad: ${productoEncontrado.cantidad}
            `);
            } else {
            alert("Porducto no disponible");
            }
        const precioProducto = productoEncontrado.precio;
        const cuantoPaga = Number(prompt("Con cuanto desea pagar?"));
        //verifica q el pago fue exitoso
        const pagoRealizado = calculoDePago(cuantoPaga, precioProducto);

        // resto uno luego de q el pago fue finalizado y exitoso.
        if(pagoRealizado){
        restarUnoAlProducto(nombreProducto);
        }
    }else if(accionElegida === "buscar producto"){
        const nombreProducto = prompt("ingrese el nombre del producto a comprar");
        const productoEncontrado = buscarProducto(nombreProducto);

        if(productoEncontrado){
            alert(`
            id: ${productoEncontrado.id}
            Nombre: ${productoEncontrado.nombre}
            Precio: ${productoEncontrado.precio}
            Cantidad: ${productoEncontrado.cantidad}
            `);
            } else {
            alert("Porducto no disponible");
            }
    }else if(accionElegida === "filtrar productos"){
        alert("Estas en filtrado de productos por su precio");
        filtrarProductosPorPrecio();
    }else if(accionElegida === "sorteo"){
        const numeroIngresado = Number(prompt("Ingrese un numero del 1 al 10"));
        const numeroAleatorio = (amplitud, desplazamiento) => {
            return Math.round(Math.random() * amplitud + desplazamiento)
        }
        const numeroGeneradoAlet = numeroAleatorio(11, 0); 
        alert(`Ah salido el numero: ${numeroGeneradoAlet}`)
        if(numeroGeneradoAlet === numeroIngresado) {
            alert("Felicitaciones has ganado una PC GAMER")
            }else{
                alert("Has perdido")
            }
    }else{
        alert("Ocurrio un error");
    }
}


