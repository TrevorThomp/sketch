import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { AppState, Button, StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      strokeColor: Math.random() * 0xffffff,
      strokeWidth: Math.random() * 30 + 10,
      lines: [],
      appState: AppState.currentState,
    };
  }


  handleAppStateChangeAsync = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (this.sketch) {
        this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines });
        return;
      }
    }
    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeAsync);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChangeAsync);
  }

  onChangeAsync = async () => {
    const uri = await this.sketch.takeSnapshotAsync();

    this.setState({
      images: [...this.state.images, uri],
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

  saveImage = () => {
    console.log(this.state.images);
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
              initialLines={this.state.lines}
            />
            <View style={styles.label}>
              <Text>Canvas - draw here</Text>
            </View>
          </View>
        </View>
        <Button
          color={'blue'}
          title="undo"
          style={styles.button}
          onPress={() => {
            this.sketch.undo();
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
    height: '75%',
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

HomeScreen.navigationOptions = {
  header: null,
};

