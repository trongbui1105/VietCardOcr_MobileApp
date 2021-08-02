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
    let url = "http://192.168.1.153:8000/api/id-card/"; // get ip address of current device
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
            <Text style={{ marginRight: 65 }}>Số :</Text>
            <TextInput selectTextOnFocus={false} style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.id_card_number}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 40 }}>Họ tên :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
                value = {selectInfor.name}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 20 }}>Ngày sinh :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.dob}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 30 }}>Giới tính :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.sex}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 22 }}>Quốc tịch :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.nationality}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 20 }}>Quê quán :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.hometown}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 40 }}>ĐCTT :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.address}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 7 }}>Có giá trị đến :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 180,
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
    let url = "http://192.168.1.153:8000/api/driving-license/"; // get ip address of current device
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
          <Text style={styles.text2}>Thông tin trên giấy phép lái xe</Text>
          <View style={styles.row1}>
            <Text style={{ marginRight: 55 }}>Số :</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.driving_license_number}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 30 }}>Họ tên :</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.name}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 15 }}>Ngày sinh:</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.dob}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 15 }}>Quốc tịch:</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.nationality}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 15 }}>Nơi cư trú:</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.address}
            />
          </View>
          <View style={styles.row1}>
            <Text style={{ marginRight: 35 }}>Hạng :</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.card_class}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 7 }}>Có giá trị đến :</Text>
            <TextInput selectTextOnFocus={false}
              style={{
                height: 20,
                width: 180,
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

const mhC = ({ navigation, route }) => {
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
    let url = "http://192.168.1.153:8000/api/student-card/"; // get ip address of current device
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
        {image != null ? (
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
          <Text style={styles.text2}>Thông tin trên thẻ sinh viên</Text>
          <View style={styles.row}>
            <Text style={{ marginRight: 25 }}>Trường :</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.student_card_number}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 17 }}>Mã số sv :</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.name}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 32 }}>Họ tên :</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.major}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 29 }}>Ngành :</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.falculty}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ marginRight: 14 }}>Khóa học :</Text>
            <TextInput  selectTextOnFocus={false}
              style={{
                height: 20,
                width: 200,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#D3D3D3',
              }}
              value = {selectInfor.course}
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
    width: 600,
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
 
});


