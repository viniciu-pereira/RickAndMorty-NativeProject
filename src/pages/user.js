import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, TouchableWithoutFeedback } from 'react-native';
import { container, input, Button } from './styles';
import { useNavigation } from '@react-navigation/native';

const CreateUser = () => {
    const navigation = useNavigation();
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCPF] = useState('');
    const [email, setEmail] = useState('');
    const [curso, setCurso] = useState(null);
    const [open, setOpen] = useState(false);


    const handlePhone = () => {
        const phoneIsValid = phone.match(/^[0-9]{11}$/);

        if (!phoneIsValid) {
            Alert.alert('Telefone inválido', `${phone} não é um telefone válido`);
            setPhone('');
        }

        setPhone(phone);
    };

    const handleCPF = () => {
        const CPFIsValid = cpf.match(/^[0-9]{11}$/);

        if (!CPFIsValid) {
            Alert.alert('CPF inválido', `${cpf} não é um CPF válido`);
            setCPF('');
        }

        setCPF(cpf);
    };

    const handleEmail = () => {
        const emailIsValid = email.match(/^^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9_.-]+.(com))$/);

        if (!emailIsValid) {
            Alert.alert('E-mail inválido', `${email} não é um e-mail válido`);
            setEmail('');
        }

        setEmail(email);
    };

    return (
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <View style={container}>

                <TextInput
                    style={input}
                    placeholder='Nome'
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={input}
                    placeholder="Telefone"
                    value={phone}
                    keyboardType="phone-pad"
                    onChangeText={(text) => setPhone(text)}
                    onBlur={handlePhone}
                    maxLength={11}
                />
                <TextInput
                    style={input}
                    placeholder="CPF"
                    value={cpf}
                    keyboardType="numeric"
                    onChangeText={(text) => setCPF(text)}
                    onBlur={handleCPF}
                    maxLength={11}
                />
                <TextInput
                    style={input}
                    placeholder='E-mail'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    onBlur={handleEmail}
                />
                <TouchableOpacity
                    style={Button.button}
                    onPress={() => {
                        console.log(
                            `name:${name}`,
                            `phone:${phone}`,
                            `CPF:${cpf}`,
                            `email:${email}`,
                            `curso:${curso}`
                        )
                        navigation.navigate('login', {})
                    }}
                >
                    <Text style={Button.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </View >
        </TouchableWithoutFeedback>
    );
};

export default CreateUser;
