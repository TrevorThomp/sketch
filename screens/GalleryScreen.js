import * as SMS from 'expo-sms';
import React, { useState } from 'react';
import { Alert, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { AppContext } from '../context/appContext';

export default function Gallery() {
  const [telNumber, setTelNumber] = useState();
  const appContext = React.useContext(AppContext);

  const buttonPress = () => {
    if(!telNumber){
      Alert.alert('Error!', 'No phone number was entered', [{text: 'OK'}])
    }
    SMS.sendSMSAsync(telNumber, 'Have a sketch!')
  }

  function Item({item}) {
    return (
      <SafeAreaView>
        <Image style={styles.images} source={{uri: item.uri}}/>
        <Button title='Send Image' onPress={() => buttonPress()}/>
      </SafeAreaView> 
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <Text>Enter a phone number and click an image to send!</Text>
        <TextInput 
          style={styles.input}
          onChangeText={text => setTelNumber(text)}
          keyboardType='phone-pad'
          placeholder='555-555-5555'
          textContentType='telephoneNumber'
          />
        <FlatList
          data={appContext.gallery}
          renderItem={({item}) => <Item item={item}/>}
          keyExtractor={item => item.id}  
          ListEmptyComponent={() => <Text style={styles.emptyMessage}>Nothing to Display</Text>}
          />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  images: {
    width: 300, 
    height: 250, 
    borderColor: 'green', 
    borderWidth: 1,
    marginTop: 10
  },
  emptyMessage: {
    marginTop: 100,
    textAlignVertical: "center",
  },
  input: {
    height: 50,
    width: 150,
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 25,
    marginBottom: 25,
    textAlign: 'center',
  }
});
