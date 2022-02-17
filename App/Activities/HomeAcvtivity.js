import { Button,Alert, FlatList, ImageBackground, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import auth from '@react-native-firebase/auth'
// import { useNavigation } from '@react-navigation/native'
import database from '@react-native-firebase/database';
import background from '../../Assets/BackGround.jpg'
import empty from '../../Assets/empty.png'
import work from '../../Assets/work.png'


export default function HomeAcvtivity({ navigation }) {
  // const navigation = useNavigation()
  const userId = auth().currentUser?.uid

  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState([]);
  const [book, setBook] = React.useState([]);
  const [countbook, setCountBook] = React.useState([]);

  // Get Only 2 goals
  useEffect(() => {
    const onValueChange = database()
      .ref(`/goal/${userId}`)
      .limitToFirst(2)
      .on('value', snapshot => {
        if(snapshot.val() != null){
          let responselist = Object.values(snapshot.val())
          setData(responselist) 
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/goal/${userId}`).off('value', onValueChange);
  }, [userId]);

  // Get Only 2 Books
  useEffect(() => {
    const onValueChange = database()
      .ref(`/book/${userId}`)
      .limitToLast(2)
      .on('value', snapshot => {
        if(snapshot.val() != null){
          let list = Object.values(snapshot.val())
          setBook(list) 
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/book/${userId}`).off('value', onValueChange);
  }, [userId]);

  //Get Goals Count
  useEffect(() => {
    const onCountChange = database()
      .ref(`/goal/${userId}`)
      .on('value', snapshot => {
        if(snapshot.val() != null){
          let responselist = Object.values(snapshot.val())
          setCount(responselist) 
        }
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/goal/${userId}`).off('value', onCountChange);
  }, [userId]);

    //Get Books Count
    useEffect(() => {
      const onValueChange = database()
        .ref(`/book/${userId}`)
        .on('value', snapshot => {
          if(snapshot.val() != null){
            let list = Object.values(snapshot.val())
            setCountBook(list) 
          }
        });
  
      // Stop listening for updates when no longer required
      return () => database().ref(`/book/${userId}`).off('value', onValueChange);
    }, [userId]);

  const logout = () =>{
    auth()
    .signOut()
    .then(()=>{
      navigation.replace("Login")
    })
  }

  

  const createGoal = () =>{
    navigation.replace("Goal")
  }

  const twoOptionsAlertFunction = () => {
    //function to make two option alert
    Alert.alert(
       //This is title
      'Logout',
        //This is body text
      'Are You Sure?',
      [
        {text: 'Yes', onPress: () => logout()},
        {text: 'No', style: 'cancel'},
      ],
      { cancelable: true }
      //on clicking out side, Alert will not dismiss
    );
  }

  return (
<View style={styles.container}>
<ImageBackground source={background} resizeMode="cover" style={styles.image}>
 
  <View style={styles.logoutWrapper}>
  <Text style={styles.emailText}>{auth().currentUser?.email}</Text>
  <View style={styles.buttonLogoutWrapper}>
  <Button title='LOGOUT' color="#ff1744" style={styles.buttonLogout} onPress={twoOptionsAlertFunction}/>
  </View>
  </View>
  <ScrollView>
      {/*Goals*/}
      <View style={styles.goalWrapper}>
      <View style={styles.goalTitleWrapper}>
        <TouchableOpacity onPress={()=>navigation.replace('AllGoals')}>
      <Text style={styles.goalTitle}>MY GOALS</Text>
      </TouchableOpacity>
        <View style={styles.buttonWrapper}>
        <Button title="ADD NEW GOAL" color="#52b202" onPress={createGoal} style={styles.goalButton} />
        </View>
          </View> 
        <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
        {count.length === 0?<View style={styles.imageWrapper}><ImageBackground source={empty} resizeMode='center' style={styles.image2}></ImageBackground></View>:
        <View style={styles.goalTextWrapper1}>
        {data.map((data,key)=>(
          <TouchableOpacity key={key}  onPress={() => navigation.replace('GoalDetails', data)}>
          <View style={styles.goalListWrapper}>
          <Text style={styles.goalBookTitle}>{data.Title}</Text>
          <Text style={styles.goalBookText}>Set Goal To: {data.DueDate}</Text>
          </View>
        </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => navigation.replace('AllGoals')}>
          <View style={styles.seeAllWrapper}>
            <Text style={styles.seeAllText}>See All ({count.length})</Text>
          </View>
        </TouchableOpacity>
        </View>

        }
      </View>
      {/*Goals*/}
      {/*books View*/}
      <View style={styles.bookWrapper}>
      <View style={styles.goalTitleWrapper}>
        <TouchableOpacity onPress={()=>navigation.replace('AllBooks')}>
      <Text style={styles.goalTitle}>MY BOOKS</Text>
      </TouchableOpacity>
          </View> 
        <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
        {countbook.length === 0?<View style={styles.imageWrapper}><ImageBackground source={empty} resizeMode='center' style={styles.image2}></ImageBackground></View>:
        <View style={styles.goalTextWrapper1}>
        {book.map((book,key)=>(
          <TouchableOpacity key={key}  onPress={() => navigation.replace('BookDetail', book)}>
          <View style={styles.goalListWrapper}>
          <Text style={styles.goalBookTitle}>{book.Title}</Text>
          <Text style={styles.goalBookText}>Author: {book.Author}</Text>
          </View>
        </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => navigation.replace('AllBooks')}>
          <View style={styles.seeAllWrapper}>
            <Text style={styles.seeAllText}>See All ({countbook.length})</Text>
          </View>
        </TouchableOpacity>
        </View>

        }
      </View>
      {/*books View*/}
      <View style={styles.graphWrapper}>
      <Text style={styles.graphtext}>Graph</Text>
      <View style={styles.imageWrapper}>
      <ImageBackground source={work} resizeMode='center' style={styles.image2}></ImageBackground>
      </View>
      </View>
      </ScrollView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#CBC8C8',
        flex:1,
      },
      image:{
        flex: 1,
      },
      image2:{
        height:100,
        width:100,
        
      },
      imageWrapper:{
        alignSelf:'center',
        margin:20
      },
      graphWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        alignItems:'center',
        marginTop:10,
        marginLeft:15,
        marginRight:15,
        marginBottom:15
      },
      graphtext:{
        fontSize:30,
        fontWeight:"bold",
        color:"black",
        fontFamily:'nunito'
      },
      goalWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
      },
      bookWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
        marginBottom:15
      },
    goalButton:{
      borderRadius:30
    },
    buttonWrapper:{
      borderRadius:30,
      margin:20
    },
    goalListWrapper:{
      borderRadius:15,
      borderColor:'#DCE0DF',
      backgroundColor:'#DCE0DF',
      borderWidth:3,
      marginLeft:10,
      marginRight:10,
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
    logoutWrapper:{
      backgroundColor:'white',
      borderRadius:17,
      alignItems:'center',
      marginTop:15,
      marginLeft:15,
      marginRight:15,
      marginBottom:10,
      flexDirection:'row',
      justifyContent:'space-around'
    },
    buttonLogoutWrapper:{
      margin:5,
      borderRadius:17
    },
    emailText:{
      margin:8,
      fontSize:18,
      fontWeight:'700',
      color:'black',
      flexWrap:'wrap',
      fontFamily:'nunito'

    },
    listScroll:{
      maxHeight:200
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
      justifyContent:'space-around'
    },
    flatGoalWrapper:{
      height:200
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
    seeAllWrapper:{
      alignSelf:'center'
    },
    seeAllText:{
      marginLeft:8,
      marginBottom:8,
      marginRight:8,
      fontSize:18,
      fontWeight:'600',
      color:'blue',
      flexWrap:'wrap',
      fontFamily:'nunito'

    },
})