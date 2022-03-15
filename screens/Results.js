import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Pressable, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { searchMovieTv } from '../services/services';
import Card from '../components/Card';

const Results = ({ route, navigation }) => {

    const { Search, Type } = route.params

    const [loaded, setLoaded] = useState(false)
    const [results, setResults] = useState([])

    useEffect(() => {

        searchMovieTv(Search, Type === 'Movie' ? 'movie' : 'tv').then(res => {
            setResults(res)
        }).catch(err => {
            console.log(err)
        })

        setLoaded(true)
    }, [Search, Type])
    return (
        <>
            {!loaded && <ActivityIndicator size={60} color="#0000ff" style={{ flex: 1 }} />}

            {loaded &&
                <ScrollView>
                    <View>
                        <Text style={{ color: 'white', fontSize: 20, textAlign: "center", marginTop: 20 }}>{`Search Results for: ${Search}`}</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 24,
                                marginTop: 36,
                            }}>

                            {results.map(item => {

                                if (item.release_date === "") {
                                    return
                                }
                                else {
                                    return (
                                        <Pressable
                                            key={item.id}
                                            onPress={() => {
                                                navigation.push('Details', {
                                                    MovieDetail: item
                                                })
                                            }}
                                        >
                                            {/* //     <FastImage

                                //         style={{ height: 300, width: width, marginBottom: 20 }}
                                //         source={{ uri: "https://www.themoviedb.org/t/p/original" + item.poster_path, priority: FastImage.priority.high, }}
                                //         resizeMode={FastImage.resizeMode.contain}

                                //     /> */}
                                            <Card navigation={navigation} item={item} />
                                        </Pressable>


                                    )
                                }

                            })}




                        </View>
                    </View>
                </ScrollView>
            }
        </>
    )
}

export default Results