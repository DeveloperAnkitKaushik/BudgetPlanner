import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ItemList from './ItemList';

const CategoryList = ({ categoryItems }) => {
    const route = useRouter();
    const onCategoryClick = (category) => {
        route.push({
            pathname: '/categoryDetail',
            params: {
                category:category.id
            }
        })
    }
    const total = (category) => {
        let totalCost = 0;
        category.forEach((item) => {
            totalCost=totalCost+item.cost;
        })
        return totalCost
    }
    return (
        <View style={styles.container}>
            <View style={styles.innercontainer}>
                {categoryItems && categoryItems.map((category, ind) => (
                    <TouchableOpacity style={styles.categoryconatiner} key={ind} onPress={()=> onCategoryClick(category)}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderRadius:20, backgroundColor: category.color, padding: 15 }}>
                                <Text style={{ fontSize: 35, }}>{category.icon}</Text>
                            </View>
                            <View style={{ marginLeft: 30, justifyContent: 'center', gap: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'bold' }}>{category.name}</Text>
                                <Text style={{ fontSize: 15, fontFamily: 'med', color: Colors.gray }}>{category?.CategoryItems?.length} Items</Text>
                            </View>
                        </View>
                        <Text style={{fontFamily: 'bold', fontSize: 20}}>₹ {total(category?.CategoryItems)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    },
    categoryconatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
    },
})

export default CategoryList
