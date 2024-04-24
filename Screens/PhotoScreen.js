import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const PhotoScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  const handleChoosePhoto = async () => {
    try {
      const image = await pickImage();
      // console.log(image);
      if (image) {
        await uploadImage(image);
      }
    } catch (error) {
      console.error('Error choosing photo: ', error);
    }
  };

  const pickImage = async () => {
    var res = null;
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };
    await launchImageLibrary(options, async (response) => {
      // console.log(response.assets)
      if (response?.assets) {
        res = response?.assets;
      }

    });
    return res;
  };
  const opencamera = async () => {
    try {
      const image = await ClickImage();
      // console.log(image);
      if (image) {
        await uploadImage(image);
      }
    } catch (error) {
      console.error('Error choosing photo: ', error);
    }
  };

  const ClickImage = async () => {
    var res = null;
    const options = {
      mediaType: 'photo',
      quality: 0.5,
    };
    await launchCamera(options, async (response) => {
      // console.log(response.assets)
      if (response?.assets) {
        res = response?.assets;
      }

    });
    return res;
  };

  const uploadImage = async (data) => {
    // console.log('000000',data);
    try {
      console.log(data[0].fileName, data[0].uri);
      const reference = storage().ref(data[0].fileName);
      // // path to existing file on filesystem
      const pathToFile = data[0].uri;
      // // // uploads file
      await reference.putFile(pathToFile);


      const downloadURL = await reference.getDownloadURL();
      console.log(downloadURL);
      setImageUri(downloadURL);
      saveImageUrlToFirestore(downloadURL);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  const saveImageUrlToFirestore = async (imageUrl) => {
    try {
      await firestore().collection('photos').add({
        imageUrl,
        createdAt: firestore.Timestamp.now(),
      });
      console.log('Image URL saved to Firestore');
    } catch (error) {
      console.error('Error saving image URL to Firestore: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photo Screen</Text>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text>No photo selected</Text>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <View style={{marginTop:20}}>
        <Button title="Open Camera" onPress={opencamera} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default PhotoScreen