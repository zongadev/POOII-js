//si tiene este tipo, entonces fechaFranco es un numero
const diaPartiuclarAnio = {ejecutar : (fechaFranco, fechaAVerificar) =>  (fechaAVerificar.getDate() == fechaFranco.getDate())} 

const mismoDiaMesAnio =  {ejecutar : (fechaFrancoEmpleado, fechaAVerificar) => {
    return fechaAVerificar.getDate() == fechaFrancoEmpleado.getDate() && fechaAVerificar.getMonth() == fechaFrancoEmpleado.getMonth()
    } 
}

const diaSemana = {ejecutar : (fechaFranco, fechaAVerificar) => (fechaFranco.getDay() == fechaAVerificar.getDate()  )}
const diaSemana_AnioParticular= {ejecutar : (fechaFranco, fechaAVerificar) => (fechaFranco.getFullYear() == fechaAVerificar.getFullYear()) && (fechaAVerificar.getDay() == fechaFranco.getDay())}
const diaMes_AnioParticular = {ejecutar : (fechaFranco, fechaAVerificar) => fechaAVerificar.getDay() == fechaFranco.getDay() && fechaAVerificar.getFullYear() == fechaFranco.getFullYear()}
const mes_AnioParticular = {ejecutar : (fechaFranco, fechaAVerificar) => (fechaFranco.getMonth() == fechaAVerificar.getMonth()) && (fechaFranco.getFullYear() == fechaAVerificar.getFullYear()) }



Empleado = function(nombre){
    this.nombre= nombre 
    let francos = []
    this.agregarFranco = function(franco){
        this.franco = franco
    }

    this.establecerEstrategia = function(estrategia){
        this.estrategia = estrategia
    }

    this.calcularFranco = function(fechaAVerificar){
        return this.estrategia.ejecutar(this.fechaFranco, fechaAVerificar)
    }

    this.agregarFranco = function(franco){
        francos.push(franco)
    }

    this.esFranco = function(fecha){
        francos.some(f => f.esFranco(fecha))
    }
}

function crearFranco(dato, estrategia) {
    return {esFranco: (fechaAVerificar) => estrategia.ejecutar(dato, fechaAVerificar)};
}

function crearFrancoPorTipo(tipo, ...parametro) {
    switch (tipo) {
        case 'dia_semana':
            return crearFranco(parametro[0], diaSemana);
        case 'mismo_dia_mes':
            return crearFranco(new Date(parametro[2], parametro[1], parametro[0]), mismoDiaMesAnio);
        default:
            throw new Error("Tipo no válido: " + tipo);
    }
}

function main(){
    const Gonza = new Empleado(Gonza)
    francoGonza = crearFranco('dia_de_anio', 3)

}
