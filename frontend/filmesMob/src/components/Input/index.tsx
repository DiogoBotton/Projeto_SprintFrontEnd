/* eslint-disable prettier/prettier */
import React from 'react';

// Outras bibliotecas
import { View, TextInput } from 'react-native';

interface LoginProps {
    label: string,
    onChangeEvent: any
}

const Login: React.FC<LoginProps> = ({ label, onChangeEvent }) => {
    return (
        <View>
            <TextInput placeholder={label} onChangeText={onChangeEvent} />
        </View>
    );
}

export default Login;
