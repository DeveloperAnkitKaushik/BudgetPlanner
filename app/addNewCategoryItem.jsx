import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import Colors from "../utils/Colors";
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "../utils/SupaBaseConfig";
import { decode } from "base64-arraybuffer";
import Toast from "react-native-toast-message"

const placeholderimg = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

const addNewCategoryItem = () => {
    const route = useRouter();
    const [image, setImage] = useState(placeholderimg);
    const [previewImg, setPreviewImg] = useState(placeholderimg);
    const [name, setName] = useState('')
    const [cost, setCost] = useState('')
    const [notes, setNotes] = useState('')
    const { categoryID } = useLocalSearchParams();
    const [loader, setLoader] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled) {
            setPreviewImg(result.assets[0].uri)
            setImage(result.assets[0].base64);
        }
    };

    const onClickAdd = async () => {
        setLoader(true);
        const fileName = Date.now() + '.png';
        const { data, error } = await supabase
            .storage
            .from('Images')
            .upload(fileName, decode(image), {
                contentType: 'image/png'
            });
        if (data) {
            const fileUrl = `https://ztwuauvlgutgvcvlvooc.supabase.co/storage/v1/object/public/Images/${fileName}`
            const { data, error } = await supabase
                .from('CategoryItems')
                .insert([{
                    name: name,
                    cost: cost,
                    image: fileUrl,
                    note: notes,
                    category_id: categoryID
                }]).select();
            Toast.show({
                type: 'success',
                text1: 'Successfully Created!!',
                visibilityTime: 1000,
            });
            setLoader(false);
            route.replace('/')
        }
    };


    return (
        <View style={{
            marginTop: 50,
            paddingHorizontal: 20
        }}>
            <Entypo name="arrow-with-circle-left" size={30} color="black" style={{ color: Colors.primary, marginTop: 10 }} onPress={() => route.back()} />
            <TouchableOpacity onPress={() => pickImage()}>
                <Image
                    source={{ uri: previewImg }}
                    style={{
                        height: 200,
                        width: 200,
                        marginVertical: 20,
                        borderRadius: 10
                    }}
                />
            </TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: Colors.gray,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: 20,
                marginTop: 10
            }}>
                <AntDesign name="tagso" size={24} color={Colors.gray} />
                <TextInput placeholder='Enter Name' style={{ fontFamily: 'med', width: '90%' }} onChangeText={(v) => setName(v)}></TextInput>
            </View>
            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: Colors.gray,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: 20,
            }}>
                <FontAwesome name="rupee" size={24} color={Colors.gray} />
                <TextInput placeholder='Cost' style={{ fontFamily: 'med', width: '90%' }} onChangeText={(v) => setCost(v)} keyboardType='numeric'></TextInput>
            </View>
            <View style={{
                flexDirection: 'row',
                gap: 10,
                borderColor: Colors.gray,
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: 20,
            }}>
                <AntDesign name="pushpino" size={24} color={Colors.gray} />
                <TextInput placeholder='Note' style={{ fontFamily: 'med', width: '90%' }} onChangeText={(v) => setNotes(v)}></TextInput>
            </View>
            <TouchableOpacity style={{
                backgroundColor: Colors.primary,
                borderRadius: 10,
                alignItems: 'center',
                paddingVertical: 10,
            }}
                disabled={!name || !cost || loader}
                onPress={() => onClickAdd()}
            >
                {loader ?
                    <ActivityIndicator color={Colors.white}/> : <Text style={{ fontFamily: 'bold', color: Colors.white, fontSize: 18 }}>Add Item</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default addNewCategoryItem