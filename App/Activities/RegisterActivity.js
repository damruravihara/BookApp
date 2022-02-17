import { Button, StyleSheet, Text, View, TextInput, ToastAndroid, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth'
import background from '../../Assets/BackGround.jpg'
import database from '@react-native-firebase/database';

export default function RegisterActivity(){

    const [name, onChangeName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
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

    const User = () => {
        if(name === ""){
            ToastAndroid.show("Enter Your Name", ToastAndroid.SHORT);
        }
        else if(email === ""){
            ToastAndroid.show("Enter Your Email", ToastAndroid.SHORT);
        }
        else if(password === ""){
            ToastAndroid.show("Enter Your Password", ToastAndroid.SHORT);
        }
        else{
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const userId = auth().currentUser?.uid
            
                  database()
                  .ref('/users/'+userId)
                  .set({
                      Name: name,
                      Email: email,
                      })
                  .then(() => {
                    ToastAndroid.show("User account created & signed in!", ToastAndroid.SHORT);
                  });         
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                ToastAndroid.show("Email address is already in use!", ToastAndroid.LONG);
              }
          
              if (error.code === 'auth/invalid-email') {
                ToastAndroid.show("That email address is invalid!", ToastAndroid.LONG);
              }
            });
        }
      }

    return(
        <View style={styles.container}>
        <ImageBackground source={background} resizeMode="cover" style={styles.image}>
            <View style={styles.registerWrapper}>
            <View style={styles.loginWrapper}>
                <Text style={styles.loginText}>Already Have Account</Text>
                    <View style={styles.buttonLoginWrapper}>
                    <Button title='LOGIN' onPress={()=>navigation.replace('Login')} style={styles.buttonLogin}/>
                    </View>
                </View>
                <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
                <View style={styles.registerTextWrapper}>
                    <Text style={styles.registerText}>REGISTER</Text>
                </View>
                <View style={styles.registerInputWrapper}>
                    <TextInput style={styles.input} placeholder="Full Name" onChangeText={(text) => onChangeName(text)}/>  
                    <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => onChangeEmail(text)}/>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" onChangeText={(text) =>onChangePassword(text)}/>
                </View>
                <View style={styles.registerButtonWrapper}>
                    <Button title='REGISTER' color="#689f38" onPress={User}/>
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
      registerWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        marginLeft:10,
        marginRight:10,
      },
      input:{
        height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        fontSize:20,
        fontWeight:"500"
      },
      registerTextWrapper:{
        marginTop:20,
        marginLeft:15,
        marginRight:15,
        marginBottom:10,
        alignItems:"center"
      },
      registerText:{
            fontSize:30,
            fontWeight:"600",
            color:"black"
      },
      registerButtonWrapper:{
        marginTop:10,
        marginLeft:15,
        marginRight:15,
        marginBottom:20
      },
      loginWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        alignItems:'center',
        margin:10,
        flexDirection:'row',
        justifyContent:'space-around'
      },
      buttonLoginWrapper:{
        margin:5,
        borderRadius:17
      },
      loginText:{
        fontSize:20,
        fontWeight:"600",
        color:"black",
        flexWrap:'wrap'
      },
})