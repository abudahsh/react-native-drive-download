import React, { Component } from "react";
import { View, Text } from "react-native";
import YouTube from "react-native-youtube";

class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/*
        <VideoPlayer
          source={{
            uri: "https://www.youtube.com/embed/A6H5Xx2nFvM"
          }}
          navigator={this.props.navigator}
        />
         
        
*/}
        <View>
          <YouTube
            videoId="64QhHFSMNV4" // The YouTube video ID
            controls={2}
            apiKey="AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw"
            play={true} // control playback of video with true/false
            fullscreen={true} // control whether the video should play in fullscreen or inline
            loop={true} // control whether the video should loop when ended
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{
              alignSelf: "stretch",
              height: 300,
              position: "absolute",
              top: 0,
              left: 0,
              right: 0
            }}
          />
        </View>

        {/*
      <WebView
                style={{ width: sWidth, height: sHeight }}
                javaScriptEnabled={true}
                ref={ref => {
                  this.videoPlayer = ref;
                }}
                scalesPageToFit={true}
                source={{
                  html:
                    '<video controls><source src="https://drive.google.com/uc?export=download&id=1BDTWLukNOsO2Gj-UgLcr8AYFWK7tixNE" type="video/mp4" width="100%" height="50%" /></video>'
                }}
              />
      */}
      </View>
    );
  }
}

export default VideoScreen;
