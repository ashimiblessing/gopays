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






axios.defaults.baseURL = 'http://3.21.215.190';
class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      email:"",
      password:"",
      setError:""
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

if(!this.state.email || !this.state.password )
{
  alert('Sorry. Please fill all fields');

  return;
}

const options = {
  method: 'post',
  url: '/api/login',
 data:{
   email:this.state.email,
   password:this.state.password,

}
};
  this.setState({isLoading:true})
axios(options)


  .then(response => {

    let userResponse =  {
      user: response.data.user,
      message: response.data.message,
      token: response.data.token
    }


    SecureStore.setItemAsync('userInfo', JSON.stringify(userResponse));
    SecureStore.setItemAsync('is_loggedin', JSON.stringify(response.data));

    SecureStore.setItemAsync('lastLogin', JSON.stringify(new Date()));




       if(response.data.has_not_filled_profile == true || response.data.has_not_filled_profile  )
       {
   this.setState({isLoading:false})
         this.props.navigation.navigate('BioData');

         return;
       }


    const { navigation } = this.props;
     this.setState({isLoading:false})






//
// alert(response.data.has_not_filled_profile)

     this.props.navigation.replace('Profile')


})
.catch(error => {



  const key = Object.keys(error.response.data)[0];





   this.setState({
     setError:error.response.data[key][0]
   })


 this.setState({isLoading:false})
if(error.response.data[key] == 'Unauthorized'){
  alert("Sorry. Your credentials are incorrect")
}
else{
   alert(error.response.data[key])

  // alert(JSON.stringify(error.response.data))
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
                   label="Email"
                   mode="flat"
                   underlineColor="blue" style={styles.formi}


                        onChangeText={(text) => this.setState({ email:text })}

                 />

                 <TextInput
                   keyboardType="numeric"
                   maxLength={6}
                     label="Enter PIN"
                     mode="flat"
                     underlineColor="blue" style={styles.formi}
                      name="password"
                        password
                        onChangeText={(text) => this.setState({ password:text })}

                   />

                 <Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                Forgot PIN?
                   </Text>
</Block>





                    <Block middle>









                      <Button color="primary" style={styles.createButton}
                      onPress={this.login}
                      >
                            {this.state.isLoading ?
                      <ActivityIndicator  size="large" color="#ffff" />
                      :
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Login
                        </Text>
                      }
                      </Button>





                    </Block>

    <Block center>
                    <Text
 onPress={() => navigation.navigate("Register")}

                     bold size={12} style={{marginTop:30}} color='#015CE1'>
                     Not registered? Sign up now
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

export default Login;
