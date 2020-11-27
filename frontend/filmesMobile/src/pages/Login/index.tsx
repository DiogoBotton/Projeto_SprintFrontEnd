import React, { useContext, useState } from 'react';

// Outras bibliotecas
import { Text, View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Input } from 'react-native-elements';

// Context
import AuthContext from '../../context/auth'; 

// Componentes
import Container from '../../components/Container/index';

// Interfaces
import LoginProps from '../../interfaces/login';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { SignIn } = useContext(AuthContext);
    
    const login = async () => {
        const form: LoginProps = {
            email: email,
            senha: senha,
        };

        if (form.email.length === 0 || form.senha.length === 0) {
            return Alert.alert('Preencha os campos de email e senha corretamente.');
        }

        // Função do context que irá fazer a autenticação e retornar erro (na própria função) caso precise
        SignIn(form);
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
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={event => {
                        event.preventDefault();
                        login();
                    }}
                >
                    <Text style={styles.btnText}>Login</Text>
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
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 60,
        textAlign: 'center',
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
