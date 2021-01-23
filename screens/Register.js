import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import axios from 'axios'; 
const { width, height } = Dimensions.get("screen");
axios.defaults.baseURL = 'https://salty-shore-73617.herokuapp.com';
class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
    
      firstname:"",
      lastname:"",
      email:"",
      password:""
    }
    this.regState = this.regState.bind(this);
    this.register = this.register.bind(this);
    global.errors = "";
  }


  regState(event){

    this.setState({
      [event.target.name]:event.target.value,
    });

  // console.log(event.target.value);
  
    
  };

  register() {
    this.setState({isLoading:true})
    axios.post('/api/create-user',{
      firstname:this.state.firstname,
      lastname:this.state.lastname,
      email:this.state.email,
      password:this.state.password,
      
  })
  .then(response => {
    const { navigation } = this.props;
     navigation.navigate("Login")
    
})
.catch(error => { 
  const key = Object.keys(error.response.data)[0]; 
   errors = error.response.data[key][0];
 this.setState({isLoading:false})
  console.log(errors)
})

  

  }

  render() {
        const { navigation } = this.props;



      
    return (
      <Block flex middle>
        <StatusBar hidden />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{ width, height, zIndex: 1 }}
        >
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex={0.15} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={22}>
                 Register Now
                </Text>
                
              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                     {/* {
                    errors &&
                   <Text color="red" size={12}>
                    {errors}
                  </Text> 
                
                  } */}
                  <Text color="#8898AA" size={12}>
                    Please fill in your details
                  </Text>                  
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        name="firstname"
                        borderless
                        placeholder="First Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.value}
                        onChangeText={(text) => this.setState({ firstname:text })}
                      />
 
                    </Block>

              <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                      name="lastname"
                        borderless
                        placeholder="Last Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.value}
                        onChangeText={(text) => this.setState({ lastname:text })}
                      />
                    </Block>

                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        name="email"
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.value}
                        onChangeText={(text) => this.setState({ email:text })}
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        name="password"
                        password
                        borderless
                        placeholder="Pin (4 Digits)"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                        value={this.state.value}
                        onChangeText={(text) => this.setState({ password:text })}
                      />
                      
                    </Block>
                    <Block row width={width * 0.75} style={styles.termtxt}>
                      <Text color={argonTheme.COLORS.MUTED}>
                          By creating an account, you hereby agree to our terms of service
                        </Text>
                      
                    </Block>
                    <Block middle>
                      {/* <Button color="primary" style={styles.createButton} 
                       onPress={() => navigation.navigate("Login")}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button> */}
                   
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
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  
  termtxt: {
    marginTop:10,
  } ,

  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
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
