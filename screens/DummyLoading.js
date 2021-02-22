import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  ActivityIndicator,

  ScrollView,
  Image,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import * as SecureStore from 'expo-secure-store';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import * as Permissions from 'expo-permissions';
import axios from 'axios';


import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");


axios.defaults.baseURL = 'http://3.21.215.190';

class DummyLoading extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading:true,

    }


  }



 componentDidMount(){

   let data = SecureStore.getItemAsync("borrow_payload").then(pload => {


var payload= JSON.parse(pload)

const config = {
    headers: { Authorization: 'Bearer '+payload.token }
};



axios.post(
     '/api/calculate_loan',{
       amount:payload.amount,
       reason:payload.reason

    },
  config
   )


       .then(response => {

 
const user_info = response.data.user;
const token_info = response.data.token;


alert(response.data.info);



this.props.navigation.navigate('Profile');

     })
     .catch(error => {



      this.setState({isLoading:false})

     })


  })

 }


  render() {
        const { navigation } = this.props;


    return (

      <Block flex>
      <StatusBar hidden />
      <ScrollView style={{backgroundColor:"white"}}>

      <Block center>

        <Text bold size={15} style={{marginTop:90,marginBottom:10}}>
         Working..
        </Text>




      </Block>



                <Block flex center style={styles.registerContainer}>













               <Block center style={styles.formContain}>


<Text size={13}>
Please wait while we work on your loan. This might take some time
</Text>




</Block>

<Block style={{marginTop:50}}>
  <ActivityIndicator  size="large" color="primary" />

</Block>

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
    backgroundColor:'#4404c4'
  }
});

export default DummyLoading;
