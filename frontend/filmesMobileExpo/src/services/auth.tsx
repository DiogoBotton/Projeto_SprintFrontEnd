// "LocalStorage" do React Native
import AsyncStorage from '@react-native-async-storage/async-storage';
// interface Token {
//     email: string,
//     unique_name: string,
//     jti: number,
//     role: string,
//     iss: string,
//     aud: string
// }

// Tipagem para o retorno da função, diz que irá retornar um 'Token' ou undefined
// function parseJwt(): Token | undefined
function parseJwt() {
    // Função do AsyncStorage necessita do .then pois ele retorna uma promessa (promisse)
    AsyncStorage.getItem('token-usuario')
        .then(token => {
            // O TypeScript necessita que haja uma verificação caso token seja nulo
            if (token === null || token === undefined) return null;

            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        })
        .catch(error => {
            return null
        })
}

export default parseJwt;