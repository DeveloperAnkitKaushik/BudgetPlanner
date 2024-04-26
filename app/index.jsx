import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Services from '@/utils/Services'
import { Link, useRouter } from 'expo-router'
import { client } from '@/utils/KindeConfig';
import { supabase } from '../utils/SupaBaseConfig.jsx';
import Header from '../components/Header.jsx';
import CategoryList from '../components/CategoryList.jsx';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "../utils/Colors.jsx";
import PieChartt from '../components/PieChart.jsx';
import { AntDesign } from '@expo/vector-icons';

const index = () => {
    const [categoryItems, setcategoryItems] = useState();
    const route = useRouter();

    const checkUserAuth = async () => {
        const result = await Services.getData("login");
        if (result !== 'true') {
            route.replace('/login');
        }
    }

    useEffect(() => {
        checkUserAuth();
        getCategoryList();
    }, [])

    const handleLogout = async () => {
        const logout = await client.logout();
        if (logout) {
            await Services.storeData('login', 'false');
            route.replace("/login");
        }
    }

    const getCategoryList = async () => {
        const user = await client.getUserDetails();
        const { data, error } = await supabase
            .from('Category')
            .select('*,CategoryItems(*)')
            .eq('created_by', user.email);
        if (data) {
            setcategoryItems(data);
        }
    }
    return (
        <LinearGradient style={{ marginTop: 40, height: '100%', position: 'relative' }}
            colors={['#ffff', Colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <Header />
            <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                height: '100%',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                paddingHorizontal: 30,
                paddingTop: 20,
            }}>
                <PieChartt categoryItems={categoryItems} />
                <ScrollView>
                    <CategoryList categoryItems={categoryItems} />
                </ScrollView>
            </View>
            <Link
                href="/addNewCategory"
                style={{
                    position: 'absolute',
                    bottom: 60,
                    right: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <AntDesign name="pluscircle"
                    size={50}
                    color={Colors.primary}
                />
            </Link>
        </LinearGradient>
    )
}

export default index