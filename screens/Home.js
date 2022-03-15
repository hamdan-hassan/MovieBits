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
  ActivityIndicator,
  TouchableWithoutFeedback,
  FlatList,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import List from '../components/List';
import StarRating from 'react-native-star-rating';
import axios from 'axios';


import {
  getTrendingWeekMovies,
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
  getRandomMovie
} from '../services/services';



import Icon from 'react-native-vector-icons/FontAwesome5';
import { Searchbar, } from 'react-native-paper';
import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Carousel from 'react-native-anchor-carousel';
import { act } from 'react-test-renderer';




const Home = ({ navigation }) => {

  const [loaded, setLoaded] = useState(false)
  const [search, setSearch] = useState("")
  const [weekTrending, setWeekTrending] = useState("")
  const [popular, setPopular] = useState("")
  const [topRated, setTopRated] = useState("")
  const [action, setAction] = useState("")
  const [comedy, setComedy] = useState("")
  const [adventure, setAdventure] = useState("")
  const [animation, setAnimation] = useState("")
  const [drama, setDrama] = useState("")
  const [romance, setRomance] = useState("")
  const [family, setFamily] = useState("")
  const [horror, setHorror] = useState("")
  const [randomMovie, setRandomMovie] = useState("")
  const [title, setTitle] = useState("")
  const [background, setBackground] = useState({});


  const getData = () => {
    return Promise.all([
      getPopularMovies(),
      getRandomMovie(),
      getTopRatedMovies(),
      getActionMovies(),
      getComedyMovies(),
      getAdventureMovies(),
      getAnimationMovies(),
      getDramaMovies(),
      getRomanticMovies(),
      getFamilyMovies(),
      getHorrorMovies()
    ])

  }

  useLayoutEffect(() => {
    getTrendingWeekMovies().then(movies => {
      setWeekTrending(movies)
      setBackground({
        uri: "https://www.themoviedb.org/t/p/original" + movies[0].backdrop_path,
        name: movies[0].title,
        stat: movies[0].release_date,
        desc: movies[0].overview,
        rating: movies[0].vote_average
      })

      setTitle(movies[0])




    }).catch(err => {
      console.log(err)
    })


  }, [])

  useEffect(() => {

    getData().then(([
      popularMovies,
      randomMovies,
      topRatedMovies,
      actionMovies,
      comedyMovies,
      adventureMovies,
      animationMovies,
      dramaMovies,
      romanticMovies,
      familyMovies,
      horrorMovies
    ]) => {
      setPopular(popularMovies)
      setRandomMovie(randomMovies)
      setTopRated(topRatedMovies)
      setAction(actionMovies)
      setComedy(comedyMovies)
      setAdventure(adventureMovies)
      setAnimation(animationMovies)
      setDrama(dramaMovies)
      setRomance(romanticMovies)
      setFamily(familyMovies)
      setHorror(horrorMovies)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setLoaded(true)
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
              name: item.title,
              stat: item.release_date,
              desc: item.overview,
              rating: item.vote_average
            });

            setTitle(item)

          }}>
          <Image source={{ uri: "https://www.themoviedb.org/t/p/original" + item.backdrop_path }} style={styles.carouselImage} />
          <Text style={styles.carouselText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {!loaded && <ActivityIndicator size={60} color="#0000ff" style={{ flex: 1 }} />}
      {loaded && <ScrollView style={{ backgroundColor: '#000' }} blurRadius={100}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />

        <View style={styles.carouselContentContainer}>
          <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#000' }}>
            <ImageBackground
              source={{ uri: background.uri }}
              style={styles.ImageBg}
              blurRadius={10}>
              <View style={styles.SearchboxContainer}>
                <Searchbar placeholder="Search Movies"
                  value={search}
                  onChangeText={setSearch}
                  onSubmitEditing={() => {
                    if (/^ *$/.test(search)) {
                      alert("emtyp")
                    }
                    else {
                      navigation.push("Results", {
                        Search: search.trim(),
                        Type: 'Movie'

                      })
                    }

                  }} />
              </View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  marginVertical: 10,
                }}>
                Trending This Weeks Fast Images
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
                  <TouchableOpacity style={styles.playIconContainer}
                    onPress={() => {
                      navigation.push("Details", {
                        MovieTitle: title
                      })
                    }}
                  >
                    <Icon
                      name="play"
                      size={22}
                      color="skyblue"
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
            {randomMovie.title}
          </Text>
          <Pressable
            onPress={() => {
              navigation.push("Details", {
                RandomMovie: randomMovie
              })
            }}
          >
            <ImageBackground

              style={{ height: 250, width: '100%', backgroundColor: '000' }}
              resizeMode="cover"
              source={{
                uri: "https://www.themoviedb.org/t/p/original" + randomMovie.poster_path,
              }}>
            </ImageBackground>
          </Pressable>

          {/* Popular Movies */}
          <List
            head="Popular Movies"
            data={popular}
            navigation={navigation}
          />


          {/*Top Rated  */}
          <List
            head="Top Rated"
            data={topRated}
            navigation={navigation}
          />

          {/*Action Movies  */}
          <List
            head="Action Movies"
            data={action}
            navigation={navigation}
          />

          {/*Comedy Movies  */}
          <List
            head="Comedy Movies"
            data={comedy}
            navigation={navigation}
          />

          {/*Adventure Movies  */}
          <List
            head="Adventure Movies"
            data={adventure}
            navigation={navigation}
          />

          {/*Animation Movies  */}
          <List
            head="Animation Movies"
            data={animation}
            navigation={navigation}
          />

          {/*Drama Movies  */}
          <List
            head="Drama Movies"
            data={drama}
            navigation={navigation}
          />

          <List
            head="Family Movies"
            data={family}
            navigation={navigation}
          />

          {/*Romantic Movies  */}
          <List
            head="Romantic Movies"
            data={romance}
            navigation={navigation}
          />

          {/*Horror Movies  */}
          <List
            head="Horror Movies"
            data={horror}
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

export default Home;
