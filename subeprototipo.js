const TarjetaSube = function () {
    this.id = TarjetaSube.ID_GENERAL++;
    this.saldo = 0;

    this.obtenerSaldo = function(){
        return this.saldo;
    }

    this.acreditarSaldo = function(montoACargar){
        this.saldo += montoACargar;
    }

    this.pagarViaje = function(precioDeViaje){
        this.validarViaje(precioDeViaje);
        this.saldo -= precioDeViaje;
    }

    this.validarViaje = function(precioDeViaje) {
        if (this.saldo - precioDeViaje >= TarjetaSube.SALDO_MINIMO) {
            throw new Error("Saldo insuficiente.");
        }
    }
}

TarjetaSube.SALDO_MINIMO = -600;
TarjetaSube.ID_GENERAL = 0;
