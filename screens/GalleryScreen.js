import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppContext } from '../context/appContext';

export default function Gallery() {
  const appContext = React.useContext(AppContext);
  console.log(appContext.gallery[0]);
  return (

      <View>
        <Image
          source={{uri: appContext.gallery[0].uri}}
        />
        {/* <FlatList
          data={appContext.gallery}
          renderItem={(item) => (
            <Image
              source={{uri: item.uri}}
              />
          )}
          /> */}
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
