import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors';
import { AntDesign } from '@expo/vector-icons';
import { supabase } from '../utils/SupaBaseConfig';
import { useRouter } from 'expo-router';

const ItemList = ({ categoryData }) => {
    const route = useRouter();
    const deleteItem = async (id) => {
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
                        .eq('id', id);
                    route.replace('/');
                }
            }
        ]);
    }
    return (
        <View style={{
            marginTop: 40,
        }}>
            <Text style={{ fontFamily: 'bold', fontSize: 20 }}>ItemList</Text>
            <View style={{}}>
                {categoryData?.CategoryItems?.length > 0 ?
                    categoryData?.CategoryItems?.map((item, ind) => (
                        <View style={{
                            marginVertical: 30,
                            borderBottomColor: Colors.gray,
                            borderBottomWidth: 2,
                            borderBottomEndRadius: 5,
                            paddingBottom: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }} key={ind}>
                            <Image source={{ uri: item?.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
                            <View style={{ flex: 1, marginLeft: 10, paddingRight: 20 }}>
                                <Text numberOfLines={1} style={{ fontSize: 20, fontFamily: 'bold', paddingBottom: 10 }}>{item?.name}</Text>
                                <Text numberOfLines={2} style={{ fontSize: 14, fontFamily: 'med', }}>{item?.note}</Text>
                            </View>
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Text style={{ fontSize: 18, fontFamily: 'bold' }}>₹{item?.cost}</Text>
                                <TouchableOpacity onPress={() => deleteItem(item?.id)}>
                                    <AntDesign name="delete" size={24} color='red' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                    : <Text style={{ fontFamily: 'med', marginTop: 20 }}>No item found</Text>
                }
            </View>
        </View>
    )
}

export default ItemList;
