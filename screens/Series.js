/* eslint-disable prettier/prettier */
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ScrollView,
    ImageBackground,
    TextInput,
    TouchableWithoutFeedback,
    FlatList,
    Pressable,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import List from '../components/List';
import StarRating from 'react-native-star-rating';
import axios from 'axios';

import {
    getTrendingWeekTV,
    getPopularTV,
    getTopRatedTV,
    getActionTV,
    getCrimeTV,
    getComedyTV,
    getSciFiTV,
    getAnimationTV,
    getDramaTV,
    getMysteryTV,
    getRandomTV
} from '../services/services';



import Icon from 'react-native-vector-icons/FontAwesome5';
import { Searchbar, } from 'react-native-paper';
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Carousel from 'react-native-anchor-carousel';
import { act } from 'react-test-renderer';




const Series = ({ navigation }) => {

    const [weekTrending, setWeekTrending] = useState("")
    const [search, setSearch] = useState("")
    const [popular, setPopular] = useState("")
    const [topRated, setTopRated] = useState("")
    const [action, setAction] = useState("")
    const [comedy, setComedy] = useState("")
    const [crime, setCrime] = useState("")
    const [animation, setAnimation] = useState("")
    const [drama, setDrama] = useState("")
    const [scifi, setSciFi] = useState("")
    const [mystery, setMystery] = useState("")
    // const [documentary, setDocumentary] = useState("")
    const [randomTV, setRandomTV] = useState("")
    const [tvTitle, setTVTitle] = useState("")
    const [background, setBackground] = useState({});
    const [loaded, setLoaded] = useState(false)


    const getData = () => {
        return Promise.all([
            getPopularTV(),
            getRandomTV(),
            getTopRatedTV(),
            getActionTV(),
            getComedyTV(),
            getCrimeTV(),
            getAnimationTV(),
            getDramaTV(),
            getSciFiTV(),
            getMysteryTV(),
        ])
    }

    useLayoutEffect(() => {
        getTrendingWeekTV().then(movies => {
            setWeekTrending(movies)
            setBackground({
                uri: "https://www.themoviedb.org/t/p/original" + movies[0].backdrop_path,
                name: (movies[0].name.length >= 20 ? movies[0].name.substr(0, 19) + "..." : movies[0].name),
                stat: movies[0].first_air_date,
                desc: (movies[0].overview.length >= 430 ? movies[0].overview.desc.substr(0, 439) + "..." : movies[0].overview),
                rating: movies[0].vote_average
            })

            setTVTitle(movies[0].title)

        }).catch(err => {
            console.log(err)
        })


    }, [])

    useEffect(() => {



        getData().then(([
            popularTV,
            randomTv,
            topRatedTV,
            actionTV,
            comedyTV,
            crimeTV,
            animationTV,
            dramaTV,
            scifiTV,
            mysteryTV,

        ]) => {
            setPopular(popularTV);
            setRandomTV(randomTv);
            setTopRated(topRatedTV);
            setAction(actionTV);
            setComedy(comedyTV);
            setCrime(crimeTV);
            setAnimation(animationTV);
            setDrama(dramaTV);
            setSciFi(scifiTV);
            setMystery(mysteryTV);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoaded(true)
        })



        getPopularTV().then(movies => {
            setPopular(movies)
        }).catch(err => {
            console.log(err)
        })

        getTopRatedTV().then(movies => {
            setTopRated(movies)
        }).catch(err => {
            console.log(err)
        })

        getRandomTV().then(movies => {

            setRandomTV(movies)
        }).catch(err => {
            console.log(err)
        })

        getActionTV().then(movies => {
            setAction(movies)
        }).then(err => {
            console.log(err)
        })

        getComedyTV().then(movies => {
            setComedy(movies)
        }).then(err => {
            console.log(err)
        })

        getCrimeTV().then(movies => {
            setCrime(movies)
        }).catch(err => {
            console.log(err)
        })

        getAnimationTV().then(movies => {
            setAnimation(movies)
        }).catch(err => {
            console.log(err)
        })

        getDramaTV().then(movies => {
            setDrama(movies)
        }).catch(err => {
            console.log(err)
        })

        getSciFiTV().then(movies => {
            setSciFi(movies)
        }).catch(err => {
            console.log(err)
        })

        getMysteryTV().then(movies => {
            setMystery(movies)
        }).catch(err => {
            console.log(err)
        })


    }, [])





    const carouselRef = useRef(null);

    const { width, height } = Dimensions.get('window');

    const renderItem = ({ item, index }) => {


        return (
            <View>
                <TouchableOpacity
                    // onPressOut={() => {
                    //   carouselRef.current.scrollToIndex(index);
                    //   setBackground({
                    //     uri: item.image,
                    //     name: item.title,
                    //     stat: item.released,
                    //     desc: item.desc,
                    //   });
                    // }}


                    onPress={() => {

                        carouselRef.current.scrollToIndex(index);
                        setBackground({
                            uri: "https://www.themoviedb.org/t/p/original" + item.backdrop_path,
                            name: (item.name.length >= 20 ? item.name.substr(0, 19) + "..." : item.name),
                            stat: item.first_air_date,
                            desc: (item.overview.length >= 430 ? item.overview.substr(0, 439) + "..." : item.overview),
                            rating: item.vote_average
                        });
                        setTVTitle(item)
                        console.log(item.title)
                    }}>
                    <Image source={{ uri: "https://www.themoviedb.org/t/p/original" + item.backdrop_path }} style={styles.carouselImage} />
                    <Text style={styles.carouselText}>{item.title}</Text>

                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            {!loaded && <ActivityIndicator size={60} color="#0000ff" style={{ flex: 1 }} />
            }
            {loaded && <ScrollView style={{ backgroundColor: '#000' }} blurRadius={100}>
                <StatusBar backgroundColor="#000" barStyle="light-content" />

                <View style={styles.carouselContentContainer}>
                    <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000' }}>
                        <ImageBackground
                            source={{ uri: background.uri }}
                            style={styles.ImageBg}
                            blurRadius={10}>
                            <View style={styles.SearchboxContainer}>
                                <Searchbar
                                    placeholder='Search TV Shows'
                                    value={search}
                                    onChangeText={setSearch}
                                    onSubmitEditing={() => {
                                        if (/^ *$/.test(search)) {
                                            alert("emtyp")
                                        }
                                        else {
                                            navigation.push("Results", {
                                                Search: search.trim(),
                                                Type: 'TV'

                                            })
                                        }

                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    marginLeft: 10,
                                    marginVertical: 10,
                                }}>
                                Trending This Week
                            </Text>
                            <View style={styles.carouselContainerView}>
                                <Carousel

                                    style={styles.carousel}
                                    data={weekTrending}
                                    renderItem={renderItem}
                                    itemWidth={200}
                                    containerWidth={width - 20}
                                    separatorWidth={0}
                                    ref={carouselRef}
                                    inActiveOpacity={0.4}

                                //pagingEnable={false}
                                //minScrollDistance={20}
                                />
                            </View>

                            <View style={styles.movieInfoContainer}>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.movieName}>{background.name}</Text>
                                    <Text style={styles.movieStat}>{background.stat}</Text>
                                    <Text style={{ marginLeft: 10, marginTop: 20 }}>
                                        <StarRating
                                            starSize={30}
                                            disabled={true}
                                            maxStars={5}
                                            rating={background.rating / 2}
                                            fullStarColor={'gold'}
                                        />
                                    </Text>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={styles.playIconContainer}
                                        onPress={() => {
                                            navigation.push("Details", {
                                                TVTitle: tvTitle
                                            })


                                        }}
                                    >
                                        <Icon
                                            name="play"
                                            size={22}
                                            color="#02ad94"
                                            style={{ marginLeft: 4 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 14, marginTop: 14 }}>
                                <Text style={{ color: 'white', opacity: 0.8, lineHeight: 20, }}>
                                    {background.desc}

                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <View style={{ marginHorizontal: 14 }}>
                    <Text
                        style={{
                            color: 'white',
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginBottom: 24,
                            marginTop: 20
                        }}>
                        Recommended
                    </Text>
                    <Text style={{ color: 'white', padding: 14 }}>
                        {randomTV.name}
                    </Text>
                    <Pressable
                        onPress={() => {
                            navigation.push("Details", {
                                RandomTV: randomTV
                            })
                        }}
                    >
                        <ImageBackground
                            style={{ height: 250, width: '100%', backgroundColor: '000' }}
                            resizeMode="cover"
                            source={{
                                uri: "https://www.themoviedb.org/t/p/original" + randomTV.poster_path,
                            }}>
                        </ImageBackground>
                    </Pressable>

                    {/* Popular Movies */}
                    <List
                        head="Popular Shows"
                        data={popular}
                        navigation={navigation}
                    />


                    {/*Top Rated  */}
                    <List
                        head="Top Rated Shows"
                        data={topRated}
                        navigation={navigation}
                    />

                    {/*Action Movies  */}
                    <List
                        head="Action & Adventure"
                        data={action}
                        navigation={navigation}
                    />

                    {/*Comedy Movies  */}
                    <List
                        head="Comedy"
                        data={comedy}
                        navigation={navigation}
                    />

                    {/*Adventure Movies  */}
                    <List
                        head="Crime"
                        data={crime}
                        navigation={navigation}
                    />

                    {/*Animation Movies  */}
                    <List
                        head="Animation"
                        data={animation}
                        navigation={navigation}
                    />

                    {/*Drama Movies  */}
                    <List
                        head="Drama"
                        data={drama}
                        navigation={navigation}
                    />

                    {/*Romantic Movies  */}
                    <List
                        head="Sci-Fi & Fantasy"
                        data={scifi}
                        navigation={navigation}
                    />

                    {/*Horror Movies  */}
                    <List
                        head="Mystery"
                        data={mystery}
                        navigation={navigation}
                    />

                </View>
            </ScrollView>}
        </>
    );
};

const styles = StyleSheet.create({
    // CAROUSEL STYLES

    carouselImage: {
        width: 200,
        height: 320,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)',
    },
    carouselText: {
        paddingLeft: 14,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        left: 2,
        fontWeight: 'bold',
    },
    carouselIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    carouselContentContainer: {
        flex: 1,
        backgroundColor: '#000',
        height: 800,
        paddingHorizontal: 14,
    },
    SearchboxContainer: {
        margin: 15,
    },

    ImageBg: {
        flex: 1,
        height: null,
        width: null,
        opacity: 1,
        justifyContent: 'flex-start',
    },
    carouselContainerView: {
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
        overflow: 'visible',
    },
    movieInfoContainer: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
        width: Dimensions.get('window').width - 14,
    },
    movieName: {
        paddingLeft: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 6,
    },
    movieStat: {
        paddingLeft: 14,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        opacity: 0.8,
    },
    playIconContainer: {
        backgroundColor: '#212121',
        padding: 18,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 25,
        borderWidth: 4,
        borderColor: 'rgba(2, 173, 148, 0.2)',
        marginBottom: 14,
    },
});

export default Series;
