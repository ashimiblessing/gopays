import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar, ActivityIndicator, 
  KeyboardAvoidingView,TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon} from "../components";
import {   argonTheme } from "../constants";
import Images from "../constants/Images";
import axios from 'axios'; 

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

axios.defaults.baseURL = 'http://3.21.215.190';

class Register extends React.Component {
  


  constructor(props){
    super(props);
    this.state = {
    date:"",
isDatePickerVisible:false,
      isLoading:false,
      first_name:"",
      last_name:"",
      dob:"",
      phone:"",
      email:"",
      password:"",
      setError:""
    }
    this.regState = this.regState.bind(this);
    this.register = this.register.bind(this);
    global.errors = "";
  }






    showDatePicker()  {
    this.setDatePickerVisibility(true);
  };

   hideDatePicker ()  {
    this.setDatePickerVisibility(false);
  };

    handleConfirm   (date)   {

      const dt = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
          this.setState({date:dt});
          this.setState({dob:dt});
    
    this.hideDatePicker();

  };



   setDatePickerVisibility   (dstate)  {
       this.setState({isDatePickerVisible:dstate})
     };





  regState(event){

    this.setState({
      [event.target.name]:event.target.value,
    });

  // console.log(event.target.value);
  
     
  };

  register() {
    this.setState({isLoading:true})
    axios.post('/api/create-user',{
      firstname:this.state.first_name,
      lastname:this.state.last_name,
      email:this.state.email,
      password:this.state.password,
    },
    
    {
      headers: {
          
           'content-type': 'application/json'
           } 


    }
    
    )
  .then(response => {
    const { navigation } = this.props;
     navigation.navigate("Login")
    
})
.catch(error => { 
  alert(error)
  const key = Object.keys(error.response.data)[0]; 
  
  this.setState({
    setError:error.response.data[key][0]
  })
 this.setState({isLoading:false})
  //alert(error.response.data[key])
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
      </Block>



                <Block flex center style={styles.registerContainer}>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >

 <Block center style={styles.formContain}>
 <TextInput
     label="First name"
     mode="flat"
     underlineColor="blue" style={styles.formi}
     value={this.state.value}
                        onChangeText={(text) => this.setState({ first_name:text })}

   />

   <Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
      Your first name as seen on your bank account details.
     </Text>
                    </Block>




                    <Block center style={styles.formContain}>

                      <TextInput
                          label="Last name"
                          mode="flat"
                          underlineColor="blue" style={styles.formi}

                            
                        value={this.state.value}
                        onChangeText={(text) => this.setState({ last_name:text })}

                        />
                      <Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                         Your last name as seen on your bank account details.
                        </Text>
                                       </Block>






                    <Block  center style={styles.formContain}>
                    <TextInput
                        label="Email address"
                        mode="flat"
                        underlineColor="blue" style={styles.formi}

  value={this.state.value}
                        onChangeText={(text) => this.setState({ email:text })}

                      />

                      <Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                         For important notifications
                        </Text>

                                       </Block>





    




                           <Block center style={styles.formContain}>
               <TextInput
               KeyboardType="password"
               maxLength={6}
                   label="Pin"
                   mode="flat"
                   underlineColor="blue" style={styles.formi}

                     onChangeText={(text) => this.setState({ password:text })}

                 />

                 <Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
               Select Pin
                   </Text>
</Block>









 


                    <Block middle>
                      <Button color="primary" style={styles.createButton}
                       onPress={this.register}
                      >
                         {this.state.isLoading ?
                      <ActivityIndicator  size="large" color="#ffff" />
                      :
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
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
    marginTop: 25
  }
});

export default Register;