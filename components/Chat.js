import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy, where, DocumentSnapshot} from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
    const { userID, name, backgroundColor } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // set username to title
        navigation.setOptions({ title: name });
    }, []);

    let unsubMessages;

    useEffect(() => {
        if (isConnected === true){

            // unregister current onSnapshot() listener to avoid registering multiple listeners
            if(unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    });
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

        // clean up code
        return () => {
            if(unsubMessages) unsubMessages();
        };
    }, []);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };

    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    };

    const onSend = async (newMessages) => {
        const newMessagesRef = await addDoc(collection(db, 'messages'), newMessages[0]);
        if(newMessagesRef.id){
            setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
        }else{
            Alert.alert('Unable to send message, try again later');
        }
    };

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#000'
                },
                left: {
                    backgroundColor: '#FFF'
                }
            }}
        />
    };

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Chat;