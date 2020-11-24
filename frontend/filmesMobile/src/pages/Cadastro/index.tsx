import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

// Navegação
import { useNavigation } from '@react-navigation/native';

// Services
import api from '../../services/api';

// Componentes
import Container from '../../components/Container/index';

// Outras bibliotecas
import { Input } from 'react-native-elements';

function Cadastro() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [permissao, setPermissao] = useState('');

    const cadastrarUsuario = () => {
        const form = {
            nome: nome,
            email: email,
            senha: senha,
            permissao: 'Comum'
        }

        api
            .post('Usuarios', form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(resp => {
                if (resp.status === 201) {
                    alert(`Usuário ${resp.data.nome} cadastrado com sucesso`)
                    login()
                }
                else {
                    alert('Houve um erro no cadastro de usuário')
                }
            })
            .catch(error => console.log(error))
    }

    const login = () => {
        const login = {
            email: email,
            senha: senha
        };

        const init = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        }

        fetch('http://192.168.15.5:5000/api/conta/login', init)
            .then(resp => resp.json())
            .then(data => {
                // Verifica se a propriedade token é diferente de indefinida (se a propriedade existe no retorno do json)
                if (data.token !== undefined) {
                    localStorage.setItem('token-usuario', data.token)
                    setNome('');
                    setEmail('');
                    setSenha('');
                    // Envia (empurra) pra uma página específica
                    navigation.navigate('')
                }
                else {
                    // Erro caso email ou senha sejam inválidos
                    alert(data)
                }
            })
            .catch(erro => console.log(erro))
    }

    return (
        <Container>

            <Input label="Nome" onChangeText={(e: any) => setNome(e)} />
            <Input label="Email" onChangeText={(e: any) => setEmail(e)} />

            <Input label="Senha" secureTextEntry onChangeText={(e: any) => setSenha(e)} />

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={event => {
                        event.preventDefault();
                        cadastrarUsuario();
                    }}
                >
                    <Text style={styles.btnText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

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
    buttonsContainer: {
        alignItems: 'center',
    },
});

export default Cadastro;
