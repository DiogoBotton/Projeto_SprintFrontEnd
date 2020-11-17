/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// Para mandar o usuário para outra página
import { useHistory } from 'react-router-native';

// "LocalStorage" do React Native
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();
import { Input } from 'react-native-elements';

// Outras bibliotecas
import { Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Componentes
import Container from '../../components/Container/index';
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

        fetch('http://localhost:5000/api/Conta/login', init)
            .then(resp => resp.json())
            .then(data => {
                // Verifica se a propriedade token é diferente de indefinida (se a propriedade existe no retorno do json)
                if (data.token !== undefined) {
                    AsyncStorage.setItem('token-usuario', data.token);
                    // Envia (empurra) pra uma página específica
                    Alert.alert('toaq');
                    history.push('/home');
                } else {
                    // Erro caso email ou senha sejam inválidos
                    Alert.alert(data);
                }
            })
            .catch(erro => console.log(erro));
    };
    return (
        <Container>
            <Text style={styles.sectionTitle}>Login</Text>

            <Input label="Email" onChangeText={(e: any) => setEmail(e)} />

            <Input label="Senha" secureTextEntry={true} onChangeText={(e: any) => setSenha(e)} />

            {/*
                TouchableOpacity: Outra espécie de botão clicavel para mobile,
                melhor pois tem mais possibilidades de estilização que o botão
            */}
            <View>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={event => {
                        event.preventDefault();
                        login();
                    }}
                >
                    <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cadastrar}
                    onPress={() => {
                        history.push('/cadastro-usuario');
                    }}
                >
                    <Text style={styles.cadastrarText}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>

            {/* <Button title="Login" style={styles.btnStyle} onPress={() => {
                login();
            }} /> */}
        </Container>
    );
}

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: '#F6511D',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 60,
    },
    cadastrar: {
        marginTop: 10,
        backgroundColor: '#016799',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 15,
        alignItems: 'center',
    },
    cadastrarText: {
        fontSize: 20,
        color: '#fff',
    },
});

export default Login;
