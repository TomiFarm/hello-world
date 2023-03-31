import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy, where, DocumentSnapshot} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
    const { userID, name, backgroundColor } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // set username to title
        navigation.setOptions({ title: name });
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                });
            });
            setMessages(newMessages);
        });

        // clean up code
        return () => {
            if(unsubMessages) unsubMessages();
        };

        // setMessages([
        //     {
        //         _id: 1,
        //         text: 'hello dev',
        //         createdAt: new Date(),
        //         user: {
        //             _id:2,
        //             name: 'React Native',
        //             avatar: 'https://placeimg.com/140/140/any'
        //         }
        //     },
        //     {
        //         _id: 2,
        //         text: 'You have entered the chat',
        //         createdAt: new Date(),
        //         system: true
        //     }
        // ]);
    }, []);

    const addMessage = async (newMessage) => {
        const newMessageRef = await addDoc(collection(db, 'messages'), newMessage);
        if(newMessageRef.id){
            setMessages([newMessage, ...messages]);
        }else{
            Alert.alert('Unable to send message, try again later');
        }
    }

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
    }

    return (
        // <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        //     <Text>Hello Screen2!</Text>
        // </View>
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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