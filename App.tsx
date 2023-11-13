import React from 'react';
import { View, Button, Platform, ToastAndroid } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';


export default function VideoCaptureScreen() {
  const [videoUri, setVideoUri] = React.useState(null);

  const handleCaptureVideo = async () => {
    try {
      const video = await ImageCropPicker.openCamera({
        mediaType: 'video',
        compressVideoPreset: 'MediumQuality', 
      });

      const uri = video.path;
      setVideoUri(uri);

      const destinationPath = '/storage/emulated/0/Movies/React Native/'; 

      const success = await RNFS.moveFile(uri, destinationPath + video.modificationDate + '.mp4');

      if (success) {
        ToastAndroid.show('Video saved to specified location', ToastAndroid.LONG);
      } else {
       
      }
    } catch (error) {
      console.error('VideoPicker Error: ', error);
    }
  };

  return (
    <View>
      {videoUri && (
        <Video source={{ uri: videoUri }} style={{ width: 300, height: 400 }} controls />
      )}
      <Button title="Capture Video" onPress={handleCaptureVideo} />
    </View>
  );
}

