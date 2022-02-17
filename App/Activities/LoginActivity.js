import { Button, StyleSheet, Text, View, TextInput, ToastAndroid, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import background from '../../Assets/BackGround.jpg'
// import firebase from "@react-native-firebase/app";



const LoginActivity = () => {

  const [username, onChangeText] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const navigation = useNavigation()

  useEffect(()=>{
    const unsubscribe = auth().onAuthStateChanged(user=>{
      if(user){
        navigation.replace("Home")
      }
    })
    return unsubscribe
  },[])

  const LoginHandler = () => {
    if(username === ""){
      ToastAndroid.show("please fill email", ToastAndroid.SHORT);      
    }
    else if(password === ""){
      ToastAndroid.show("please enter password", ToastAndroid.SHORT); 
    }
    else{
      auth()
      .signInWithEmailAndPassword(username, password)
      .then(()=>{
        ToastAndroid.show("Success", ToastAndroid.SHORT);
      })
      .catch(error=>{
        ToastAndroid.show("InCorrect Email or Password", ToastAndroid.LONG); 
      })
    }
  }




  return (
    <View style={styles.container}>
    <ImageBackground source={background} resizeMode="cover" style={styles.image}>
    <View style={styles.loginWrapper}>
    <View style={styles.loginTextWrapper}>
      <Text style={styles.loginText}>LOGIN</Text>
      </View>
      <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => onChangeText(text)}/>
      <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onChangeText={(text) =>onChangePassword(text)}/>
      
      <View style={styles.loginButtonWrapper}>
      <Button title="LOGIN" onPress={LoginHandler} style={styles.loginButton} />
      
        </View>
        <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
        <View style={styles.registerWrapper}>
                <Text style={styles.registerText}>Create New Account</Text>
                
        <View style={styles.registerButtonWrapper}>
        <Button title="REGISTER" color='#689f38' onPress={()=>navigation.replace('Register')} style={styles.registerButton} />
        </View>
        </View>

    </View>
    </ImageBackground>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
  },
  image:{
    flex: 1,
    justifyContent: "center"
  },
  loginWrapper:{
    backgroundColor:'white',
    borderRadius:17,
    marginLeft:15,
    marginRight:15,
    
  },
  input:{
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    fontSize:20,
    fontWeight:"500"
  },
  loginButtonWrapper:{
    borderRadius:17,
    marginTop:20,
    marginLeft:15,
    marginRight:15,
    marginBottom:15,
  },
  registerButtonWrapper:{
    borderRadius:17,
    marginTop:20,
    marginLeft:15,
    marginRight:15,
    marginBottom:20
  },
  loginTextWrapper:{
    marginTop:20,
    marginLeft:15,
    marginRight:15,
    marginBottom:10,
    alignItems:"center"
  },
  loginText:{
        fontSize:30,
        fontWeight:"600",
        color:"black"
  },
  registerWrapper:{
    backgroundColor:'white',
    borderRadius:17,
    alignItems:'center',
    margin:10,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  registerText:{
    fontSize:20,
    fontWeight:"600",
    color:"black",
    flexWrap:'wrap'
  },
})

export default LoginActivity;

