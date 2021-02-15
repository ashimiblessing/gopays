import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,


  ScrollView,
  Image,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import * as SecureStore from 'expo-secure-store';
import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import axios from 'axios';


import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

axios.defaults.baseURL = 'http://3.21.215.190';
class GetPerm extends React.Component {





  render() {
        const { navigation } = this.props;
    return (

      <Block flex>
      <StatusBar hidden />
      <ScrollView style={{backgroundColor:"white"}}>

      <Block center>

        <Text bold size={15} style={{marginTop:90,marginBottom:10}}>
         Permissions required
        </Text>




      </Block>



                <Block flex center style={styles.registerContainer}>













               <Block center style={styles.formContain}>


<Text size={13}>
Gopays needs access to your location, contacts, SMS, browser history and installed apps.
These data are used to inform our loan decisions and not shared with anyone.

</Text>
</Block>





                    <Block middle>


                      <Button color="primary" style={styles.createButton}
                      onPress={ navigation.navigate("Borrow")}
                      >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Agree
                      </Text>
                      </Button>

                      <Button color="primary" style={styles.createButton}
                      onPress={ navigation.navigate("Profile")}
                      >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      Cancel
                      </Text>
                      </Button>


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

export default GetPerm;
