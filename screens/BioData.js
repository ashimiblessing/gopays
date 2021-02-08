import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,FlatList, Animated,SafeAreaView,KeyboardAvoidingView,
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
const thumbMeasure = (width - 48 - 32) / 3;

axios.defaults.baseURL = 'https://secret-reef-44275.herokuapp.com';
const BioData = ({ navigation }) => {
  const [text, setText] = React.useState('');
  const [first_name, setFirstName] = React.useState('');
  const [middle_name, setMiddleName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [type_of_residence, setTypeOfResidence] = React.useState('');
  const [employement_status, setEmploymentStatus] = React.useState('');
  const [monthly_income, setMonthlyIncome] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState('');
  const [posts, setPosts] = useState([]);
  // import * as SecureStore from 'expo-secure-store';

  // let secure = SecureStore.getItem('user');
  // console.log(secure);
  // React.createContext({

  //   biodata: () => {},

  // });

  function biodata() {
    setLoading(true)
  axios.post('/api/profile',{
    first_name:first_name,
    middle_name:middle_name,
    last_name:last_name,
    dob:dob,
    email:email,
    phone:phone,
    type_of_residence:type_of_residence,
    employement_status:'Student',
    monthly_income:monthly_income

})
.then(response => {
  console.log(response)
  //const { navigation } = this.props;

  SecureStore.setItemAsync('isProfileSaved', 'YES');

  navigation.navigate("Profile")

})
.catch(error => {
  setLoading(false)
//alert(error)
    const key = Object.keys(error.response.data)[0];
// const key = Object.keys(error.response.data)[0];
//  errors = error.response.data[key][0];


   alert(error.response.data[key])
})
  }
    useEffect(() => {
      biodata()
      // check if the user is logged in or not
    SecureStore.getItemAsync("userInfo")
    .then(userString => {
      let user = JSON.parse(userString).user;
      setUserDetails(user)
      setFirstName(user.first_name)
   
      setEmail(user.email)
      setLastName(user.last_name)
      //  console.log(user.email)
    });

    }, []);



  return (


    <KeyboardAvoidingView

                       style={styles.group}
                       behavior="padding"
                       enabled
                     >
 <ScrollView>

                       <Block  style={{ marginBottom: 15 }}>
                       <Text size={14}>
                         First Name
                       </Text>
                         <TextInput  mode="flat" underlineColor="blue"


                          style={styles.formi}


                           value={first_name}
                           onChangeText={text => setFirstName(text)}
                         />

                       </Block>



              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
                Middle Name
              </Text>
                         <TextInput  mode="flat" underlineColor="blue"



 style={styles.formi}
                           onChangeText={text => setMiddleName(text)}
                         />

                       </Block>



    <Block  style={{ marginBottom: 15 }}>
    <Text size={14}>
    Last Name
    </Text>
                         <TextInput  mode="flat" underlineColor="blue"


                        style={styles.formi}
                            value={last_name}
                           onChangeText={text => setLastName(text)}
                         />



                       </Block>






              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
                Date of Birth
              </Text>
                         <TextInput  mode="flat" underlineColor="blue"


                        style={styles.formi}
                           onChangeText={text => setDob(text)}
                         />

                       </Block>













                       <Block  style={{ marginBottom: 15 }}>
                       <Text size={14}>
                      Email Address
                       </Text>
                         <TextInput  mode="flat" underlineColor="blue"




                        style={styles.formi}
                            value={email}
                           onChangeText={text => setEmail(text)}
                         />
                       </Block>




              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
                Phone Number
              </Text>
                         <TextInput  mode="flat" underlineColor="blue"


                          style={styles.formi}
                           onChangeText={text => setPhone(text)}
                         />

                       </Block>











              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
                Type of Residence
              </Text>
             <Picker

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

                              style={{ height: 50, }}
                          selectedValue={employement_status}
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
              <Text size={14}>
              Monthly Income
              </Text>
                         <TextInput  mode="flat" underlineColor="blue"


                          style={styles.formi}

                           onChangeText={text => setMonthlyIncome(text)}
                         />

                       </Block>




                       <Block
                         middle
                         row
                         space="evenly"
                         style={{ marginTop: 20 }}
                       >
{/*
                         <Button
                           medium
                           style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                      onPress={() => navigation.navigate("Profile")}
                         >
                           Save
                         </Button> */}

                         <Button
                           medium
                           color="primary"

                      onPress={() => biodata(first_name,middle_name,last_name,dob,email,phone,type_of_residence,employement_status,monthly_income)}
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




const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
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






export default BioData;
