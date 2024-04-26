import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors';
import ColorPicker from "../components/ColorPicker";
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../utils/SupaBaseConfig';
import { client } from "../utils/KindeConfig"
import Toast from "react-native-toast-message"
import { useRouter } from 'expo-router';

const AddNewCategory = () => {
    const route = useRouter();
    const [selectedIcon, setSelectedIcon] = useState('IC');
    const [selectedColor, setSelectedColor] = useState(Colors.primary);
    const [categoryName, setcategoryName] = useState();
    const [budget, setBudget] = useState();

    const createCategory = async () => {
        const user = await client.getUserDetails();
        const { data, error } = await supabase.from('Category').insert([{
            name: categoryName,
            assigned_budget: budget,
            icon: selectedIcon,
            color: selectedColor,
            created_by: user.email,
        }]).select();
        if (data) {
            Toast.show({
                type: 'success',
                text1: 'Successfully Created!!',
                visibilityTime: 1000,
            });
            route.replace({
                pathname: 'categoryDetail',
                params: {
                    category: data[0].id,
                }
            })
        }
    }

    return (
        <View style={{ marginTop: 40, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
            <View style={[{
                width: 70,
                height: 70,
                backgroundColor: selectedColor,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
            }]}>
                <TextInput style={{ fontSize: 30, color: Colors.white }} maxLength={2} onChangeText={(e) => setSelectedIcon(e)}>{selectedIcon}</TextInput>
            </View>
            <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            <View style={{ marginTop: 60, width: '100%', alignItems: 'center', gap: 20 }}>
                <View style={styles.inputContainer}>
                    <MaterialIcons name="local-offer" size={23} style={{ color: Colors.gray, width: 20 }} />
                    <TextInput
                        placeholder='Enter Name'
                        style={{ fontSize: 17, width: '93%', color: Colors.black, fontFamily: 'med' }}
                        onChangeText={(e) => setcategoryName(e)}
                    >{categoryName}</TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons name="currency-rupee" size={23} style={{ color: Colors.gray, width: 20 }} />
                    <TextInput
                        placeholder='Enter Budget'
                        style={{ fontSize: 17, width: '93%', color: Colors.black, fontFamily: 'med' }}
                        onChangeText={(e) => setBudget(e)}
                        keyboardType='numeric'
                    >{budget}</TextInput>
                </View>
            </View>
            <TouchableOpacity
                style={{ backgroundColor: Colors.primary, width: '70%', borderRadius: 10, height: 50, marginTop: 50, alignItems: 'center', justifyContent: 'center' }}
                disabled={!categoryName || !budget}
                onPress={() => createCategory()}
            >
                <Text style={{ color: Colors.white, fontFamily: 'bold', fontSize: 20 }}>Create</Text>
            </TouchableOpacity>
            <Toast />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '70%',
        borderColor: Colors.gray,
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    }
})

export default AddNewCategory;
