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

sube.IDGENERAL = 0;
sube.SALDO_MINIMO = -600;

sistemaCentralizado = function(){
    this.recargasPendientes = []
}

Recarga = function(id, monto){
    this.idTarjeta = id
    this.monto = monto
}

sistemaCentralizado.prototype.cargarTarjeta = function(identificadorSube, saldoCargar){
    this.recargasPendientes.push(new Recarga(identificadorSube, saldoCargar))
}

Recarga.prototype.validarId = function(SubeAValidar){
    return SubeAValidar.compararIDs(this.idTarjeta)
}

// NUEVO: cada recarga sabe acreditarse a sí misma
Recarga.prototype.acreditarSaldo = function(ObjSube){
    if (this.validarId(ObjSube)){
        ObjSube.cargarSaldo(this.monto)
    }
}

// MODIFICADO: ya no suma todo con reduce, acredita carga por carga
sistemaCentralizado.prototype.acreditarSaldo = function(ObjSube){
    this.recargasPendientes.forEach(carga => carga.acreditarSaldo(ObjSube))
    this.recargasPendientes = this.recargasPendientes.filter(carga => !carga.validarId(ObjSube))
}

sistemaCentralizado.prototype.consultarRecargasPendientes = function(ObjSube){
    let n = 0;
    this.recargasPendientes.forEach(carga => {
        if (carga.idTarjeta == ObjSube.id){
            n++;
        }
    })
    console.log(n)
}

const a = new sube()
const MP = new sistemaCentralizado()
