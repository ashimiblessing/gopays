import * as React from 'react';
import {  View, StyleSheet,

Dimensions,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,


} from 'react-native';
import { Constants } from 'expo';
import { Block, Checkbox, Text, theme, Icon,Button } from "galio-framework";
import {   argonTheme } from "../constants";
// You can import from local files
import OtpInputs from '../screens/OtpInputs';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

import * as SecureStore from 'expo-secure-store';
axios.defaults.baseURL = 'http://3.21.215.190';
import axios from 'axios'; 




export default class OtpInput extends React.Component {
  state={otp:'',
  isLoading:false,


};
   getOtp(otp) {
        console.log(otp);
        this.setState({ otp });
  }









verify_otp() {










    let data2 = SecureStore.getItemAsync("current_user_id").then(userString => {



        if(userString == '' || typeof userString === 'undefined' )
        {
      
         
           const user_id =  userString;




    this.setState({isLoading:true})
    axios.post('/api/verify_otp',{
      otp:this.state.otp,
      user_id:user_id,

     
    },
    
    {
      headers: {
          
           'content-type': 'application/json'
           } 


    }
    
    )
  .then(response => {
    const { navigation } = this.props;

alert('Your phone number was verified successfully. Please Login');

     navigation.navigate("Login")
    
})
.catch(error => { 
  alert(error)
  //const key = Object.keys(error.response.data)[0]; 
  
//   this.setState({
//     setError:error.response.data[key][0]
//   })
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
    return (
      <View style={styles.container}>
          
         <View style={styles.midview}>
          <Icon style={{marginBottom:10}} name="phone-android" family="Ionicons" color='black' size={50} />
          <Text style={{marginBottom:10,fontWeight:'600'}} size={22}>Very your phone number</Text>
      <Text>An OTP has been sent to your phone number. Please enter it here</Text>
      </View>
      
     
      <OtpInputs getOtp={(otp) => this.getOtp(otp)} />
   

 



      <Block middle>
                      <Button color="primary" style={styles.createButton}
                       onPress={this.verify_otp}
                      >
                         {this.state.isLoading ?
                      <ActivityIndicator  size="large" color="#ffff" />
                      :
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CONTINUE
                        </Text>
                      }
                      </Button>
                    </Block>






                  

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      marginTop:50,
    flex: 1,
    alignContent:'flex-end',
   
  
    paddingTop: 20,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  midview:{
    justifyContent: 'center',
    alignItems:'center'
 
  },

  createButton: {
    width: width * 0.5,
    marginTop: 25
  }


});
