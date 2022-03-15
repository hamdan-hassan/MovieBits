/* eslint-disable prettier/prettier */
import React, { PureComponent, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
import StarRating from 'react-native-star-rating';
import { Searchbar, } from 'react-native-paper';
import Carousel from 'react-native-anchor-carousel';
class CarrouselList extends PureComponent {





    render() {
        const carouselRef = useRef(null);
        return (
            <View style={styles.carouselContentContainer}>
                <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000' }}>
                    <ImageBackground
                        source={{ uri: background.uri }}
                        style={styles.ImageBg}
                        blurRadius={10}>
                        <View style={styles.SearchboxContainer}>
                            <Searchbar placeholder="Search Movies" />
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
                                renderItem={({ item, index }) => {


                                    return (
                                        <View>
                                            <TouchableOpacity

                                                onPress={() => {

                                                    carouselRef.current.scrollToIndex(index);
                                                    setBackground({
                                                        uri: "https://www.themoviedb.org/t/p/original" + item.backdrop_path,
                                                        name: item.title,
                                                        stat: item.release_date,
                                                        desc: item.overview,
                                                        rating: item.vote_average
                                                    });
                                                }}>
                                                <Image source={{ uri: "https://www.themoviedb.org/t/p/original" + item.backdrop_path }} style={styles.carouselImage} />
                                                <Text style={styles.carouselText}>{item.title}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }}
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
                                <TouchableOpacity style={styles.playIconContainer}>
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
                            <Text style={{ color: 'white', opacity: 0.8, lineHeight: 20 }}>
                                {background.desc}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}

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


export default CarrouselList;