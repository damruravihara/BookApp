import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, ToastAndroid, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import background from '../../Assets/BackGround.jpg'
import RNPickerSelect from 'react-native-picker-select';

 const CreateGoalActivity = () => {

    const [title, onChangeTitle] = useState("");
    const [type, onChangeType] = useState("");
    const [description, onChangeDescription] = useState("");
    const [price, onChangePrice] = useState("");
    const [month, onChangeMonth] = useState("");
    const [year, onChangeYear] = useState("");
    const [day, onChangeDay] = useState("");
    const [author, onChangeAuthor] = useState("");
    const navigation = useNavigation()

    const userId = auth().currentUser?.uid
    const book = userId+"/"+title
    
    const Year = "Year"
    const Month = "Month"
    const Day = "Month"

    const onCreate = () =>{
      if(title === ""){
        ToastAndroid.show("Title is Empty", ToastAndroid.SHORT);
      }
      else if(type === ""){
        ToastAndroid.show("Type is Empty", ToastAndroid.SHORT);
      }
      else if(description === ""){
        ToastAndroid.show("Description is Empty", ToastAndroid.SHORT);
      }
      else if(price === ""){
        ToastAndroid.show("Price is Empty", ToastAndroid.SHORT);
      }
      else if(year === ""){
        ToastAndroid.show("Select Year", ToastAndroid.SHORT);
      }      
      else if(month === ""){
        ToastAndroid.show("Select Month", ToastAndroid.SHORT);
      }      
      else if(day === ""){
        ToastAndroid.show("Select day", ToastAndroid.SHORT);
      }
      else if(author === ""){
        ToastAndroid.show("Author is Empty", ToastAndroid.SHORT);
      }
      else{
        database()
        .ref('/goal/'+book)
        .set({
            Title: title,
            Type: type,
            Description: description,
            Price: "Rs:"+price,
            DueDate: year+"/"+month+"/"+day,
            Author: author,
            })
        .then(() => {
            ToastAndroid.show("Goal Created", ToastAndroid.SHORT);
            navigation.replace('AllGoals')
        });
      }
    }
    
  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.image}>
        <ScrollView>
            <View style={styles.goalWrapper}>
            <View style={styles.goalTitleWrapper}>
                <Text style={styles.goalTitle}>ADD NEW GOAL</Text>
            </View>
            <TextInput style={styles.input} placeholder="Book Title" onChangeText={(text) => onChangeTitle(text)}/>
            <TextInput style={styles.input} placeholder="Book Author" onChangeText={(text) => onChangeAuthor(text)}/>
            <TextInput style={styles.input} placeholder="Book Type" onChangeText={(text) => onChangeType(text)}/>
            <TextInput style={styles.input} placeholder="Book Description" onChangeText={(text) => onChangeDescription(text)}/>
            <TextInput style={styles.input} placeholder="Book Price" onChangeText={(text) => onChangePrice(text)}/>
            <View style={styles.dateWrapper}>
              <Text style={styles.dateText}>Select Goal Date (Y/M/D)</Text>
            <RNPickerSelect placeholder={{label: 'Select Year', value: 'Select Year'}}
            onValueChange={(value) => onChangeYear(value)}
            items={[
                { label: '2021', value: '2021' },
                { label: '2022', value: '2022' },
                { label: '2023', value: '2023' },
                { label: '2024', value: '2024' },
                { label: '2025', value: '2025' },
                { label: '2026', value: '2026' },
                { label: '2027', value: '2027' },
                { label: '2028', value: '2028' },
                { label: '2029', value: '2029' },
                { label: '2030', value: '2030' },
                { label: '2031', value: '2031' },
                { label: '2032', value: '2032' },
                { label: '2033', value: '2033' },
                { label: '2034', value: '2034' },
                { label: '2035', value: '2035' },
                { label: '2036', value: '2036' },
                { label: '2037', value: '2037' },
                { label: '2038', value: '2038' },
                { label: '2039', value: '2039' },
                { label: '2040', value: '2040' },
                { label: '2041', value: '2041' },
                { label: '2042', value: '2042' },
                { label: '2043', value: '2043' },
                { label: '2044', value: '2044' },
                { label: '2045', value: '2045' },
                { label: '2046', value: '2046' },
                { label: '2047', value: '2047' },
                { label: '2048', value: '2048' },
                { label: '2049', value: '2049' },
                { label: '2050', value: '2050' },
            ]}
        />
        <RNPickerSelect placeholder={{label: 'Select Month', value: 'Select Month'}}
            onValueChange={(value) => onChangeMonth(value)}
            items={[
                { label: 'January', value: 'January' },
                { label: 'February', value: 'February' },
                { label: 'March', value: 'March' },
                { label: 'April', value: 'April' },
                { label: 'May', value: 'May' },
                { label: 'June', value: 'June' },
                { label: 'July', value: 'July' },
                { label: 'August', value: 'August' },
                { label: 'September', value: 'September' },
                { label: 'October', value: 'October' },
                { label: 'November', value: 'November' },
                { label: 'December', value: 'December' }
            ]}
        />
            <RNPickerSelect placeholder={{label: 'Select Day', value: 'Select Day'}}
            onValueChange={(value) => onChangeDay(value)}
            items={[
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '10', value: '10' },
                { label: '11', value: '11' },
                { label: '12', value: '12' },
                { label: '13', value: '13' },
                { label: '14', value: '14' },
                { label: '15', value: '15' },
                { label: '16', value: '16' },
                { label: '17', value: '17' },
                { label: '18', value: '18' },
                { label: '19', value: '19' },
                { label: '20', value: '20' },
                { label: '21', value: '21' },
                { label: '22', value: '22' },
                { label: '23', value: '23' },
                { label: '24', value: '24' },
                { label: '25', value: '25' },
                { label: '26', value: '26' },
                { label: '27', value: '27' },
                { label: '28', value: '28' },
                { label: '29', value: '29' },
                { label: '30', value: '30' },
                { label: '31', value: '31' },
            ]}
        />
                    </View>
        
            

            <View style={styles.createButtonWrapper}>
                <Button title="CREATE" onPress={onCreate} style={styles.createButton} />
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
        backgroundColor:'#CBC8C8',
        flex:1,
      },
      image:{
        flex: 1,
        justifyContent: "center"
      },
      goalWrapper:{
        backgroundColor:'white',
        borderRadius:17,
        marginLeft:15,
        marginRight:15,
        marginTop:20,
        marginBottom:15
        
      },
      input:{
        height: 50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        fontSize:20,
        fontWeight:"500"
      },
      createButtonWrapper:{
        borderRadius:17,
        marginTop:20,
        marginLeft:15,
        marginRight:15,
        marginBottom:15
      },
      goalTitleWrapper:{
        marginTop:20,
        marginLeft:15,
        marginRight:15,
        marginBottom:10,
        alignItems:"center"
      },
      goalTitle:{
            fontSize:30,
            fontWeight:"600",
            color:"black"
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
      dateWrapper:{
        margin: 10,
        borderWidth: 1,
        padding: 10,
        fontSize:20,
        fontWeight:"500"
      },
      dateText:{
        color:'black',
        fontSize:20,
        fontWeight:"500"
      },
      inputAndroid:{
        color:"black"
      }
})
export default CreateGoalActivity;