import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../utils/Colors';
import { client } from '@/utils/KindeConfig';
import { useRouter } from 'expo-router';
import Services from '@/utils/Services'


const Header = () => {
    const route = useRouter();
    const [user, setUser] = useState('');
    const [greeting, setGreeting] = useState('');
    const [expandMenu, setExpandMenu] = useState(false);

    const handleLogout = async () => {
        const logout = await client.logout();
        if (logout) {
            await Services.storeData('login', 'false');
            route.replace("/login");
        }
    }

    useEffect(() => {
        getUserDetails();
        generateGreeting();
    }, [])
    const getUserDetails = async () => {
        const user = await client.getUserDetails();
        setUser(user);
    }
    const generateProfilePic = () => {
        if (user && user.picture) {
            return <TouchableOpacity style={{ position: 'relative', zIndex: 1000, }} onPress={() => setExpandMenu(v => !v)}>
                <Image source={{ uri: user.picture }} style={styles.profilePic} />
                {expandMenu &&
                    <Text style={{
                        position: 'absolute',
                        top: 20,
                        borderColor: Colors.gray,
                        borderWidth: 1,
                        borderRadius: 5,
                        right: 60,
                        width: 100,
                        backgroundColor: 'white',
                        paddingHorizontal: 5,
                        paddingVertical: 10,
                        textAlign: 'center',
                        fontFamily: 'med',
                    }} onPress={() => handleLogout()}>Logout</Text>
                }
            </TouchableOpacity>
        } else if (user && user.given_name) {
            const firstLetter = user.given_name.charAt(0).toUpperCase();
            return (
                <View style={[styles.profilePic, styles.initialCircle]}>
                    <Text style={styles.initialText}>{firstLetter}</Text>
                </View>
            );
        } else {
            return null;
        }
    };

    const generateGreeting = () => {
        const currentHour = new Date().getHours();
        let greetingMessage = '';

        if (currentHour >= 5 && currentHour < 12) {
            greetingMessage = 'Good morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            greetingMessage = 'Good afternoon';
        } else {
            greetingMessage = 'Good evening';
        }

        if (user && user.given_name) {
            greetingMessage += `,`;
        }

        setGreeting(greetingMessage);
    };
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greetings}>{greeting}</Text>
                <Text style={styles.username}>{user.given_name}</Text>
            </View>
            {generateProfilePic()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    initialCircle: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initialText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    greetings: {
        fontSize: 17,
        fontWeight: '500',
        color: Colors.black,
        fontFamily: 'med'
    },
    username: {
        fontSize: 25,
        color: Colors.black,
        fontFamily: 'bold'
    }
});

export default Header