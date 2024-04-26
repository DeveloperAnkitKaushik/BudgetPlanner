import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import PieChart from 'react-native-pie-chart';
import Colors from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PieChartt = ({ categoryItems }) => {
    const widthAndHeight = 200;
    const [values, setValues] = useState([1]);
    const [sliceColor, setSliceColor] = useState([Colors.primary]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        updatedChart();
    }, [categoryItems]);

    const updatedChart = () => {
        if (!categoryItems || categoryItems.length === 0) {
            setSliceColor([Colors.primary]);
            setValues([1]);
            return;
        }

        const newSliceColor = [];
        const newValues = [];
        let otherCost = 0
        let total = 0;
        
        categoryItems.forEach((category, ind) => {
            if (ind < 4) {
                category.CategoryItems?.forEach((item) => {
                    total = total + item.cost;
                });
                if (total > 0) {
                    newSliceColor.push(Colors.colorList[ind]);
                    newValues.push(total);
                }
            } else {
                category.CategoryItems?.forEach((item) => {
                    otherCost = otherCost + item.cost;
                })
            }
        });

        if (newValues.length === 0) {
            setSliceColor([Colors.primary]);
            setValues([1]);
        } else {
            setSliceColor(newSliceColor);
            setValues(newValues);
        }
        setTotal(total);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Total Estimate: <Text style={{ fontFamily: 'bold' }}> ₹{total}</Text></Text>
            <View style={styles.innercontainer}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={values}
                    sliceColor={sliceColor}
                    coverRadius={0.7}
                    coverFill={'transparent'}
                    style={styles.chart}
                />
                {categoryItems?.length == 0 ?
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                            <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color={Colors.primary} />
                            <Text>N/A</Text>
                        </View>
                    </View>
                    :
                    <View>
                        {categoryItems?.map((category, ind) => (
                            <View style={{ justifyContent: 'center', alignContent: 'center' }} key={ind}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color={Colors.colorList[ind]} />
                                    <Text>{category.name}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    text: {
        fontSize: 20,
        marginBottom: 30,
        fontFamily: 'med',
    },
    innercontainer: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
    }
})

export default PieChartt;
