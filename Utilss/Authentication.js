import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import StackScreen from './StackScreen';
import auth from '@react-native-firebase/auth'

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    const handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                setAuthenticated(true);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Alert.alert('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    Alert.alert('That email address is invalid!');
                }

                console.error(error);
            });
    };

    const handleVerifyUser = () => {

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                Alert.alert('User logged in');
                setAuthenticated(true);
            })
            .catch(error => {
                
                Alert.alert('Invalid Credentials')
                console.error(error);
            });
    };

    if (authenticated) {
        return <StackScreen />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View>
                <Button title="Sign Up" onPress={handleSignUp} />
            </View>
            <View style={{marginTop:20}}>
                <Button title="Verify User" onPress={handleVerifyUser} />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default SignUpScreen;
