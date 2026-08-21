class Guerrero {
    #salud
    #arma
    constructor(nombre, salud, arma){
        this.nombre = nombre;
        this.#salud = salud;
        this.#arma = arma;
    }

    atacar(objGuerrero){
        objGuerrero.recibirDano(this.#arma.obtenerATK());
    }

    recibirDano(dano){
        danoRecibido = dano - this.#arma.proteger();
        this.#salud -= danoRecibido
        console.log("Se recibio: ", danoRecibido);
    }
}

class Arma{
    #dano
    #resistencia
    constructor(dano,resistencia){
        this.#dano = dano;
        this.#resistencia = resistencia;
    }
    
    obtenerATK(){
        return this.#dano;
    }


    proteger(){
        return this.#resistencia;
    }
}