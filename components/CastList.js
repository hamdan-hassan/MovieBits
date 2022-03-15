/* eslint-disable prettier/prettier */
import React, { PureComponent } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Pressable } from "react-native";
import FastImage from 'react-native-fast-image'
import Temp from '../assets/placeholder.png'

const Placeholder = Image.resolveAssetSource(Temp).uri

class CastList extends PureComponent {




    render() {


        const { head, data, navigation } = this.props

        const renderItem = ({ item }) => {
            return (
                <Pressable style={{ marginRight: 20, }}

                >

                    <FastImage

                        style={{ height: 100, width: 100, borderRadius: 500 }}
                        source={{
                            uri: (item.profile_path ? "https://www.themoviedb.org/t/p/original" + item.profile_path : Placeholder),
                            priority: FastImage.priority.high,
                        }}

                    />
                    <View style={{ width: 100 }}>
                        <Text style={{ color: "white", textAlign: "center" }}>{item.name}</Text>
                        <Text style={{ color: "white", textAlign: "center" }}>as</Text>

                        <Text style={{ color: "white", textAlign: "center" }}>{item.character}</Text>
                    </View>

                    {/* <View
                        style={{
                            position: 'absolute',
                            height: 5,
                            width: '100%',
                            // backgroundColor: '#02ad94',
                            backgroundColor: 'skyblue',
                            opacity: 0.8,
                        }}></View> */}

                </Pressable>
            );
        }

        return (
            <View
                style={{
                    textAlign: "center",
                    margin: 10
                }}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 24,
                        marginTop: 36,
                    }}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                        {head}
                    </Text>

                </View>

                <FlatList
                    nestedScrollEnabled
                    maxToRenderPerBatch={5}
                    keyExtractor={(item, index) => item.id}
                    style={{ marginBottom: 30 }}
                    initialNumToRender={5}
                    horizontal={true}
                    data={data}
                    renderItem={renderItem}
                />

            </View>
        );
    }
}

export default CastList;