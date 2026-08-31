class Sube{
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
    
}
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




sube.IDGENERAL =0;
sube.SALDO_MINIMO=-600;

sistemaCentralizado = function(){
    this.tarjetasPendientes = []
}

sistemaCentralizado.prototype.cargarTarjeta = function(identificadorSube,saldoCargar){
    this.tarjetasPendientes.push([identificadorSube,saldoCargar])
}

sistemaCentralizado.prototype.acreditarSaldo = function(ObjSube){
    this.tarjetasPendientes.forEach(carga => {
        if(carga[0] == ObjSube.id){
            ObjSube.cargarSaldo(carga[1]);
        }
    });
}

const a = new sube()
const MP = new sistemaCentralizado()
console.log(MP.cargarTarjeta(a.id,500))
console.log(MP.cargarTarjeta(a.id,500))
a.consultarSaldo()
console.log(MP.acreditarSaldo(a))
a.consultarSaldo()
