const Posicion = require('./Posicion.js')

const MarsRover = function(){
    this.posicion = new Posicion(0,0)

    this.obtenerPosicion = function(){
        return this.posicion.obtenerCoordeandas()
    }

    this.comprobarSecuencia = function(sentencia){
        if(sentencia.length>10){
            throw new Error("Mas de 10 instrucciones")
        }

    }

    this.transformarComando = function(instruccion){
        switch(instruccion){
            case "W": return {Comando: "W", accion: (posicion) => posicion.aumentarY()}
            case "A": return {Comando: "A", accion: (posicion) => posicion.disminuirX()}
            case "S": return {Comando: "S", accion: (posicion) => posicion.disminuirY()}
            case "D": return {Comando: "D", accion: (posicion) => posicion.aumentarX()}
        }
    }

    this.interpretarSentencia = function (sentencia){
        sentenciaInterpretada = []
        sentencia.forEach(comando => {
            sentenciaInterpretada.push(this.transformarComando(comando))
        });
        return sentenciaInterpretada
    }

    this.comprobarLimite= function (posicionSimulada){
        
    }

    /*
        SOLAMENTE FALTA COMPROBAR QUE NO SE VAYAN POR LOS LIMITES
    */

    this.simularMovimiento = function(sentenciaInterpretada){
        posicionSimulada = new Posicion(this.posicion.x,this.posicion.y)
        sentenciaInterpretada.forEach(comando => {
            comando.accion(posicionSimulada)
            comprobarLimite(posicionSimulada)
        })
    }

    this.ejecutarComando = function([...sentencia]){
        this.comprobarSecuencia(sentencia)
        
        sentenciaInterpretada = this.interpretarSentencia(sentencia)

        sentenciaInterpretada.forEach(comando => {
            comando.accion(this.posicion)
        });
    }
}


module.exports = MarsRover