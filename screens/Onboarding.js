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



        <Block flex space="around" style={styles.padded}>


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
                  <Text color={theme.COLORS.WHITE} size={16}>
                    Already have an account?
                  </Text>
                </Block>
              </Block>


              <Block style={{marginTop:30}} center>
                <Button
                  style={styles.button2}
                  color={argonTheme.COLORS.SECONDARY}
                  onPress={() => navigation.navigate("App")}
                  textStyle={{ color: argonTheme.COLORS.BLACK }}
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
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor:'blue',
    color:'white'
  },



  button2: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor:'white',
    color:'white'
  },


  logo: {
    width: 200,
    height: 60,
    zIndex: 20,
    position: 'relative',
    marginTop: '20%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 60
  }
});

export default Onboarding;
