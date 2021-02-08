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


import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");


class DummyLoading extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading:true,

    }


  }




  getLoanAmount(){
var loan_amounts={
  first_time:10000,
  second_time: 30000,
  third_time:70000
}






  }









  determineLoan()
  {
  }



  giveLoan(){

  }














  render() {
        const { navigation } = this.props;


setTimeout(function(){


      let data = SecureStore.getItemAsync("CurrentLoanOffer").then(userString => {



      if(userString == '' || typeof userString === 'undefined' )
      {
        alert('Please check back in a few minutes. If this takes beyond 72 hours kindly contact us')
        SecureStore.setItemAsync('CurrentLoanOffer', '10000');

        navigation.navigate('Profile');
      }
      else{

  //attempt to give loan
  SecureStore.setItemAsync('CurrentLoaned', '10000');
  alert("Loan request has been placed. We will notify you as soon as it is approved. ");

  navigation.navigate('Profile');

        //  this.props.navigation.navigate("Borrow")
      }
      })


}, 10000);



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
