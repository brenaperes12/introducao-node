// function soma () {
    // let resultado = 40+5;
    // return resultado;
// }
// 
// console.log (soma());

// function somar(a, b) {
    // return a+b;
// }
// 
// console.log(ProcessingInstruction.argv[2]);
// 
// console.log(somar(Number(process.argv[2]), Number(process.argv[3])));

// function nota(nota1, nota2, nota3, nota4, nota5) {
    // let media = (nota1 + nota2 + nota3 + nota4 + nota5) / 5;
// 
    // console.log("Média: " + media);
// 
    // if (media >= 7) {
        // console.log("Aprovado!");
    // } else {
        // console.log("Reprovado!");
    // }
// }
// 
// nota(
    // Number(process.argv[2]),
    // Number(process.argv[3]),
    // Number(process.argv[4]),
    // Number(process.argv[5]),
    // Number(process.argv[6])
// );

function calcularMedia(a,b,c,d,e) {
    let media = (a+b+c+d+e)/5
    return media
}

function aprovado(media) {
if(media >= 7) {
    return "Aprovado!"
} else {
    if(media < 6){
        return "Reprovado"
    }
    else return "De Recuperação!"
    }
}

media = calcularMedia(
    Number(process.argv[2]),
    Number(process.argv[3]),
    Number(process.argv[4]),
    Number(process.argv[5]),
    Number(process.argv[6])
);

console.log("Sua média foi:"+media+" e você está "+aprovado(media))
