import * as MediaLibrary from 'expo-media-library';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../context/appContext';

export default class HomeScreen extends Component {
  static contextType = AppContext;
  constructor(props){
    super(props);
    this.state = {
      currentImage: null,
      strokeColor: Math.random() * 0xffffff,
      strokeWidth: Math.random() * 30 + 10,
      lines: [],
    };
  }

  componentDidMount() {
    MediaLibrary.requestPermissionsAsync();
  }

  onChangeAsync = async () => {
    const image = {
      id: uuidv4(),
      image: await this.sketch.takeSnapshotAsync()
    }

    this.setState({
      currentImage:  image,
      strokeWidth: Math.random() * 30 + 10,
      strokeColor: Math.random() * 0xffffff,
    });
  };

  onReady = () => {
    console.log('ready!');
  };

  clear = () => {
    if (this.sketch.stage.children.length > 0) {
      this.sketch.stage.removeChildren();
      this.sketch.renderer._update();
    }
  }

  saveImage = async () => {
    const asset = await MediaLibrary.createAssetAsync(this.state.currentImage.image.localUri);
    await this.context.setGallery([...this.context.gallery, asset]);
    this.clear();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.sketchContainer}>
            <ExpoPixi.Sketch
              ref={ref => (this.sketch = ref)}
              style={styles.sketch}
              strokeColor={this.state.strokeColor}
              strokeWidth={this.state.strokeWidth}
              strokeAlpha={1}
              onChange={this.onChangeAsync}
              onReady={this.onReady}
            />
            <View style={styles.label}>
              <Text>Canvas - draw here</Text>
            </View>
          </View>
        </View>
        <Button
          color={'blue'}
          title="clear"
          style={styles.button}
          onPress={() => {
            this.clear();
          }}
        />
        <Button
          color={'orange'}
          title="save"
          style={styles.button}
          onPress={this.saveImage}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketch: {
    flex: 1,
  },
  sketchContainer: {
    height: '95%',
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    height: '50%',
    borderTopWidth: 4,
    borderTopColor: '#E44262',
  },
  label: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: 12,
    width: '100%',
    minHeight: 48,
  },
});

// export default function HomeScreen(){
//   return(
//     <View style={styles.container}>
//       <HomeScreenClass/>
//     </View>
//   )
// }

HomeScreen.navigationOptions = {
  header: null,
};

