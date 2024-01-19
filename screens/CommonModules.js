// CommonBackground.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Image, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DropdownMenu from './DropdownMenu';





const CommonModules = ({ children }) => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleHamburgerMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    return (



        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* Moon Logo at Top Left */}
            <Image source={require('../assets/chand.png')} style={styles.moonLogo} />

            {/* Hamburger Sign at Top Right */}
            <TouchableOpacity onPress={toggleHamburgerMenu}>
                <Ionicons name="menu" size={30} color="white" style={styles.hamburgerIcon} />
            </TouchableOpacity>

            <Modal
                visible={isMenuVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={closeMenu}
            >
                <TouchableWithoutFeedback onPress={closeMenu}>
                    <View style={{ flex: 1 }}>

                        <DropdownMenu onClose={closeMenu} />

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
        width: '100%',
        paddingTop: 40,
    },
    header: {
        height: 100,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    moonLogo: {
        width: 80,
        height: 80,
    },
    hamburgerIcon: {
        marginRight: 10,
        marginTop: 10,
    },
    header: {
        height: 100,
    },
});

export default CommonModules;
