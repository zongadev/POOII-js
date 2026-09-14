
const Saldo = function(moneda,monto){
    this.moneda = moneda
    this.monto = monto
}
const TarjetaSube= function(){
    this.id=TarjetaSube.contador;
    console.log("ID:"+this.id)
    this.saldo=0;
    TarjetaSube.contador++;

    this.pagarViaje= function(n){ //no nos gusta el condicional ni console.log --> no lo evitamos al 100% en este ejemplo solo por la consigna
        if (this.saldo-n<TarjetaSube.saldo_minimo){
            throw new Error("NO tienes el saldo suficiente");
        }
        this.saldo=this.saldo-n;
        
    }
    this.consultarSaldo= function(){ //el get rompe el encapsulamiento, solo aca porque lo dice en el enunciado
        return this.saldo;
    }
    this.cargarSaldo=function(n){
        this.saldo=this.saldo+n;
        console.log(this.saldo)
    }
    this.verificacion_sube=function(idComparar, monto){
        if(idComparar===this.id){
            this.cargarSaldo(monto)
        }
        return idComparar===this.id
    }
    this.getId=function(){
        return this.id
    }
}


const DatosDeAcreditacion=function(id,monto){
    this.id=id;
    this.monto=monto;
    this.verificacion=function(tarjetaSube){
        return tarjetaSube.verificacion_sube(this.id, this.monto)
    }
}
const SistemaCentralizado=function(){
    this.cargasPendientes=[];
    
    this.cantidadRecargasPenmdientes= function(){
        return this.cargasPendientes.length;
    }
    this.AcreditarSaldo=function(tarjetaSube){
        //const indexAEliminar=this.cargasPendientes.findIndex(element => element.verificacion(tarjetaSube));
        //this.cargasPendientes.splice(indexAEliminar,1)
        //this.cargasPendientes.forEach(element => element.verificacion(tarjetaSube));
        const arrayAux= this.cargasPendientes.filter(element => !element.verificacion(tarjetaSube))
        this.cargasPendientes= [...arrayAux]
        
    }
    this.cargarTarjeta=function(id, monto) {
        this.cargasPendientes.push(new DatosDeAcreditacion(id,monto));
    }

}

function main(){
    const sistema = new SistemaCentralizado()
    const tarjetaDeMatu = new TarjetaSube()
    const tarjetaDeRochi = new TarjetaSube()

    sistema.cargarTarjeta(tarjetaDeMatu.getId(),1000)
    sistema.cargarTarjeta(tarjetaDeMatu.getId(),500)
    sistema.cargarTarjeta(tarjetaDeRochi.getId(),8000)
    console.log(sistema.cantidadRecargasPenmdientes())
    sistema.AcreditarSaldo(tarjetaDeMatu)
    console.log(sistema.cantidadRecargasPenmdientes())
    console.log("Saldo de matu: "+ tarjetaDeMatu.consultarSaldo())
    sistema.AcreditarSaldo(tarjetaDeRochi)
    console.log("Saldo de rochi: "+ tarjetaDeRochi.consultarSaldo())
}
TarjetaSube.contador = 0;
TarjetaSube.saldo_minimo = -600;
main()