import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../context/appContext';

export default function Gallery() {
  const appContext = React.useContext(AppContext);
  console.log('gallery',appContext.gallery[0]);
  let gallery = appContext.gallery[0].uri;
  console.log('gal[0]' ,gallery)
  return (
      <View>
        <Text>Hello</Text>
        <Image
          style={{width: 50, height: 100}}
          source={{uri: gallery}}
          />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
