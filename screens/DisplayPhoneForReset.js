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

      phone:"",
      setError:"",

    }

    this.send_phone = this.send_phone.bind(this);

  }







  send_phone() {

if(!this.state.phone)
{
  alert('Sorry. Please enter phone number');

  return;
}

const the_phone = this.state.phone;

  this.setState({isLoading:true})
  axios.post(
    '/api/send_otp_for_password_reset',{
      phone:the_phone.trim(),


   },
{}
  )


  .then(response => {




       if(response.data.success == true )
       {

   this.setState({isLoading:false})

       SecureStore.setItemAsync('user_reset_info', JSON.stringify(response.data.data));
       console.log(response.data.data);
          this.setState({isLoading:false})
         this.props.navigation.replace('ResetPasswordOtp');

return;
       }
else{
     this.setState({isLoading:false});
     alert(response.data.information);
     return;
}






})
.catch(error => {

  const key = Object.keys(error.response.data)[0];




 this.setState({isLoading:false});
  alert(error.response.data[key]);




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
         Reset your password
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
                   label="Enter phone number"
                   mode="flat"
                   underlineColor="blue" style={styles.formi}


                        onChangeText={(text) => this.setState({ phone:text })}

                 />



</Block>

<Block style={{marginTop:10, }}>
<Text color={argonTheme.COLORS.MUTED}>
  Your registered phone number
</Text>

</Block>



                    <Block middle>









                      <Button color="primary" style={styles.createButton}
                      onPress={this.send_phone}
                      >
                            {this.state.isLoading ?
                      <ActivityIndicator  size="large" color="#ffff" />
                      :
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Continue
                        </Text>
                      }
                      </Button>





                    </Block>

    <Block center>
                    <Text
 onPress={() => navigation.replace("Login")}

                     bold size={12} style={{marginTop:30}} color='#015CE1'>
                     Go to Login
                    </Text>
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
