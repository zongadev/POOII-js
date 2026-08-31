//Uno
const cuadrado = x => x * x;
console.log(cuadrado(3));
//Dos
function creaResta(x){
    return function(y){
        return y-x
    };
}

/*var creaResta = (x) => {return y => {return x-y}}*/

console.log(creaResta(3)(2))

resta = creaResta(3)//n

resta(2)//m

//Lo de arriba lo hace por partes

//Tres

function printString(i){
    console.log("hola",i)
};

var printString = n => console.log("Ejecucion numero: ",n)


const repeat = (funToRepeat, n) =>
    n > 0 && (repeat(funToRepeat, n - 1), funToRepeat(n));
    //el n>0 la condicion. La segunda parte detras de la coma es un comando que se ejecuta seguido del otro.
    // como el comando anterior llama a funrepeat, basicamente estas haciendo recursividad, cuando es n>0, termina y vuelve
    // al punto donde corto.
repeat(printString,5)

//Cuatro

const pilotos = ["Verstappen", "Hamilton", "Russell", "Sainz", "Perez", "Leclerc", "Norris",
"Alonso", "Ocon", "Vettel"];

const isRussell = (element) => element == "Russell";

console.log(pilotos.findIndex(isRussell))

console.log(pilotos.at(5))

const containA = element => element.includes("a") || element.includes("A") 

console.log(pilotos.filter(containA))


arr2 = ["Russell", "Bottas","Perez"]

const checkea = x => pilotos.includes(x)

arr3 = arr2.map(checkea) 
console.log(arr3)

pilotos.splice(1,1)
perez = pilotos.splice(4,1)
pilotos.splice(1,0,perez[0])
console.log(pilotos)



