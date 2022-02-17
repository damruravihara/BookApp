import { Button, ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import background from '../../Assets/BackGround.jpg'

export default function GoalDetails({route,navigation}){

    const [title, setChangeTitle] = React.useState("");
    const [type, setChangeType] = React.useState("");
    const [description, setChangeDescription] = React.useState("");
    const [price, setChangePrice] = React.useState("");
    const [date, setChangeDate] = React.useState("");
    const [author, setAuthor] = React.useState("");

    const userId = auth().currentUser?.uid
    const book = userId+"/"+title

    const { Title,Type,Description,Price,DueDate,Author } = route.params;

    useEffect(()=>{
        setChangeTitle(Title)
        setChangeType(Type)
        setChangeDescription(Description)
        setChangePrice(Price)
        setChangeDate(DueDate)
        setAuthor(Author)
    })

    const onCreate = async() =>{
        database()
        .ref('/book/'+book)
        .set({
            Title: title,
            Type: type,
            Description: description,
            Price: price,
            DueDate: date,
            Author: author,
            })
        .then(() => {
            ToastAndroid.show("Goal Completed", ToastAndroid.SHORT);
        });
        await database()
        .ref('/goal/'+book)
        .remove()
        .then(()=>{
            navigation.replace('AllGoals')
        }); 
      }

    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
            <ScrollView>   
         <View style={styles.goalDetailsWrapper}>

                <View style={styles.goalTextWrapper}>
          <Text style={styles.goalBookText}>Book: </Text><Text style={styles.goalText}>{title}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
          <Text style={styles.goalBookText}>Author: </Text><Text style={styles.goalText}>{author}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
          <Text style={styles.goalBookText}>Type: </Text><Text style={styles.goalText}>{type}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
          <Text style={styles.goalBookText}>Description: </Text><Text style={styles.goalText}>{description}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
          <Text style={styles.goalBookText}>Price: </Text><Text style={styles.goalText}>{price}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
          <Text style={styles.goalBookText}>Due Date: </Text><Text style={styles.goalText}>{date}</Text>
          <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
          </View>
          <View style={styles.buttonWrapper}>
          <Button title='FINISH' onPress={onCreate}/>
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
        borderRadius:17,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
        marginBottom:20
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