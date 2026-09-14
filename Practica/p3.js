Sube = function(){
    this.id = Sube.IDGENERAL++;
    this.saldo = 0
}

Sube.prototype.cargarSaldo = function (saldoAcreditado){
    this.saldo += saldoAcreditado
}

Sube.prototype.consultarSaldo = function(){
    console.log("El saldo es de ", this.saldo)
}

Sube.prototype.puedePagar = function (precioDeViaje){
    saldoFinal =this.saldo - precioDeViaje
    if(saldoFinal>= sube.SALDO_MINIMO){
        this.saldo=saldoFinal;
        return True;
    }   
    return false;
}

Sube.prototype.pagarViaje = function(divisa,precioViaje){
    costoEnPesos = divisa.desdeBase(precioViaje)
    alcanzaLaPlata = this.puedePagar(costoEnPesos)
    alcanzaLaPlata && (this.saldo -= costoEnPesos)
    return alcanzaLaPlata
}

Sube.prototype.compararIDs = function(idRecarga){
    return idRecarga === this.id
}

Sube.IDGENERAL = 0;
Sube.SALDO_MINIMO = -600;
/*-----------------------------------------*/ 

Moneda = function(codigo,tasa){
    this.codigo = codigo
    this.tasa = tasa
}

Moneda.prototype.aPesos = function(monto){
    return monto /this.tasa;
}

Moneda.prototype.desdeBase = function(montonoenbase){
    return montonoenbase*this.tasa
}
/*-----------------------------------------*/ 

Saldo = function(cantidadDinero,monedaSaldo){
    this.cantidadDinero = cantidadDinero
    this.monedaSaldo = monedaSaldo
}

Saldo.prototype.calcularCambio = function(){
    return this.monedaSaldo.aPesos(this.cantidadDinero);
}

/*-----------------------------------------*/ 
SistemaCentralizado = function(){
    this.recargasPendientes = []
}

Recarga = function(id, monto){
    this.idTarjeta = id
    this.monto = monto
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
SistemaCentralizado.prototype.acreditarSaldo = function(ObjSube){
    this.recargasPendientes.forEach(carga => carga.acreditarSaldo(ObjSube))
    this.cargasHechas = this.recargasPendientes.filter(carga => carga.validarId(ObjSube))
    this.recargasPendientes = this.recargasPendientes.filter(carga => !carga.validarId(ObjSube))
}

SistemaCentralizado.prototype.cargarTarjeta = function(identificadorSube, saldo){
    this.recargasPendientes.push(new Recarga(identificadorSube, saldo.calcularCambio()))
}

SistemaCentralizado.prototype.consultarRecargasPendientes = function(ObjSube){
    let n = 0;
    this.recargasPendientes.forEach(carga => {
        if (carga.idTarjeta == ObjSube.id){
            n++;
        }
    })
    console.log(n)
}

SistemaCentralizado.prototype.montoTotalPendiente = function(ObjSube){
    let tot=0;
    this.recargasPendientes.forEach(carga=> {
        if(carga.idTarjeta == ObjSube.id){
            tot += carga.monto;
        }
    })
}

SistemaCentralizado.prototype.montoTotalAcreditado = function(ObjSube){
    let tot=0;
    this.cargasHechas.forEach(carga=> {
        if(carga.idTarjeta == ObjSube.id){
            tot += carga.monto;
        }
    })
    
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const pregunta = (q) => new Promise((resolve) => rl.question(q, resolve));

// --- (acá van tus clases Sube, Moneda, Saldo, SistemaCentralizado, Recarga ya corregidas) ---

async function main(){
    const MP = new SistemaCentralizado();
    const tarjetas = {}; // guardamos las Sube creadas por nombre, para no perderlas
    const monedas = {
        "ARS": new Moneda("ARS", 1),
        "USD": new Moneda("USD", 1000),
        "BRL": new Moneda("BRL", 200)
    };

    let salir = false;
    while(!salir){
        console.log("\n--- MENU ---");
        console.log("1) Crear tarjeta");
        console.log("2) Cargar saldo a una tarjeta");
        console.log("3) Acreditar saldo pendiente de una tarjeta");
        console.log("4) Consultar saldo de una tarjeta");
        console.log("5) Salir");
        const opcion = await pregunta("Elegí una opción: ");

        if(opcion === "1"){
            const nombre = await pregunta("Nombre para identificar la tarjeta: ");
            tarjetas[nombre] = new Sube();
            console.log(`Tarjeta creada con id ${tarjetas[nombre].id}`);

        } else if(opcion === "2"){
            const nombre = await pregunta("Nombre de la tarjeta: ");
            const monto = Number(await pregunta("Monto: "));
            const codigoMoneda = await pregunta("Moneda (ARS/USD/BRL): ");
            const saldo = new Saldo(monto, monedas[codigoMoneda]);
            MP.cargarTarjeta(tarjetas[nombre].id, saldo);
            console.log("Recarga cargada como pendiente.");

        } else if(opcion === "3"){
            const nombre = await pregunta("Nombre de la tarjeta: ");
            MP.acreditarSaldo(tarjetas[nombre]);
            console.log("Saldo acreditado.");

        } else if(opcion === "4"){
            const nombre = await pregunta("Nombre de la tarjeta: ");
            tarjetas[nombre].consultarSaldo();

        } else if(opcion === "5"){
            salir = true;
        } else {
            console.log("Opción inválida.");
        }
    }
    rl.close();
}

main();