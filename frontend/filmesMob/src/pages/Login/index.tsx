/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input, Button} from 'react-native-elements';

// Outras bibliotecas
import { Text, View, Alert } from 'react-native';

// Componentes
// import Input from '../../components/Input/index';
// import Button from '../../components/Button/index';

const Login = () => {
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const login = () => {
        const form = {
            email: email,
            senha: senha,
        };

        if (form.email.length === 0 || form.senha.length === 0) {
            Alert.alert('Preencha os campos de email e senha corretamente.');
        }

        const init = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        };

        fetch('http://localhost:5000/api/conta/login', init)
            .then((resp) => resp.json())
            .then((data) => {
                // Verifica se a propriedade token é diferente de indefinida (se a propriedade existe no retorno do json)
                if (data.token !== undefined) {
                    AsyncStorage.setItem('token-usuario', data.token);
                    // Envia (empurra) pra uma página específica
                    history.push('/home');
                } else {
                    // Erro caso email ou senha sejam inválidos
                }
            })
            .catch((erro) => console.log(erro));
    };
    return (
        <View>
            <Input label="Email" onChangeText={(e: any) => setEmail(e)} />

            <Input label="Senha" onChangeText={(e: any) => setEmail(e)} />

            <Button title="Login" onPress={() => {
                login();
            }} />
        </View>
    );
}

export default Login;
