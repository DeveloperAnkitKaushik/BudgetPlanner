import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from "../utils/SupaBaseConfig";
import { Entypo } from '@expo/vector-icons';
import Colors from "../utils/Colors";
import { AntDesign } from '@expo/vector-icons';
import ItemList from '../components/ItemList';
import Toast from "react-native-toast-message"

const categoryDetail = () => {
    const route = useRouter();
    const { category } = useLocalSearchParams();
    const [categoryData, setCategoryData] = useState([]);
    const [totalAmount, settotalAmount] = useState(0);
    const [percentage, setpercentage] = useState(0);
    useEffect(() => {
        category && getCategoryDetails();
    }, [category]);
    useEffect(() => {
        categoryData && calculateTotal();
    }, [categoryData])
    const getCategoryDetails = async () => {
        const { data, error } = await supabase.from('Category').select('*,CategoryItems(*)').eq('id', category);
        setCategoryData(data[0]);
    }
    const calculateTotal = () => {
        let total = 0;
        categoryData?.CategoryItems?.forEach((item) => {
            total = total + item.cost;
        })
        settotalAmount(total);
        const percentage = (total / categoryData.assigned_budget) * 100;
        setpercentage(percentage);
    }

    const deleteCategory = () => {
        Alert.alert('Are you sure?', "process can't be reversed!", [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: async () => {
                    const { error } = await supabase
                        .from('CategoryItems')
                        .delete()
                        .eq('category_id', categoryData.id);

                    await supabase
                        .from('Category')
                        .delete()
                        .eq('id', categoryData.id);

                    Toast.show({
                        type: 'success',
                        text1: 'Successfully Deleted!!',
                        visibilityTime: 1000,
                    });

                    route.replace('/');
                }
            }
        ]);
    }
    return (
        <View style={{ marginTop: 40, paddingHorizontal: 20, position: 'relative', flex: 1 }}>
            <Entypo name="arrow-with-circle-left" size={30} color="black" style={{ color: Colors.primary, marginTop: 10 }} onPress={() => route.back()} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 50,
            }}>
                <View style={{
                    flexDirection: 'row',
                    gap: 30
                }}>
                    <View style={{
                        backgroundColor: categoryData?.color, padding: 15, borderRadius: 10,
                    }}>
                        <Text style={{ fontSize: 35 }}>{categoryData?.icon}</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold' }}>{categoryData?.name}</Text>
                        <Text style={{ fontSize: 15, fontFamily: 'med', color: Colors.gray }}>{categoryData?.CategoryItems?.length} Items</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => deleteCategory()}>
                    <AntDesign name="delete" size={24} color='red' />
                </TouchableOpacity>
            </View>
            <View style={{
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text style={{ fontFamily: 'med' }}>₹{totalAmount}</Text>
                <Text style={{ fontFamily: 'med' }}>Total Budget:  ₹{categoryData?.assigned_budget}</Text>
            </View>
            <View style={{
                width: '100%',
                height: 10,
                backgroundColor: Colors.gray,
                marginTop: 10,
                borderRadius: 20,
            }}>
                <View style={[{
                    width: '40%',
                    height: 10,
                    backgroundColor: Colors.primary,
                    borderRadius: 20
                }, { width: percentage + '%' }]}></View>
            </View>
            <ScrollView>
                <ItemList categoryData={categoryData} />
            </ScrollView>
            <Link
                href={{
                    pathname: 'addNewCategoryItem',
                    params: {
                        categoryID: categoryData.id
                    }
                }}
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
        </View>
    )
}

export default categoryDetail