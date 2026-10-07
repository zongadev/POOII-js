
const Movimiento = function(fecha,monto,saldoactual){
  this.fecha = fecha
  this.monto = monto
  this.saldoactual = saldoactual; 

  this.formatear = function(){
    return `${this.fecha} || ${this.monto} || ${saldoactual}`
  }

  this.obtenerMonto = function(){
    return this.saldoactual
  }
}


const Account=function(){
    this.movimietos = []
  

    this.fechaHoy = function(){
      const today = new Date 
      return today.toISOString().split('T')[0]
    }

    this.obtenerSaldo = function(){
      try{
        return this.movimietos.at(-1).obtenerMonto()
      }
      catch(error){
        return 0
      }
    }

     this.deposit = function(monto){
      this.movimietos.push(new Movimiento(this.fechaHoy(),monto, this.obtenerSaldo()+monto))
    }

    this.withdraw = function(monto){
      if(this.obtenerSaldo()-monto >= 0){
        this.movimietos.push(new Movimiento(this.fechaHoy(),-monto, this.obtenerSaldo()-monto))
      }else{
        throw new Error("No hay dinero en la cuenta")
      }
    }

    this.printStatement=function(){
      statement= ['Date || Amount || Balance']
      this.movimietos.forEach(movimiento => {
        statement.push(movimiento.formatear())
      })
      return statement
    }

}

module.exports = Account;