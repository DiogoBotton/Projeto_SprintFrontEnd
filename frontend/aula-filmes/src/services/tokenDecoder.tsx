import React from 'react';

function parseJwt(){
    var token = localStorage.getItem('token-usuario');
    
    // O TypeScript necessita que haja uma verificação caso token seja nulo
    if(token == null) return null

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    return JSON.parse(window.atob(base64));
}

// interface tokenProp {
//     token: string;
// }

// const parseJwt2:React.FC<tokenProp> = ({token}) => {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// };

export default parseJwt;