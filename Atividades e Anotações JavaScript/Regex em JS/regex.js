var str = '422.991.068-12';

function formatter(string) {
    // Remove todas as ocorrências de . (ponto), - (hífen) e / (barra)

    /* 
    
    Entenda o Regex: para remover todas as ocorrências de determinados caracteres, usamos o "g" no final
    dentro do método "replace", digite: 

    /\[caracter]/g,
    
    Onde está escrito "[caracter]", você devera substituir pelo caracter que deseja remover

    */

    let newStr = string.replace(/\./g, '').replace(/\-/g, '').replace(/\//g, '');

    return newStr;
}

let stringFormatada = formatter(str);

console.log(stringFormatada);