import * as React from 'react';
import { FlatList, Image, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AppContext } from '../context/appContext';

export default function Gallery() {
  const appContext = React.useContext(AppContext);
  let gallery = appContext.gallery;

  console.log('gallery', gallery[0].image.localUri);

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={appContext.gallery}
          renderItem={({item}) => <Image style={styles.images} source={{uri: item.image.uri}}/>}
          keyExtractor={item => item.id}  
          ListEmptyComponent={<Text>Nothing to Display</Text>}
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
    width: 200, 
    height: 200, 
    borderColor: 'green', 
    borderWidth: 1,
    marginBottom: 10
  }
});
