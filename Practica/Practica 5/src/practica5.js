Planeta = function(ancho,alto){
    if (Planeta.instance){
        return Planeta.instance
    }
    Planeta.instance = this;
    this.ancho = ancho;
    this.alto = alto;
}







const norte = {handle: (posicion) => posicion.moverNorte() , girarIzquierda: oeste , girarDerecha:este, darVuelta: sur  }
const este = {handle: (posicion) => posicion.moverEste(), girarIzquierda: norte, girarDerecha: sur , darVuelta:oeste }
const oeste = {handle: (posicion) => posicion.moverOeste(), girarIzquierda: sur , girarDerecha:norte, darVuelta: este  }
const sur = {handle: (posicion) => posicion.moverSur(), girarIzquierda: este , girarDerecha:oeste, darVuelta: norte  }

Posicion = function(x,y){
    this.x =x;
    this.y =y;
    
    this.moverNorte = function(){
        this.y +=1;
    }
    this.moverSur = function(){
        this.y -=1;
    }
    this.moverOeste= function(){
        this.x +=1;
    }
    this.moverEste = function(){
        this.x -=1;
    }
}



function factory(orden){
    switch (orden){
        case 'W': return {ejecutar: (rover) => rover.avanzar()}
        case 'A': return {ejecutar: (rover) => {rover.girarIzquierda(); rover.avanzar()}}
        case 'S': return {ejecutar: (rover) => {rover.darVuelta(); rover.handle()}}
        case 'D': return {ejecutar: (rover) => {rover.girarDerecha(); rover.handle()}}

    }
}

Rover = function(){
    this.posicion = new Posicion(50,50)
    this.sentido = norte;

    this.introducirSecuencias = function(string){
        
        string.forEach(char => {
            string && secuencia.push(char)
        });
    }
    
    this.recibirSecuencia = function(secuenciaMovimientos){
        secuenciaMovimientos.forEach(element => {
            this.ejecutarMovimiento(element);
        });
    }

    this.ejecutarMovimiento = function(movimiento){
        movimiento.ejecutar();
    }  

    this.avanzar = function(){
        this.sentido.handle(this.posicion);
    }

    this.girarDerecha = function(){
        this.sentido = this.sentido.girarDerecha
    }
    this.girarIzquierda = function(){
        this.sentido = this.sentido.girarIzquierda
    }
}