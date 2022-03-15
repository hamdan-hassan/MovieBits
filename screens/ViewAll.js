import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Pressable, Dimensions, ScrollView, } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button } from 'react-native-paper';
import Card from '../components/Card';

import {
    getPopularMovies,
    getTopRatedMovies,
    getActionMovies,
    getComedyMovies,
    getAdventureMovies,
    getAnimationMovies,
    getDramaMovies,
    getRomanticMovies,
    getFamilyMovies,
    getHorrorMovies,
    getPopularTV,
    getTopRatedTV,
    getActionTV,
    getCrimeTV,
    getComedyTV,
    getSciFiTV,
    getAnimationTV,
    getDramaTV,
    getMysteryTV,
} from '../services/services';

import Temp from '../assets/placeholder.png'

const Placeholder = Image.resolveAssetSource(Temp).uri
const width = Dimensions.get('screen').width

const ViewAll = ({ route, navigation }) => {
    const { ViewALL } = route.params
    useEffect(() => {

        switch (ViewALL) {
            case 'Popular Movies':
                getPopularMovies().then(res => {
                    setData(res)
                })
                setApi(() => getPopularMovies)
                break;

            case 'Top Rated':
                getTopRatedMovies().then(res => {
                    setData(res)
                })
                setApi(() => getTopRatedMovies)
                break;
            case 'Action Movies':
                getActionMovies().then(res => {
                    setData(res)
                })
                setApi(() => getActionMovies)
                break;
            case 'Comedy Movies':
                getComedyMovies().then(res => {
                    setData(res)
                })
                setApi(() => getComedyMovies)
                break;
            case 'Animation Movies':
                getAnimationMovies().then(res => {
                    setData(res)
                })
                setApi(() => getAnimationMovies)
                break;
            case 'Family Movies':
                getFamilyMovies().then(res => {
                    setData(res)
                })
                setApi(() => getFamilyMovies)
                break;
            case 'Horror Movies':
                getHorrorMovies().then(res => {
                    setData(res)
                })
                setApi(() => getHorrorMovies)
                break;
            case 'Adventure Movies':
                getAdventureMovies().then(res => {
                    setData(res)
                })
                setApi(() => getAdventureMovies)
                break;
            case 'Drama Movies':
                getDramaMovies().then(res => {
                    setData(res)
                })
                setApi(() => getDramaMovies)
                break;
            case 'Romantic Movies':
                getRomanticMovies().then(res => {
                    setData(res)
                })
                setApi(() => getRomanticMovies)
                break;
            case 'Popular Shows':
                getPopularTV().then(res => {
                    setData(res)
                })
                setApi(() => getPopularTV)
                break;
            case 'Top Rated Shows':
                getTopRatedTV().then(res => {
                    setData(res)
                })
                setApi(() => getTopRatedTV)
                break;
            case 'Action & Adventure':
                getActionTV().then(res => {
                    setData(res)
                })
                setApi(() => getActionTV)
                break;
            case 'Comedy':
                getComedyTV().then(res => {
                    setData(res)
                })
                setApi(() => getComedyTV)
                break;
            case 'Crime':
                getCrimeTV().then(res => {
                    setData(res)
                })
                setApi(() => getCrimeTV)
                break;
            case 'Drama':
                getDramaTV().then(res => {
                    setData(res)
                })
                setApi(() => getDramaTV)
                break;
            case 'Sci-Fi & Fantasy':
                getSciFiTV().then(res => {
                    setData(res)
                })
                setApi(() => getSciFiTV)
                break;
            case 'Animation':
                getAnimationTV().then(res => {
                    setData(res)
                })
                setApi(() => getAnimationTV)
                break;
            case 'Mystery':
                getMysteryTV().then(res => {
                    setData(res)
                })
                setApi(() => getMysteryTV)
                break;

        }


    }, [])

    const [data, setData] = useState([])
    const [api, setApi] = useState()
    let [page, setPage] = useState(1)

    console.log(api)

    return (
        <ScrollView>
            <View>
                <Text style={{ color: 'white', fontSize: 20, textAlign: "center", marginTop: 20 }}>{ViewALL}</Text>

                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 24,
                        marginTop: 36,
                    }}>

                    {data.map(item => {

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
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Button
                        onPress={() => {
                            setPage(++page)
                            api(page).then(res => {
                                setData([...data, ...res])
                            })

                        }}
                        style={{ width: 200, backgroundColor: "skyblue", marginBottom: 5, }}>Load More</Button>
                </View>

            </View>
        </ScrollView>
    )

}

export default ViewAll