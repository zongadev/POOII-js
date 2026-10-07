const MarsRover = require('../src/MarsRover.js')
const Posicion = require('../src/Posicion.js')
// caso listas :const posicion = (x, y) => [x, y] 
//esto es el formato, te permite aislar los test, en un principio estaba usando listas
//entonces posicion toma x e y y los toma como listas, ahora que quiero pasar a objetos 
//simplemente cambio lo que devuelve la funcion flecha.
    const posicion = (x,y) => [x,y]

test("posicion inicial igual a 0 0 del rover", ()=> {
    //setup, establece las condiciones que queremos probar, el escenario
    //exercise,  se testea el codigo esperado
    // asert, se comparan los resultado obtenidos con los esperados

    const rover = new MarsRover()
    expect(rover.obtenerPosicion()).toEqual(posicion(0,0))
})

test("Comando W avanza el rover en una posicion", () =>{
    const rover = new MarsRover()
    rover.ejecutarComando("W")
    expect(rover.obtenerPosicion()).toEqual(posicion(0,1))
})

test("Dos comando W avanza el rover en dos posiciones en Y", () =>{
    const rover = new MarsRover()
    rover.ejecutarComando("W")
    rover.ejecutarComando("W")
    expect(rover.obtenerPosicion()).toEqual(posicion(0,2))
})

test("El comando A lo desplaza -1 en X", ()=> {
    const rover = new MarsRover()
    rover.ejecutarComando("A")

    expect(rover.obtenerPosicion()).toEqual(posicion(-1,0))
})

test("El comando S lo desplaza -1 en Y", ()=> {
    const rover = new MarsRover()
    rover.ejecutarComando("S")

    expect(rover.obtenerPosicion()).toEqual(posicion(0,-1))
})

test("El comando D lo desplaza 1 en X", ()=> {
    const rover = new MarsRover()
    rover.ejecutarComando("D")


    expect(rover.obtenerPosicion()).toEqual(posicion(1,0))
})

test("El rover recibe cadena de instrucciones", ()=>{
    const rover = new MarsRover()
    rover.ejecutarComando("WAASS")
    expect(rover.obtenerPosicion()).toEqual(posicion(-2,-1))

})

test("El rove solo recibe hasta 10 instrucciones por cadena", ()=>{
    const rover = new MarsRover()
    expect(() => {rover.ejecutarComando("WWWWWWWWWWWWWWWWWWWWW")}).toThrow("Mas de 10 instrucciones")
})

test("El rover no se mueve si moverlo lo saca del mapa", () => {
    const rover = new MarsRover()
    rover.posicion.y=50
    
    expect(() => rover.ejecutarComando("W")).toThrow("Fuera del mapa")
})