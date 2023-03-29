import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform  } from "react-native";
import { useState } from "react";

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [backgroundColor, setbackgroundColor] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/backgroundImage.png')} style={styles.backgroundImage} resizeMode='cover'>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Chat App</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <View style={styles.inputContainer}>
                        <View style={styles.innerInputContainer}>
                            <TextInput
                                style={styles.textInput}
                                value={name}
                                onChangeText={setName}
                                placeholder='Type your username here'
                            />
                        </View>
                        <View style={styles.innerInputContainer}>
                            <Text>Choose Background Color:</Text>
                            <View style={styles.chooseColorContainer}>
                                <TouchableOpacity style={[styles.colorButton, styles.colorOption1]} onPress={() => setbackgroundColor(styles.colorOption1.backgroundColor)}></TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, styles.colorOption2]} onPress={() => setbackgroundColor(styles.colorOption2.backgroundColor)}></TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, styles.colorOption3]} onPress={() => setbackgroundColor(styles.colorOption3.backgroundColor)}></TouchableOpacity>
                                <TouchableOpacity style={[styles.colorButton, styles.colorOption4]} onPress={() => setbackgroundColor(styles.colorOption4.backgroundColor)}></TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.innerInputContainer}>
                            <TouchableOpacity
                                style={styles.chatButton}
                                title='Go to Screen2'
                                onPress={() => navigation.navigate('Chat', {name: name, backgroundColor: backgroundColor})}
                            >
                                <Text style={styles.chatButtonText}>To chat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        flex: 1
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF'
    },
    lowerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    inputContainer: {
        height: '88%',
        width: '88%',
        backgroundColor: '#FFFFFF',
        borderRadius: 25
    },
    innerInputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '88%',
        height: 50,
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1
    },
    chooseColorContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    colorButton: {
        height: 50,
        width: 50,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    colorOption1: {
        backgroundColor: '#090C08'
    },
    colorOption2: {
        backgroundColor: '#474056'
    },
    colorOption3: {
        backgroundColor: '#8A95A5'
    },
    colorOption4: {
        backgroundColor: '#B9C6AE'
    },
    chatButton: {
        width: '88%',
        height: 60,
        backgroundColor: '#757083',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    chatButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF'
    },


});

export default Start;