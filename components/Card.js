import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const placeholderImage = require('../assets/placeholder.png');

const propTypes = {
    item: PropTypes.object,
};
class Card extends React.PureComponent {
    render() {
        const { navigation, item } = this.props;
        return (
            <>
                <View

                    style={styles.container}>
                    <FastImage

                        style={styles.image}
                        source={
                            item.poster_path
                                ? { uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path, priority: FastImage.priority.high }
                                : placeholderImage

                        }
                    />
                    {!item.poster_path && (
                        <Text style={styles.movieName}>{item.title}</Text>
                    )}

                </View>
                <Text style={{ color: "white", textAlign: "center", width: 120 }}>{item.title}</Text>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        alignItems: 'center',
        height: 200,
        marginBottom: 8,
    },
    image: {
        height: 200,
        width: 100,
        borderRadius: 20,
    },
    movieName: {
        position: 'absolute',
        width: 100,
        top: 10,
        textAlign: 'center',
    },
});

Card.propTypes = propTypes;

export default Card;
