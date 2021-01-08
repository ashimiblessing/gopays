import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";


class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />



        <Block center>
          <Image source={Images.LogoOnboarding}  style={styles.logo} />
        </Block>


        <Block center style={{marginTop:40}}>
                        <Text style={styles.subTop}>
                          Welcome to Gopays!
                        </Text>
                      </Block>



        <Block  style={styles.padded}>


            <Block  style={{ zIndex: 2 }}>



              <Block center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => navigation.navigate("Register")}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
                >
                  Register
                </Button>

  <Block style={styles.subTitle}>
                  <Text style={styles.subBottom}>
                    Already have a Gopays account?
                  </Text>
                </Block>
              </Block>


              <Block style={{marginTop:20}} center>
                <Button
                  style={styles.button}
                  color={argonTheme.COLORS.INFO}
                  onPress={() => navigation.navigate("Login")}
                  textStyle={{ color: argonTheme.COLORS.WHITE }}
                >
                  Login
                </Button>


              </Block>





          </Block>



        </Block>




      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.DEFAULT
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "absolute",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
    bottom:55
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor:'#4404c4',
    color:'white'
  },



  button2: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: '#4404c4',
    color:'white'
  },


  logo: {
    width: 160,
    height: 27,
    zIndex: 20,
    position: 'relative',
    marginTop: '20%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 60
  },



  subTop: {
  color:'#4404c4',
  fontSize:23,
  fontWeight:'bold'

  },

  subBottom: {
  color:'#4404c4',
  fontSize:16,


  },



});

export default Onboarding;
