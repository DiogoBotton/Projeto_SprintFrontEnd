/* eslint-disable prettier/prettier */
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Text, View, StyleSheet, Image } from 'react-native';

// Components
import Container from '../../components/Container/index';

const Home = () => {
    return (
        <Container>

            <View style={styles.sectionContainer}>

                <Text style={styles.sectionTitle}>Monte sua coletânea de filmes...</Text>

                <View>
                    <Text style={styles.sectionDescription}>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor</Text>

                    <Text style={styles.sectionDescription}>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut eiusmod tempor incididunt ut labore  aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit. </Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <Image
                        source={require('../../assets/images/cinema.png')}
                        style={styles.img}
                    />
                    <Text style={styles.sectionTitle}>Filmes</Text>
                    <Text style={styles.sectionDescription}>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut eiusmod tempor incididunt ut labore  aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit. </Text>
                </View>

                <View style={styles.descriptionContainer}>
                    <Image 
                        source={require('../../assets/images/theater.png')} 
                        style={styles.img}
                        />
                    <Text style={styles.sectionTitle}>Categoria</Text>
                    <Text style={styles.sectionDescription}>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut eiusmod tempor incididunt ut labore  aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit. </Text>
                </View>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
    },
    descriptionContainer: {
        alignItems: 'center',
    },
    img: {
        width: 120,
        height: 120,
        margin: 30,
    },
    sectionContainer: {
        marginTop: 32,
        marginBottom: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
});

export default Home;
