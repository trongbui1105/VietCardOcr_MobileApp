import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
const Stack = createStackNavigator();


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={home}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="mhA"
            component={mhA}
            options={{ title: 'Căn cước công dân' }}
          />
          <Stack.Screen
            name="mhB"
            component={mhB}
            options={{ title: 'Giấy phép lái xe' }}
          />
          <Stack.Screen
            name="mhC"
            component={mhC}
            options={{ title: 'Thẻ sinh viên' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export const home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}> Trích xuất thông tin từ giấy tờ cá nhân</Text>
      <View style={styles.buttonlayout}>
        <Text style={styles.title}>Chọn loại giấy cần trích xuất</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('mhA')}>
          <LinearGradient
            colors={['seagreen', 'darkgreen', '#192f6a']}
            style={styles.linearGradient}>
            <Text style={styles.text}>CĂN CƯỚC CÔNG DÂN</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('mhB')}>
          <LinearGradient
            colors={['seagreen', 'darkgreen', '#192f6a']}
            style={styles.linearGradient}>
            <Text style={styles.text}>GIẤY PHÉP LÁI XE</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('mhC')}>
          <LinearGradient
            colors={['seagreen', 'darkgreen', '#192f6a']}
            style={styles.linearGradient}>
            <Text style={styles.text}>THẺ SINH VIÊN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const mhA = ({ navigation, route }) => {
  let [selectInfor, setSelectedInfor] = React.useState([]);
  let [image, setImage] = React.useState(null);


  let pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append('image', {
      uri: image,
      name: 'test.jpg',
      type: 'image/jpeg'
    });
    let url = "http://192.168.1.152:8000/api/id-card/";
    // let url = "http://127.0.0.1:8000/api/id-card/";
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          setSelectedInfor(res.data);
        })
        .catch(err => console.log(err)) 
  }


  return (
    <View style={styles.container}>
      <View style={styles.containerlayout}>
        {image !== null ? (
          <Image
            source={{ uri: image }}
            style={styles.thumbnail}
          />
        ) : (
          <Image
            source={require('./assets/idcard.png')}
            style={{ width: 200, height: 130 }}
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={pickImage}>
          <LinearGradient
            colors={['seagreen', 'darkgreen', '#192f6a']}
            style={styles.linearGradient}>
            <Text style={styles.text}>Upload File</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.form}>
          <Text style={styles.text2}>Thông tin trên căn cước công dân</Text>
          <View style={styles.row}>
            <Text style={{ marginRight: 45 }}>Số :</Text>
            <TextInput selectTextOnFocus={false} style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.id_card_number}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 20 }}>Họ tên :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
                value = {selectInfor.name}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 0 }}>Ngày sinh :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.dob}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 12 }}>Giới tính :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.sex}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 2 }}>Quốc tịch :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.nationality}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 2 }}>Quê quán :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.hometown}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 27 }}>ĐCTT :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.address}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 27 }}>Có giá trị đến :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 100,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.expires}
            />
          </View>
          <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}>
          <LinearGradient
            colors={['seagreen', 'darkgreen', '#192f6a']}
            style={styles.linearGradient}>
            <Text style={styles.text}>Trích xuất</Text>
          </LinearGradient>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const mhB = ({ navigation, route }) => {
  let infor = '';
  let [selectedImage, setSelectedImage] = React.useState(null);
  
  let handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  }

  let handleSubmit = (e) =>{
    e.preventDefault();
    console.log(selectedImage);
    let form_data = new FormData();
    form_data.append('image',selectedImage, selectedImage.name);
    let url = "http://127.0.0.1:8000/api/driving-license/";
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          infor = res.data;
        })
        .catch(err => console.log(err))
  }

  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit}>
      <View style={styles.containerlayout}>
        {selectedImage !== null ? (
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
        ) : (
          <Image
            source={require('./assets/idcard.png')}
            style={{ width: 200, height: 130 }}
          />
        )}
        <input type="file" id="image" accept="image/png ,image/jpeg" onChange={handleImageChange} required/>
        <View style={styles.form}>
          <Text style={styles.text2}>Thông tin trên giấy phép lái xe</Text>
          <View style={styles.row1}>
            <Text style={{ marginRight: 45 }}>Số :</Text>
            <TextInput
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 20 }}>Họ tên :</Text>
            <TextInput
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 5 }}>Ngày sinh:</Text>
            <TextInput
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 5 }}>Quốc tịch:</Text>
            <TextInput
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 5 }}>Nơi cư trú:</Text>
            <TextInput
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 28 }}>Hạng :</Text>
            <TextInput
              style={{
                height: 20,
                width: 150,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <input type="submit"/>
        </View>
      </View>
      </form>
    </View>
  );
};

const mhC = ({ navigation, route }) => {
  let infor = '';
  let [selectedImage, setSelectedImage] = React.useState(null);
  
  let handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  }

  let handleSubmit = (e) =>{
    e.preventDefault();
    console.log(selectedImage);
    let form_data = new FormData();
    form_data.append('image',selectedImage, selectedImage.name);
    let url = "http://127.0.0.1:8000/api/student-card/";
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
          infor = res.data;
          // const [value, onChangeText] = React.useState(infor.student_card_number);
        })
        .catch(err => console.log(err))
    }

    // console.log(infor.name);

  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit}>
      <View style={styles.containerlayout}>
        {selectedImage !== null ? (
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
        ) : (
          <Image
            source={require('./assets/idcard.png')}
            style={{ width: 200, height: 130 }}
          />
        )}
        <input type="file" id="image" accept="image/png ,image/jpeg" onChange={handleImageChange} required/>
        <View style={styles.form}>
          <Text style={styles.text2}>Thông tin trên thẻ sinh viên</Text>
          <View style={styles.row}>
            <Text style={{ marginRight: 15, fontWeight: '' }}>Trường :</Text>
            <TextInput
              style={{
                height: 20,
                width: 160,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 7 }}>Mã số sv :</Text>
            <TextInput
              style={{
                height: 20,
                width: 157,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 18 }}>Họ tên :</Text>
            <TextInput
              style={{
                height: 20,
                width: 160,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 18 }}>Ngành :</Text>
            <TextInput
              style={{
                height: 20,
                width: 158,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 2 }}>Khóa học :</Text>
            <TextInput
              style={{
                height: 20,
                width: 156,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
            />
          </View>
          <input type="submit"/>
        </View>
      </View>
      </form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0099FF',
    borderWidth: 8,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000000',
    marginBottom: 40,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  buttonlayout: {
    width: 280,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3366FF',
    borderRadius: 13,
    paddingTop: 20,
    paddingBottom: 25,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  button: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    color: 'white',
  },
  button1: {
    color: 'black',
    backgroundColor: 'white',
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 5,
    margin: 10,
    marginTop: 20,
  },
  linearGradient: {
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  text1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  text2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
    paddingTop: 10,
    paddingBottom: 10,
  },
  containerlayout: {
    flex: 1,
    backgroundColor: '#0066CC',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    width: '100%',
    opacity: 0.9,
    paddingTop: 20,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 400,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  row: {
    paddingTop: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
  },
  row1: {
    paddingTop: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  linearGradient1: {
    width: 120,
    marginTop: 10,
    height: 30,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
  },
  thumbnail: {
    width: 200,
    height: 130,
    resizeMode: 'contain',
  },
  button2: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    color: 'white',
  },
});


