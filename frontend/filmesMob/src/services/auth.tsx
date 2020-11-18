/* eslint-disable prettier/prettier */
// "LocalStorage" do React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

function parseJwt() {
    //var token = AsyncStorage.getItem('token-usuario');
    var token = Object.values(AsyncStorage.getItem('token-usuario'))[0] as string;

    // O TypeScript necessita que haja uma verificação caso token seja nulo
    if (token == null) return null;

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c: any) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export default parseJwt;