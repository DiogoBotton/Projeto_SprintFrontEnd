import React, { createContext, useState, useEffect } from 'react';

// AsyncStorage ("localStorage" do react native)
import AsyncStorage from '@react-native-async-storage/async-storage';

// Token Decoder Service
import jwt from '../services/tokenDecoder';

interface AuthContextData {
    logged: boolean,
    IsComum: boolean,
    IsAdmin: boolean,
    token: string | null,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Exportando AuthProvider para se rusado no routes
export const AuthProvider: React.FC = ({ children }: any) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isComum, setIsComum] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        Logged();
    }, []);

    // Função assíncrona para adquirir atributo que esta guardado no "AsyncStorage"
    const Logged = async () => {
        const response = await AsyncStorage.getItem('token-usuario');

        // Muda o estado de 'isLogged' caso usuário esteja ou não autenticado
        if (!response) {
            setIsLogged(false)
            setIsAdmin(false)
            setIsComum(false)
        }
        else {
            setIsLogged(true)
            setToken(response);

            // Token Decoder
            let tokenDecoded = jwt(response);

            // Muda o estado dos tipos de usuario (boolean) dependendo da 'role' do usuário
            tokenDecoded?.role === "Administrador" ? (setIsAdmin(true), setIsComum(false)) : (setIsAdmin(false), setIsComum(true));
            console.log(tokenDecoded)
        }
    }

    return (
        <AuthContext.Provider value={{ logged: isLogged, IsAdmin: isAdmin, IsComum: isComum, token: token}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;