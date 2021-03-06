import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,View,
  ImageBackground,
  Platform,FlatList, Animated,SafeAreaView,KeyboardAvoidingView,TouchableOpacity, RefreshControl
} from "react-native";
import { Block, Text,Icon,  theme, Button as GaButton} from "galio-framework";
import * as SecureStore from 'expo-secure-store';
import { Button,Header} from "../components";
import { Images, argonTheme,Tabs } from "../constants";
import { HeaderHeight } from "../constants/utils";
import axios from 'axios';
import { useEffect, useState } from "react";
const { width, height } = Dimensions.get("screen");
import {Picker} from '@react-native-picker/picker';

import { TextInput  , Paragraph, Dialog, Portal } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const thumbMeasure = (width - 48 - 32) / 3;

import * as DocumentPicker from 'expo-document-picker';

axios.defaults.baseURL = 'http://18.198.103.233';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';





function SettingsScreen({ navigation }) {
  const [text, setText] = React.useState('');
  const [friend_first_name, setFriendFirstName] = React.useState('');
  const [friend_last_name, setFriendLastName] = React.useState('');
  const [friend_phone, setFriendPhone] = React.useState('');
  const [loading, setLoading] = useState(false);






  function friend_biodata() {




     



      let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {

        setLoading(true)

    const dat = JSON.parse(dtstr);

        const config = {
          headers: { Authorization: 'Bearer '+dat.token }
      };
    //alert(BVN);return;


      axios.post('/api/update_friend_profile',{
        friend_first_name:friend_first_name,
        friend_last_name:friend_last_name,
        friend_phone:friend_phone

    },
    config

    )
    .then(response => {

      //const { navigation } = this.props;

      SecureStore.deleteItemAsync('bioInfo');
      SecureStore.setItemAsync('bioInfo', JSON.stringify(response.data.data));
      SecureStore.setItemAsync('isProfileSaved', 'YES');

      navigation.navigate('Profile');

      alert(response.data.success);

    })
    .catch(error => {
      setLoading(false)
      console.log(error);
      console.log('1 is here')
      const key = Object.keys(error.response.data)[0];
    alert(error.response.data[key]);
    return;

    if(error.response.data[key][0].length > 1) {
      alert(error.response.data[key][0])
    }

    else{
      alert(error.response.data[key])
    }


    //

    })



    })





      }











        useEffect(() => {



          setLoading(true)









        SecureStore.getItemAsync("bioInfo")
        .then(userString => {


          if(userString){

            setLoading(true)
            let user = JSON.parse(userString);


            setFriendFirstName(user.friend_first_name)

            // setEmail(user.email)
            setFriendLastName(user.friend_last_name)
            setFriendPhone(user.friend_phone)

            setLoading(false)


          }



        });

        }, []);

























  return (
    <View style={{ flex: 1,  alignItems: 'center' }}>











<Block  style={{ marginBottom: 10 }}>

<TextInput    label="First Name" mode="flat" underlineColor="blue"


 style={styles.formi}


  value={friend_first_name}
  onChangeText={text => setFriendFirstName(text)}
/>

<Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                 Your friend{"'"}s first name
                  </Text>

</Block>




<Block  style={{ marginBottom: 10 }}>

<TextInput  mode="flat" underlineColor="blue"
label="Last Name"

style={styles.formi}
   value={friend_last_name}
  onChangeText={text => setFriendLastName(text)}
/>
<Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                 Your friend{"'"}s last name
                  </Text>


</Block>








<Block  style={{ marginBottom: 10 }}>

<TextInput  mode="flat" underlineColor="blue"
label="Phone"

value={friend_phone}

style={styles.formi}
  onChangeText={text => setFriendPhone(text)}
/>

<Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                 Your friend{"'"}s phone number
                  </Text>

</Block>







                       <Block
                         middle
                         row
                         space="evenly"
                         style={{ marginTop: 20 }}
                       >


                         <Button
                           medium
                           color="primary"

                      onPress={() => friend_biodata(friend_first_name,friend_last_name,friend_phone)}
                         >
                         {
                           loading ?
                           <ActivityIndicator  size="large" color="#ffff" />
                           :
                           <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Save
                        </Text>
                         }

                         </Button>
                       </Block>




</View>






  );
}






function BioData1 ({ navigation }) {
  const [text, setText] = React.useState('');
  const [first_name, setFirstName] = React.useState('');
  const [middle_name, setMiddleName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [date_of_birth, setDob] = React.useState('');
   const [date_obj, setDateOBJ] = React.useState('');
//  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [type_of_residence, setTypeOfResidence] = React.useState('');
  const [employment_status, setEmploymentStatus] = React.useState('');
  const [monthly_income, setMonthlyIncome] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState('');
  const [BVN, setBVN] = useState('');
  const [bvnMatched, setBvnMatched] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [is_locked, setIsLocked] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fileUpload, setFileUpload] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [statementText, setStatementText] = useState('');

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const showDatePicker = () => {
    setDatePickerVisibility(true);

  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {


    const dt =  date.getDate() + "/" + (date.getMonth() + 1)  + "/" + date.getFullYear() ;




    setDob(dt);
  setDateOBJ(date);




    hideDatePicker();
  };



  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setFileUpload(result);
    const localUri = result.uri;
    var filename = localUri.split('/').pop();
    setStatementText('You selected '+ filename);
    
     
    
}



const saveFunction = async (formData,token) => {
 
 await fetch('http://18.198.103.233/saveFile', {
    method: 'POST',
    body: formData,
   
    header: {
      'content-type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token,
    },
  });
   
   










   
  
}







  async function biodata() {








// console.log('is matched')
// console.log(bvnMatched)
if(!date_of_birth)
{
  alert('Please select a proper date');
  return;
}




let the_date = date_of_birth.split('/');

let new_dateobj = new Date(the_date[2],the_date[1],the_date[0]);


 if(new_dateobj.getFullYear()*1 > 2013)
 {
  alert('Please pick a bigger year of birth');

  return;
 }




    setLoading(true)



    



  let dt = await SecureStore.getItemAsync("is_loggedin").then(dtstr =>  {




    const dat = JSON.parse(dtstr);



//save the file 

if(fileUpload)
{
  const formData = new FormData();
 
var localUri = fileUpload.uri;
var filename = localUri.split('/').pop();

var match = /\.(\w+)$/.exec(filename);
var type = match ? `image/${match[1]}` : `image`;

formData.append('file_upload', { uri: localUri, name: filename, type });


var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://18.198.103.233/api/saveFile');
xhr.setRequestHeader('Authorization', 'Bearer '+ dat.token);
xhr.send(formData);









 
  // alert(fileUpload)
  // saveFunction(formData,dat.token);

}












    const config = {
      headers: { Authorization: 'Bearer '+dat.token }
  };
//alert(BVN);return;


  axios.post('/api/update_profile',{
    first_name:first_name,
    middle_name:middle_name,
    last_name:last_name,
    dob:date_of_birth,
    company_name:companyName,
    phone:phone,
    type_of_residence:type_of_residence,
    employment_status:employment_status,
    monthly_income:monthly_income,
    bvn:BVN,

},
config

)
.then(response => {

 
  //const { navigation } = this.props;

  SecureStore.deleteItemAsync('bioInfo');
  SecureStore.setItemAsync('bioInfo', JSON.stringify(response.data.data));
  SecureStore.setItemAsync('isProfileSaved', 'YES');
//alert(JSON.stringify(response.data.information));


  navigation.navigate('Profile');
//alert(JSON.stringify(response.data))

  alert(response.data.success);

})
.catch(error => {
  setLoading(false)
  alert(error);
  console.log('5 is here')
    const key = Object.keys(error.response.data)[0];
// const key = Object.keys(error.response.data)[0];
//  errors = error.response.data[key][0];


if(error.response.data[key][0].length > 1) {
  alert(error.response.data[key][0])
}

else{
  alert(error.response.data[key])
}


//

})



})





  }











    useEffect(() => {

      

      setLoading(true)




      let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


    const dat = JSON.parse(dtstr);

        const config = {
          headers: { Authorization: 'Bearer '+dat.token }
      };



      axios.post('/api/mybio',{},
    config

    )
    .then(response => {

      //const { navigation } = this.props;
     //alert(response.data.bio);
     setLoading(false)
   if(response.data.bio)
   {
    SecureStore.deleteItemAsync('bioInfo');
    SecureStore.setItemAsync('bioInfo', JSON.stringify(response.data.bio));

const user = response.data.bio;

setUserDetails(user)

    setFirstName(user.first_name)
    setMiddleName(user.middle_name)
    // setEmail(user.email)
    setLastName(user.last_name)
    setPhone(user.phone)
    setTypeOfResidence(user.type_of_residence)
    setEmploymentStatus(user.employment_status)
    setMonthlyIncome(user.monthly_income)
     setBVN(user.bvn)
    setDob(user.date_of_birth)
    setBvnMatched(user.bvn_matches)
    setCompanyName(user.company_name);

    //specify fields of interest
    const check_locked = [user.first_name,user.last_name,user.phone,user.type_of_residence,user.employment_status,user.monthly_income,user.bvn,user.date_of_birth];
 
//check if any of them is unfilled

for(var k=0; k<check_locked.length;k++){
 
  if(!check_locked[k] || typeof check_locked[k] === null)
  {
  
    setIsLocked(false)
  }
  
  


}



   }

   setLoading(false)


    })
    .catch(error => {
      setLoading(false)
      console.log(error);
      console.log('11 is here')
        const key = Object.keys(error.response.data)[0];


      //  alert(error.response.data[key][0])
    })



    })












//     SecureStore.getItemAsync("bioInfo")
//     .then(userString => {


//       if(userString){

//         setLoading(true)
//         let user = JSON.parse(userString);

//         setUserDetails(user)
//         setFirstName(user.first_name)
//         setMiddleName(user.middle_name)
//         // setEmail(user.email)
//         setLastName(user.last_name)
//         setPhone(user.phone)
//         setTypeOfResidence(user.type_of_residence)
//         setEmploymentStatus(user.employment_status)
//         setMonthlyIncome(user.monthly_income)
//          setBVN(user.bvn)
//         setDob(user.date_of_birth)
//         setBvnMatched(user.bvn_matches)

//         //  console.log(user.email)
//         setLoading(false)

// console.log(user)
//       }



//     });

    }, []);



  return (


    <KeyboardAvoidingView

                       style={styles.group}
                       behavior="padding"
                       enabled
                     >
 <ScrollView

 showsVerticalScrollIndicator={false}

 refreshControl={
  <RefreshControl
    refreshing={refreshing}
    onRefresh={onRefresh}
  />
}

 >
 <Block  style={{ marginBottom: 5 }}>

<Text center>

{
                           loading ?
                           <ActivityIndicator  size="large" color="blue" />
                           :
                           <Text bold   >
                     Type in your details
                        </Text>
                         }
</Text>


   </Block>
                       <Block  style={{ marginBottom: 10 }}>

                         <TextInput    label="First Name" mode="flat" underlineColor="blue"

editable={is_locked === false ? true:false}
                          style={styles.formi}


                           value={first_name}
                           onChangeText={text => setFirstName(text)}
                         />

<Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                                          Your first name as it appears on your bank account
                                           </Text>

                       </Block>



              <Block  style={{ marginBottom: 10 }}>

                         <TextInput  mode="flat" underlineColor="blue"
label="Middle Name"

value={middle_name}

 style={styles.formi}
                           onChangeText={text => setMiddleName(text)}
                         />

<Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                                          Your middle name as it appears on your bank account
                                           </Text>

                       </Block>



    <Block  style={{ marginBottom: 10 }}>

                         <TextInput  mode="flat" underlineColor="blue"
label="Last Name"
editable={is_locked === false ? true:false}
                        style={styles.formi}
                            value={last_name}
                           onChangeText={text => setLastName(text)}
                         />
<Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                                          Your last name as it appears on your bank account
                                           </Text>


                       </Block>






              <Block  style={{ marginBottom: 10 }}>









<TouchableOpacity
                                         activeOpaticy={1}
                                         onPress={() =>     is_locked === false ? showDatePicker() : console.log('you cant edit this field anymore')     }

                                           >


                                         <TextInput
                                         editable={false} // optional
                                         value={date_of_birth}
                                             label="Date of birth"
                                             mode="flat"
                                             underlineColor="blue" style={styles.formi}
                                             onChangeText={text => setDob(text)}
                                           />

<Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                                        Please ensure that the date provided is the same captured on your bank account
                                           </Text>
                                       </TouchableOpacity>


                                       <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />











                       </Block>

















              <Block  style={{ marginBottom: 35 }}>

                         <TextInput  mode="flat" underlineColor="blue"
label="Phone Number"
value={phone}
editable={is_locked === false ? true:false}
                          style={styles.formi}
                           onChangeText={text => setPhone(text)}
                         />

<Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                                       We recommend using the phone number used by your bank for verification purposes.
                                           </Text>

                       </Block>











              <Block  style={{ marginBottom: 35 }}>
              <Text size={14}>
                Type of Residence
              </Text>
             <Picker
  enabled={is_locked === false ? true:false}
     style={{ height: 50, }}
 selectedValue={type_of_residence}
     onValueChange={(itemValue, itemIndex) =>
       setTypeOfResidence(itemValue)
     }

   >

     <Picker.Item label="Select one" value=""


     />
     <Picker.Item label="Rented" value="rented"


     />
     <Picker.Item label="Owned" value="owned"  />
     <Picker.Item label="Family House" value="family-house"  />
     <Picker.Item label="Employer Provided" value="employer-provided"  />
     <Picker.Item label="Temporary" value="temporary"  />

    </Picker>



                       </Block>










     <Block  style={{ marginBottom: 15 }}>
     <Text size={14}>
       Employment Status
     </Text>
                         <Picker
 enabled={is_locked === false ? true:false}
                              style={{ height: 50, }}
                          selectedValue={employment_status}
                              onValueChange={(itemValue, itemIndex) =>
                                setEmploymentStatus(itemValue)
                              }

     >

     <Picker.Item label="Select one" value=""


     />
     <Picker.Item label="Employed" value="employed"   />
     <Picker.Item label="Self-Employed" value="self-employed"    />
     <Picker.Item label="Retired" value="retired" />
     <Picker.Item label="Unemployed" value="unemployed"     />
     <Picker.Item label="Student" value="student"   />

    </Picker>


                       </Block>







                       <Block  style={{ marginBottom: 15 }}>

<TextInput


mode="flat" underlineColor="blue"
label="Company Name"
value={companyName}
 style={styles.formi}

  onChangeText={text => setCompanyName(text)}
/>



</Block>





<Block  style={{ marginBottom: 30,marginTop:30 }}>
<Text color={argonTheme.COLORS.MUTED} size={14} style={{marginBottom:10}}>
               Your account statement for the past 3 months {}
                  </Text>
<Button   mode="contained" onPress={() => pickDocument() } style={{width:'100%'}} >
   Select File
  </Button>
  <Text color={argonTheme.COLORS.MUTED} size={13} style={{marginTop:10}}>
                {statementText}
                  </Text>


</Block>









              <Block  style={{ marginBottom: 15 }}>

                         <TextInput

                         editable={is_locked === false ? true:false}
                         mode="flat" underlineColor="blue"
label="Monthly Income"
value={monthly_income}
                          style={styles.formi}

                           onChangeText={text => setMonthlyIncome(text)}
                         />



                       </Block>






              <Block  style={{ marginBottom: 15 }}>

                         <TextInput  mode="flat" underlineColor="blue"
                           editable={is_locked === false ? true:false}
label="BVN"
value={BVN}
                          style={styles.formi}

                           onChangeText={text => setBVN(text)}
                         />



                       </Block>









                       <Block
                         middle
                         row
                         space="evenly"
                         style={{ marginTop: 20 }}
                       >


                         <Button
                           medium
                           color="primary"



                      onPress={() => biodata(first_name,middle_name,last_name,date_of_birth,phone,type_of_residence,employment_status,monthly_income,BVN)}
                         >
                         {
                           loading ?
                           <ActivityIndicator  size="large" color="#ffff" />
                           :
                           <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Save
                        </Text>
                         }

                         </Button>
                       </Block>

</ScrollView>
                     </KeyboardAvoidingView>


  );


};



const Tab = createMaterialTopTabNavigator();



export default function BioData() {
  return (

      <Tab.Navigator>
        <Tab.Screen name="Your Details" component={BioData1} />
        <Tab.Screen name="Friend's Details" component={SettingsScreen} />
      </Tab.Navigator>

  );
}







const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },


  formtext: {
    fontSize:12,
    marginTop:2,
    marginLeft:2,
    textAlign:'left',
    alignSelf:'flex-start',
  } ,



  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },

  formi: {
    marginTop:10,
    backgroundColor:"transparent",
    width:width*0.9,
    fontSize:14,
    color:'#000',
  } ,



  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },


  container: {
    width: width,
    backgroundColor: theme.COLORS.BLACK,
    zIndex: 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingHorizontal: theme.SIZES.BASE * 2.5,
    paddingTop: 8,
    paddingBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4,
    marginRight: 9
  },
  containerShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  menuTitle: {
    fontWeight: '600',
    fontSize: 14,
    // lineHeight: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: argonTheme.COLORS.MUTED
  },

  group: {
    paddingTop: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,

  },
});






// export default BioData;
