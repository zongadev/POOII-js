
const Posicion = function(x,y){
    this.x = x;
    this.y = y;

    this.obtenerCoordeandas = function(){
        return [this.x,this.y]
    }

    this.obtenerX = function(){
        return this.x
    }

    this.obtenerY = function(){
            return this.y
        }
    this.aumentarY = function(){
        this.y +=1;
    }

    this.aumentarX = function(){
        this.x +=1;
    }
    this.disminuirY = function(){
        this.y -=1;
    }

    this.disminuirX = function(){
        this.x -=1;
    }
    
}

module.exports = Posicion