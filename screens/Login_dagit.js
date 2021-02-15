import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import * as SecureStore from 'expo-secure-store';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import axios from 'axios';

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
    this.setState({isLoading:true})
    axios.post('/api/login',{
      email:this.state.email,
      password:this.state.password,
      
  })
  .then(response => {
    
    let userResponse =  {
      user: response.data.user,
      message: response.data.message,
      token: response.data.token
    } 
    
    SecureStore.setItemAsync('userInfo', JSON.stringify(userResponse));
    const { navigation } = this.props;
     navigation.navigate("Profile")
    
})
.catch(error => { 
  const key = Object.keys(error.response.data)[0]; 
  
   this.setState({
     setError:error.response.data[key][0]
   })
 this.setState({isLoading:false})
  console.log(error)
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
                 Login
                </Text>

              </Block>
              <Block flex>
                <Block flex={0.17} middle>
                {this.state.setError ?
                  <Text color="red" size={12}>
                    {/* Email/Password is invalid */}
                    {this.state.setError}
                  </Text>
                  :
                  <Text color="red" size={12}>
              
                  </Text>
                 
                }
                  
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                      name="email"
                        borderless
                        placeholder="email"
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

                    <Block middle>
                      {/* <Button color="primary" style={styles.createButton}
                       onPress={() => navigation.navigate("Profile")}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Login
                        </Text>
                      </Button> */}
                        
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

export default Login;
