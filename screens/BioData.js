import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,FlatList, Animated,SafeAreaView,KeyboardAvoidingView,Picker
} from "react-native";
import { Block, Text,Icon,  theme, Button as GaButton} from "galio-framework";
import * as SecureStore from 'expo-secure-store';
import { Button,Header, Input,} from "../components";
import { Images, argonTheme,Tabs } from "../constants";
import { HeaderHeight } from "../constants/utils";
import axios from 'axios';
import { useEffect, useState } from "react";
const { width, height } = Dimensions.get("screen");

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
    type_of_residence:'Rented',
    employement_status:'Student',
    monthly_income:monthly_income
    
})
.then(response => {
  console.log(response)
  const { navigation } = this.props;
  navigation.navigate("Profile")
  
})
.catch(error => { 
// const key = Object.keys(error.response.data)[0]; 
//  errors = error.response.data[key][0];
setLoading(false)
console.log(errors)
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
    
   <ScrollView>
    <KeyboardAvoidingView

                       style={styles.group}
                       behavior="padding"
                       enabled
                     >


                       <Block  style={{ marginBottom: 15 }}>
                       <Text size={14}>
                         First Name
                       </Text>
                         <Input
                          
                           placeholder="First Name"
                           style={{
                             borderColor: argonTheme.COLORS.INFO,
                             borderRadius: 4,
                             backgroundColor: "#fff"
                           }}
                           
                           iconContent={<Block />
                           
                           }
                           value={first_name}
                           onChangeText={text => setFirstName(text)}
                         />
                      
                       </Block>



              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
                Middle Name
              </Text>
                         <Input

                           placeholder="Middle Name"


                           style={{
                             borderColor: argonTheme.COLORS.INFO,
                             borderRadius: 4,
                             backgroundColor: "#fff"
                           }}
                           iconContent={<Block />}
                           onChangeText={text => setMiddleName(text)}
                         />

                       </Block>



    <Block  style={{ marginBottom: 15 }}>
    <Text size={14}>
    Last Name
    </Text>
                         <Input

                           placeholder="Last Name"
                           style={{
                             borderColor: argonTheme.COLORS.INFO,
                             borderRadius: 4,
                             backgroundColor: "#fff"
                           }}
                           iconContent={<Block />}
                            value={last_name}
                           onChangeText={text => setLastName(text)}
                         />



                       </Block>






              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
                Date of Birth
              </Text>
                         <Input

                           placeholder="DOB"
                           style={{
                             borderColor: argonTheme.COLORS.INFO,
                             borderRadius: 4,
                             backgroundColor: "#fff"
                           }}
                           iconContent={<Block />}
                           onChangeText={text => setDob(text)}
                         />

                       </Block>













                       <Block  style={{ marginBottom: 15 }}>
                       <Text size={14}>
                      Email Address
                       </Text>
                         <Input


                           placeholder="Email"
                           style={{
                             borderColor: argonTheme.COLORS.INFO,
                             borderRadius: 4,
                             backgroundColor: "#fff"
                           }}
                           iconContent={<Block />}
                            value={email}
                           onChangeText={text => setEmail(text)}
                         />
                       </Block>




              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
                Phone Number
              </Text>
                         <Input

                           placeholder="Phone"
                           style={{
                             borderColor: argonTheme.COLORS.INFO,
                             borderRadius: 4,
                             backgroundColor: "#fff"
                           }}
                           iconContent={<Block />}
                           onChangeText={text => setPhone(text)}
                         />

                       </Block>











              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
                Type of Residence
              </Text>
             <Picker

     style={{ height: 50, }}
      
   >

     <Picker.Item label="Select one" value="" onChangeText={text => setTypeOfResidence(text)}/>
     <Picker.Item label="Rented" value="rented" onChangeText={text => setTypeOfResidence(text)}/>
     <Picker.Item label="Owned" value="owned" onChangeText={text => setTypeOfResidence(text)}/>
     <Picker.Item label="Family House" value="family-house" onChangeText={text => setTypeOfResidence(text)}/>
     <Picker.Item label="Employer Provided" value="employer-provided" onChangeText={text => setTypeOfResidence(text)}/>
     <Picker.Item label="Temporary" value="temporary" onChangeText={text => setTypeOfResidence(text)}/>

    </Picker>


                       </Block>



     <Block  style={{ marginBottom: 15 }}>
     <Text size={14}>
       Employment Status
     </Text>
                         <Picker


     style={{ height: 50 }}
    
     >

     <Picker.Item label="Select one" value="" onChangeText={text => setEmploymentStatus(text)}/>
     <Picker.Item label="Employed" value="employed" onChangeText={text => setEmploymentStatus(text)}/>
     <Picker.Item label="Self-Employed" value="self-employed" onChangeText={text => setEmploymentStatus(text)}/>
     <Picker.Item label="Retired" value="retired" />
     <Picker.Item label="Unemployed" value="unemployed" onChangeText={text => setEmploymentStatus(text)}/>
     <Picker.Item label="Student" value="student" onChangeText={text => setEmploymentStatus(text)}/>

    </Picker>


                       </Block>





              <Block  style={{ marginBottom: 15 }}>
              <Text size={14}>
              Monthly Income
              </Text>
                         <Input

                           placeholder="Monthly Income"
                           style={{
                             borderColor: argonTheme.COLORS.INFO,
                             borderRadius: 4,
                             backgroundColor: "#fff"
                           }}
                           iconContent={<Block />}
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
                           style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
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


                     </KeyboardAvoidingView>
                     </ScrollView>

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
