/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Pressable, Dimensions } from "react-native";
import FastImage from 'react-native-fast-image'
import Temp from '../assets/placeholder.png'
import YoutubePlayer from "react-native-youtube-iframe";

const width = Dimensions.get("screen").width

const CastList = ({ head, data, navigation }) => {



    const [playing, setPlaying] = useState(false);


    return (
        <View

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




            <View>

                {data !== null && <YoutubePlayer
                    webViewStyle={{ opacity: 0.99 }}
                    height={300}
                    width={width}
                    videoId={data}

                />}

                {data === null && <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: "center", marginBottom: 15 }}>
                    No Trailer Avaliabe
                </Text>}



            </View>



        </View>
    );

}

export default CastList;