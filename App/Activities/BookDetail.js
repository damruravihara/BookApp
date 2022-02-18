import { Button,Alert, ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import background from '../../Assets/BackGround.jpg'


export default function BookDetail({route,navigation}){

    const [title, setChangeTitle] = React.useState("");

    const userId = auth().currentUser?.uid
    const book = userId+"/"+title

    const { Title,Type,Description,Price,DueDate,Author } = route.params;

    useEffect(()=>{
        setChangeTitle(Title)
    })

    const onDelete = async() =>{
        await database()
        .ref('/book/'+book)
        .remove()
        .then(()=>{
            navigation.replace('AllBooks')
            ToastAndroid.show("Book is Deleted", ToastAndroid.SHORT);
        }); 
      }

      const twoOptionsAlertFunction = () => {
        //function to make two option alert
        Alert.alert(
           //This is title
          'Delete Book',
            //This is body text
          'Are You Sure?',
          [
            {text: 'Yes', onPress: () => onDelete()},
            {text: 'No', style: 'cancel'},
          ],
          { cancelable: true }
          //on clicking out side, Alert will not dismiss
        );
      }

    return (
        <View style={styles.container}>
        <ImageBackground source={background} resizeMode="cover" style={styles.image}>
        <ScrollView>   
     <View style={styles.goalDetailsWrapper}>

            <View style={styles.goalTextWrapper}>
      <Text style={styles.goalBookText}>Book: </Text><Text style={styles.goalText}>{Title}</Text>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
      <Text style={styles.goalBookText}>author: </Text><Text style={styles.goalText}>{Author}</Text>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
      <Text style={styles.goalBookText}>Type: </Text><Text style={styles.goalText}>{Type}</Text>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
      <Text style={styles.goalBookText}>Description: </Text><Text style={styles.goalText}>{Description}</Text>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
      <Text style={styles.goalBookText}>Price: </Text><Text style={styles.goalText}>{Price}</Text>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
      <Text style={styles.goalBookText}>Finished Read: </Text><Text style={styles.goalText}>{DueDate}</Text>
      <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
      </View>
      
      <View style={styles.buttonWrapper}>
        <View style={styles.deleteButtonWrapper}>
        <Button title='DELETE' color="#ff1744" onPress={twoOptionsAlertFunction}/>
        </View>
        <View style={styles.deleteButtonWrapper}>
      <Button title='UPDATE' color="#52b202" onPress={()=> navigation.replace('UpdateBooks', {name:{Title}})}/>
      </View>
      </View>
      </View>
      </ScrollView>
      <View style={styles.navigationWrapper}>
          <TouchableOpacity style={styles.navigationTouchWrapper} onPress={()=>navigation.replace('Home')}>
            <Text style={styles.navigationWrapperText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationTouchWrapper} onPress={()=>navigation.replace('AllBooks')}>
            <Text style={styles.navigationWrapperText}>My Books</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationTouchWrapper} onPress={()=>navigation.replace('AllGoals')}>
            <Text style={styles.navigationWrapperText}>My Goals</Text>
          </TouchableOpacity>
          </View> 
      </ImageBackground>
    </View>
      )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
      },
      image:{
        flex: 1,
        justifyContent: "center"
      },
      goalDetailsWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        marginBottom:10
      },
      goalBookText:{  
        marginLeft:8,
        marginBottom:8,
        marginRight:8,
        fontSize:18,
        fontWeight:'bold',
        color:'black',
        flexWrap:'wrap',
        fontFamily:'nunito'
      },
      goalTextWrapper:{
        borderRadius:5,
        marginLeft:10,
        marginTop:20,
        marginRight:10,
      },
      buttonWrapper:{
        justifyContent:'space-around',
        flexDirection:'row'
      },
      deleteButtonWrapper:{
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        marginBottom:20,
      },
      goalText:{
        marginLeft:8,
        marginBottom:8,
        marginRight:8,
        fontSize:20,
        fontWeight:'bold',
        color:"grey",
        flexWrap:'wrap',
        fontFamily:'nunito'
      },
      navigationWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-around',
        borderColor:'blue',
        borderWidth:5
      },
      navigationWrapperText:{
        fontSize:20,
        fontFamily:'nunito',
        fontWeight:'bold',
        color:'black',
        margin:5
      },
})