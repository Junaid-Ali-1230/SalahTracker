// CommonBackground.js
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const CommonBackground = ({ children }) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1 }}>
                    <LinearGradient colors={['#500000', '#000045']} style={styles.gradientBackground}>
                        {children}
                    </LinearGradient>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: 40,
    },
    scrollContainer: {
        flexGrow: 1,
    },
});

export default CommonBackground;
