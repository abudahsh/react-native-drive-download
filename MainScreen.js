import React, { Component } from "react";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      videoCourseId: "hi8",
      currentVideoName: "hi",
      currentVideoFileName: ""
    };
  }

  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };
  storeItem = async (key, item) => {
    try {
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  };
  downloadVideoProgress = (id, percentage, progress, progressText) => {
    const param_id = `download_${this.state.videoCourseId}`;
    AsyncStorage.setItem(param_id, percentage);
    if (id === param_id) {
      this.setState({
        progress: progress,
        progressText: progressText,
        percentage: percentage
      });
    }
  };
  anotherHandler = () => {
    downloadVideo = () => {
      var videoURL =
        "https://docs.google.com/uc?id=1atjFOIyHd2P4hUI3IuEEe8o9QD779bsc&export=download"; // video link
      let dirs = RNFetchBlob.fs.dirs;
      const android = RNFetchBlob.android;
      let dirPath = dirs.DocumentDir + `/${this.state.videoCourseId}.mp4`;
      const id = `download_${this.state.videoCourseId}`;
      console.warn("downloading1");
      console.warn(dirPath);
      RNFetchBlob.fs
        .exists(dirPath)
        .then(exist => {
          this.clearTimer();
          if (exist) {
            alert("You have already downloaded this video.");
          } else {
            RNFetchBlob.config({
              fileCache: true,
              addAndroidDownloads: {
                useDownloadManager: true, // <-- this is the only thing required
                // Optional, override notification setting (default to true)
                notification: true,
                // Optional, but recommended since android DownloadManager will fail when
                // the url does not contains a file extension, by default the mime type will be text/plain
                mime: "text/plain",
                description: "File downloaded by download manager.",
                path: RNFetchBlob.fs.dirs.DownloadDir + "/hello.mp4"
              }
            })
              .fetch("GET", videoURL)
              .progress((received, total) => {
                const percentage = `${Math.floor((received / total) * 100)}`;
                const progress = Math.floor((received / total) * 100) / 100;
                const progressText = Math.floor((received / total) * 100) + "%";
                this.downloadVideoProgress(
                  id,
                  percentage,
                  progress,
                  progressText
                );
              })
              .then(res => {
                android.actionViewIntent(
                  res.path(),
                  "application/vnd.android.package-archive"
                );
                let KEY1 = "downloads";
                const keyVideo = `${this.state.currentVideoName}`;
                let ORIG = {};
                let DELTA = {
                  [keyVideo]: {
                    video_name: keyVideo,
                    video_url: res.path(),
                    videoCourseId: this.state.videoCourseId
                  }
                };
                console.warn("downloading2");
                AsyncStorage.getItem(KEY1, (err, result) => {
                  ORIG = JSON.parse(result);
                  console.log("orig", ORIG);
                  console.log(res.path());
                  if (ORIG !== null) {
                    AsyncStorage.setItem(KEY1, JSON.stringify(ORIG), () => {
                      AsyncStorage.mergeItem(
                        KEY1,
                        JSON.stringify(DELTA),
                        () => {
                          AsyncStorage.getItem(KEY1, (err, result) => {
                            console.log(
                              "KEY1 result of merged object: %O",
                              JSON.parse(result)
                            );
                          });
                        }
                      );
                    });
                  } else {
                    AsyncStorage.setItem(KEY1, JSON.stringify(DELTA), () => {});
                  }
                });
                console.warn("downloading3");
                AsyncStorage.removeItem(id);
                this.clearTimer();
                this.storeItem("downloadsList", "");
                this.setState({
                  progress: undefined,
                  progressText: "",
                  videoFileName: res.path()
                });
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    downloadVideo();
  };
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Video")}
        >
          <Text>Watch Video</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.anotherHandler}>
          <Text>Download </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MainScreen;
