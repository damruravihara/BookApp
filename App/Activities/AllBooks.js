import { Button, ImageBackground, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';
import background from '../../Assets/BackGround.jpg'
import empty from '../../Assets/empty.png'



export default function AllBooks({navigation}){
    const userId = auth().currentUser?.uid

    const [data, setData] = React.useState([]);
    const [searchTerm, setsearchTerm] = React.useState("");
  
    useEffect(() => {
      const onValueChange = database()
        .ref(`/book/${userId}`)
        .on('value', snapshot => {
            if(snapshot.val() != null){
                let responselist = Object.values(snapshot.val())
                setData(responselist) 
              }
            });
  
      // Stop listening for updates when no longer required
      return () => database().ref(`/book/${userId}`).off('value', onValueChange);
    }, [userId]);
    return (
        <View style={styles.container}>
        <ImageBackground source={background} resizeMode="cover" style={styles.image}>
         <View style={styles.allGoalWrapper}>
         <View style={styles.goalTitleWrapper}>
      <Text style={styles.goalTitle}>MY BOOKS</Text>
          </View> 
        <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/> 
               
        <View style={styles.searchWrapper}>
        <TextInput style={styles.input} placeholder="Search" onChangeText={(text) => setsearchTerm(text)}/>
            </View> 
            </View>   
        <ScrollView>
          <View style={styles.goalTextWrapper1}>
          {data.length === 0?<View style={styles.imageWrapper}><ImageBackground source={empty} resizeMode='center' style={styles.image2}></ImageBackground></View>:
          <View>
            {data.filter(val=>{
                if(searchTerm === ''){
                    return val;
                }else if(
                    val.Title.toLowerCase().includes(searchTerm.toLowerCase())||
                    val.Type.toLowerCase().includes(searchTerm.toLowerCase())
                ){
                    return val;
                }
            }).map((data,key)=>(
                <TouchableOpacity key={key} onPress={() => navigation.replace('BookDetail', data)}>
                <View style={styles.goalTextWrapper} >
                        <Text style={styles.goalBookTitle}>{data.Title}</Text>
                        <Text style={styles.goalBookText}>Author: {data.Author}</Text>
                </View>
                
                </TouchableOpacity>
            ))}</View>}
            
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
    input:{
        height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        fontSize:20,
        fontWeight:"500"
      },
      container:{
        flex:1,

      },
      image:{
        flex: 1,
        justifyContent:'space-between',
        flexDirection:'column'
      },
      allGoalWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        marginTop:15,
        marginLeft:5,
        marginRight:5,
        marginBottom:10,
      },
      goalTextWrapper:{
        borderRadius:15,
        borderColor:'#DCE0DF',
        backgroundColor:'#DCE0DF',
        borderWidth:3,
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        marginBottom:5,
      },
      goalTextWrapper1:{
        borderRadius:15,
        backgroundColor:'white',
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        marginBottom:5,
      },
      goalBookText:{  
        marginLeft:8,
        marginBottom:8,
        marginRight:8,
        fontSize:18,
        fontWeight:'500',
        color:'black',
        flexWrap:'wrap',
        fontFamily:'nunito'
      },
      goalTitle:{
        fontSize:30,
        fontWeight:"bold",
        color:"black",
        fontFamily:'nunito'
      },
      goalTitleWrapper:{
        alignItems:'center',
        flexDirection:'row',
        margin:10,
        justifyContent:'space-around'
      },
      goalBookTitle:{
        marginLeft:8,
        marginBottom:8,
        marginRight:8,
        fontSize:25,
        fontWeight:'bold',
        color:'black',
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
      image2:{
        height:200,
        width:200,
        
      },
      imageWrapper:{
        alignSelf:'center',
        margin:20
      },
})