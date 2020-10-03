const ul = document.getElementById('Filmes');
const url = 'http://localhost:5000/api/Filmes'


function renderFilmes() {
    var myHeaders = new Headers();

    myHeaders.append('Content-Type', 'text/json', 'Access-Control-Allow-Origin');
    fetch(url, {
        method: 'get', //método  http para tipo de acesso //delete //post // put,
        //mode: 'no-cors', // 'cors' by default
        headers: myHeaders
    })
        .then(function (response) {

            response.text()
                .then(function (result) {
                    console.log(response.status)
                    var jsonResposta = JSON.parse(result);
                    console.log(jsonResposta);

                })
        })
        .catch(function (err) {
            console.error(err); //retornar um erro 
        });
}