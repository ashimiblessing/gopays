import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { StackActions, NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';


import * as SecureStore from 'expo-secure-store';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import axios from 'axios';


import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");






axios.defaults.baseURL = 'http://18.198.103.233';
class ResetPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      email:"",
      password:"",
      setError:"",
      verify_new_password:"",
      new_password:"",
    }
    this.loginState = this.loginState.bind(this);
    this.login = this.login.bind(this);

  }







  loginState(event){

    this.setState({
      [event.target.name]:event.target.value,
    });

  // console.log(event.target.value);


  };

  login() {

if(!this.state.new_password )
{
  alert('Sorry. Please fill all fields');

  return;
}


if(this.state.new_password  !== this.state.verify_new_password )
{
  alert('Sorry. Please enter the same values in the password verification');

  return;
}







    let data2 = SecureStore.getItemAsync("user_reset_info").then(userString => {



        if(userString !== '' || typeof userString !== 'undefined' )
        {


           const user_reset =  JSON.parse(userString);





    this.setState({isLoading:true})
    axios.post('/api/reset_password',{
      email:user_reset.email,
     
      new_password:this.state.new_password,


    },

    {
      headers: {

           'content-type': 'application/json'
           }


    }

    )
  .then(response => {
    const { navigation } = this.props;




           if(response.data.success == true )
           {

       this.setState({isLoading:false})



   alert('Password reset successfull. Please login');

        navigation.navigate("Login")

    return;
           }
    else{
         this.setState({isLoading:false});
         alert(response.data.information);
         return;
    }




})
.catch(error => {
  //alert(error)
  const key = Object.keys(error.response.data)[0];

 alert(error.response.data[key]);
 this.setState({isLoading:false})
 // alert(error.response.data[key])
})







        }
        else{
            alert('System Error. Please try again')
        }
        })













  }









  render() {

        const { navigation } = this.props;
    return (

      <Block flex>
      <StatusBar hidden />


      <ScrollView style={{backgroundColor:"white"}}>

      <Block center>
        <Image source={Images.LogoOnboarding}  style={styles.logo} />
        <Text bold size={15} style={{marginTop:30}}>
         Welcome to Gopays!
        </Text>




      </Block>



                <Block flex center style={styles.registerContainer} >
                  <KeyboardAvoidingView keyboardShouldPersistTaps={'handled'}
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >












               <Block center style={styles.formContain}>




                   <TextInput
                     keyboardType="numeric"
                     maxLength={6}
                       label="Enter New PIN"
                       mode="flat"
                       underlineColor="blue" style={styles.formi}
                        name="new_password"
                          password
                          onChangeText={(text) => this.setState({ new_password:text })}

                     />


                                        <TextInput
                                          keyboardType="numeric"
                                          maxLength={6}
                                            label="Verify New PIN"
                                            mode="flat"
                                            underlineColor="blue" style={styles.formi}
                                             name="verify_new_password"
                                               password
                                               onChangeText={(text) => this.setState({ verify_new_password:text })}

                                          />
</Block>





                    <Block middle>









                      <Button color="primary" style={styles.createButton}
                      onPress={this.login}
                      >
                            {this.state.isLoading ?
                      <ActivityIndicator  size="large" color="#ffff" />
                      :
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Reset Password
                        </Text>
                      }
                      </Button>





                    </Block>



                  </KeyboardAvoidingView>
                </Block>
                </ScrollView>
              </Block>


    );
  }
}

const styles = StyleSheet.create({


    formContain: {
 width:width*0.9
    } ,

  formtext: {
    fontSize:12,
    marginTop:2,
    marginLeft:2,
    textAlign:'left',
    alignSelf:'flex-start',
  } ,


  logo: {
    width: 160,
    height: 27,
    zIndex: 20,
    position: 'relative',
    marginTop: '20%'
  },


  formi: {
    marginTop:10,
    backgroundColor:"white",
    width:width*0.9,
    fontSize:14,
    color:'#000',
  } ,



  registerContainer: {
    width: width * 0.98,

    backgroundColor: "#fff",



  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    backgroundColor:'#015CE1'
  }
});

export default ResetPassword;
