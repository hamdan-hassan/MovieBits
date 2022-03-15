/* eslint-disable prettier/prettier */
import React, { PureComponent } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity, Image, Pressable } from "react-native";
import FastImage from 'react-native-fast-image'


class List extends PureComponent {




    render() {


        const { head, data, navigation } = this.props

        const renderItem = ({ item }) => {
            return (
                <Pressable style={{ marginRight: 20 }}
                    onPress={() => {
                        navigation.push('Details', {
                            MovieDetail: item
                        })
                    }}
                >

                    <FastImage
                        style={{ height: 300, width: 200 }}
                        source={{
                            uri: "https://www.themoviedb.org/t/p/original" + item.poster_path,
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            height: 5,
                            width: '100%',
                            // backgroundColor: '#02ad94',
                            backgroundColor: 'skyblue',
                            opacity: 0.8,
                        }}></View>
                    {/* <Icon
                  name="play"
                  size={38}
                  color="#fff"
                  style={{
                    position: 'absolute',
                    top: '45%',
                    left: '45%',
                    opacity: 0.9,
                  }}
                /> */}
                </Pressable>
            );
        }

        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 24,
                        marginTop: 36,
                    }}>
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                        {head}
                    </Text>
                    <Pressable onPress={() => {
                        navigation.push('ViewAll', {
                            ViewALL: head
                        })
                    }}>
                        <Text style={{ color: '#02ad94', fontSize: 14, fontWeight: 'normal' }}>View All</Text>
                    </Pressable>


                </View>

                <FlatList
                    maxToRenderPerBatch={5}
                    keyExtractor={(item, index) => item.poster_path}
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

export default List;