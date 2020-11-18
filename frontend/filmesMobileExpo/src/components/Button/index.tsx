/* eslint-disable prettier/prettier */
import React from 'react';

// Outras bibliotecas
import { View, Button } from 'react-native';

interface LoginProps {
    title: string,
    onPress: any
}

const Login: React.FC<LoginProps> = ({ title, onPress }) => {
    return (
        <View>
            <Button title={title} onPress={onPress} />
        </View>
    );
}

export default Login;
