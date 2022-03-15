/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, ActivityIndicator, } from "react-native";
import Temp from '../assets/placeholder.png'
import StarRating from 'react-native-star-rating';
import CastList from "../components/CastList";
import { getVideos, getGenres, getCast } from '../services/services'
import Trailers from "../components/Trailers";
import { WebView } from 'react-native-webview';
import { Button } from "react-native-paper";

const screen = Dimensions.get("screen").height

const Placeholder = Image.resolveAssetSource(Temp).uri

const Details = ({ route, navigation }) => {

    const [loaded, setLoaded] = useState(false)
    const [videos, setVideos] = useState([])
    const [genres, setGenres] = useState([])
    const [title, setTitle] = useState("")
    const [overview, setOverView] = useState("")
    const [vote, setVote] = useState("")
    const [cast, setCast] = useState([])

    useEffect(() => {

        const id = (MovieDetail ? MovieDetail.id : (MovieTitle ? MovieTitle.id : false)) ||
            (RandomMovie ? RandomMovie.id : (TVTitle ? TVTitle.id : (RandomTV ? RandomTV.id : false)))

        const type = (MovieDetail ? (MovieDetail.first_air_date ? "tv" : "movie") : false) ||
            (RandomMovie ? "movie" : (TVTitle ? "tv" : (RandomTV ? "tv" : false))) || 'movie'
        getVideos(id, type).then(res => setVideos(res.results.find(item => item.type === 'Trailer')))
        getGenres(id, type).then(res => setGenres(res.genres.map(item => item.name + "   ")))
        getGenres(id, type).then(res => setTitle(res.original_title ? res.original_title : res.original_name))
        getGenres(id, type).then(res => setOverView(res.overview))
        getGenres(id, type).then(res => setVote(res.vote_average))
        getCast(id, type).then(res => setCast(res.cast.map(item => item)))
        setLoaded(true)
    }, [])





    const { MovieDetail, MovieTitle, RandomMovie, TVTitle, RandomTV } = route.params

    const imgUrl = (MovieDetail ? MovieDetail.backdrop_path : (MovieTitle ? MovieTitle.backdrop_path : false)) ||
        (RandomMovie ? RandomMovie.backdrop_path : (TVTitle ? TVTitle.backdrop_path : (RandomTV ? RandomTV.backdrop_path : false)))

    const videokey = videos ? videos.key : null
    return (
        <ScrollView>
            {loaded &&
                <>
                    <View style={styles.container}>

                        <Image
                            style={styles.images}
                            resizeMode="cover"
                            source={{ uri: (imgUrl ? "https://www.themoviedb.org/t/p/original" + imgUrl : Placeholder) }}
                        />

                        <Text style={styles.title}>{title}</Text>

                        <View style={styles.genreContainer}>
                            {genres.map(item => {
                                return (

                                    <Text key={item} style={styles.genre}>{item}</Text>

                                )
                            })}
                        </View>
                        <View style={{ margin: 10 }}>
                            <StarRating
                                starSize={30}
                                disabled={true}
                                maxStars={5}
                                rating={vote / 2}
                                fullStarColor={'gold'}
                            />
                        </View>
                        <Text style={{ color: "white", fontSize: 15 }}>{overview}</Text>
                        <CastList
                            head="Casts"
                            data={cast}

                        />


                    </View>

                    <Trailers
                        data={videokey}
                        head="Trailer"
                    />
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
                        <Button style={{ width: 200, backgroundColor: "skyblue", marginBottom: 5, }}>View Downloads</Button>
                    </View>
                </>
            }
            {!loaded && <ActivityIndicator size={60} color="#0000ff" style={{ flex: 1, marginTop: screen / 3 }} />}
        </ScrollView>
    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        margin: 5
    },
    images: {
        height: screen / 3,
        width: "100%"
    },


    title: {
        color: "white",
        fontSize: 25,
        textAlign: "center",
        marginTop: 10
    },
    genreContainer: {
        margin: 10,
        alignContent: "center",
        fontSize: 20,
        flex: 1,
        justifyContent: "center",
        flexDirection: "row"
    }
    ,
    genre: {
        color: "white",
        fontSize: 15,

    }
})

export default Details