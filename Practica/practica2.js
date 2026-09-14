/*class Sube{
    static idGeneral
    #id
    #saldo
    static saldomin = -600

    sube() {
        this.id =idgral
        Sube.idgral+=1
        this.saldo = 600
    }

    cargarSaldo(saldo){
        this.saldo+= saldo
    }

    consultarSaldo(){
        console.log("El saldo es de: ",this.#saldo)
    }

    #comprobarFondoParaPago(precioViaje){
        return precioViaje >= this.saldo
    }

    pagarViaje(precioViaje){
        const puedePagar = this.comprobarFondoParaPago(precioViaje);
        puedePagar && (this.saldo -= precioViaje);
        return puedePagar;
    }
    
} */
/* Aca armo la sube como prototipo*/

sube = function(){
    this.id = sube.IDGENERAL++;
    this.saldo = 0
}

sube.prototype.cargarSaldo = function (saldoAcreditado){
    this.saldo += saldoAcreditado
}


sube.prototype.consultarSaldo = function(){
    console.log("El saldo es de ", this.saldo)
}

sube.prototype.puedePagar = function (precioDeViaje){
    return this.saldo - precioDeViaje >= sube.SALDO_MINIMO;
}

sube.prototype.pagarViaje = function(costoViaje){
    alcanzaLaPlata = this.puedePagar(costoViaje)
    alcanzaLaPlata && (this.saldo -= costoViaje)
    return alcanzaLaPlata
}

sube.prototype.compararIDs = function(idRecarga){
    return idRecarga === this.id
}



sube.IDGENERAL =0;
sube.SALDO_MINIMO=-600;

sistemaCentralizado = function(){
    this.tarjetasPendientes = []
}

Recarga = function(id,monto){
    this.idTarjeta = id
    this.monto = monto
}

sistemaCentralizado.prototype.cargarTarjeta = function(identificadorSube,saldoCargar){
    this.recargasPendientes.push(new Recarga(identificadorSube,saldoCargar))
}

Recarga.prototype.validarId = function(SubeAValidar){
    return SubeAValidar.compararIDs(this.idTarjeta)
}

sistemaCentralizado.prototype.acreditarSaldo = function(ObjSube){
    const cargasDeLaTarjeta = this.recargasPendientes
        .filter(carga => carga.validarId(ObjSube));
    
    const saldoTOtalcargar = cargasDeLaTarjeta.reduce((total,carga) => total+carga.monto,0)
                                                /*TOTAL ES EL ACUMULADOR
                                                CARGA ES EL ELEMENTO DE LA FUNCION QUE ESTAS LLAMANDO
                                                ES DECIR DE CARGASDELATARJETA  
                                                ESTO LO DEFINE ASI .reduce, cada vuelta devuelve total+carga dentro del nuevo array*/
    ObjSube.cargarSaldo(saldoTOtalcargar)
    this.recargasPendientes = this.recargasPendientes.filter(carga => !carga.validarId(ObjSube))

}

sistemaCentralizado.prototype.consultarRecargasPendientes = function(ObjSube){
    let n=0;
    this.recargasPendientes.forEach(carga => {
        if(carga[0] == ObjSube.id){
            n++;
        }
    })
    console.log(n)
}

const a = new sube()
const MP = new sistemaCentralizado()
console.log(MP.cargarTarjeta(a.id,500))
console.log(MP.cargarTarjeta(a.id,500))
a.consultarSaldo()
console.log(MP.acreditarSaldo(a))
a.consultarSaldo()
