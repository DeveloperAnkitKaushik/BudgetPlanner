import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/utils/Colors';
import { client } from '../../utils/KindeConfig';
import services from '../../utils/Services';
import { useRouter } from 'expo-router';

const Login = () => {
    const route = useRouter();
    const handleSignin = async () => {
        const token = await client.login();
        if(token){
            await services.storeData('login','true');
            route.replace("/");
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.circle1} />
            <View style={styles.circle2} />
            <View style={styles.circle3} />
            <View style={styles.circle4} />
            <View style={styles.content}>
                <Image source={require('../../assets/images/login.png')} style={styles.image} />
                <Text style={styles.welcomeText}>Welcome</Text>
                <TouchableOpacity style={styles.button} onPress={handleSignin}>
                    <Text style={styles.buttonText}>SignIn/LogIn</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    circle1: {
        position: 'absolute',
        backgroundColor: Colors.primary,
        height: 200,
        width: 200,
        borderRadius: 100,
        top: -80,
        left: -80,
    },
    circle2: {
        position: 'absolute',
        backgroundColor: Colors.primary,
        height: 180,
        width: 180,
        borderRadius: 100,
        bottom: 40,
        left: -100,
    },
    circle3: {
        position: 'absolute',
        backgroundColor: Colors.primary,
        height: 180,
        width: 180,
        borderRadius: 100,
        top: -70,
        right: -100,
    },
    circle4: {
        position: 'absolute',
        backgroundColor: Colors.primary,
        height: 150,
        width: 150,
        borderRadius: 100,
        bottom: -50,
        right: -50,
    },
    content: {
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    welcomeText: {
        color: Colors.liteblack,
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Login;
