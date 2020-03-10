import * as React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/appContext';

export default function Gallery() {
  const appContext = React.useContext(AppContext);
  let gallery = appContext.gallery;

  console.log('gallery', gallery[0].image.localUri);

  return (
      <View>
          <Image
          style={{width: 100, height: 200}}
          source={{uri: gallery[0].image.localUri}}
          />

        {/* <Text>Hello</Text> */}
        <FlatList
          style={styles.flatlist}
          data={appContext.gallery}
          renderItem={({item}) => {
            console.log('image', item.image.localUri);
              return (
              <Image style={styles.images} source={{uri: item.image.localUri}}/>
              )
          }}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>Nothing to Display</Text>}
          />
      </View>

  );
}

const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
  images: {
    width: 100, 
    height: 200, 
    borderColor: 'green', 
    borderWidth: 1,
  }
});
