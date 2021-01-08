import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme , Button as GaButton} from "galio-framework";

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  render() {
        const { navigation } = this.props;
    return (
      <Block flex style={styles.profile}>
        <Block flex>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '5%' }}
            >

            <Block flex style={styles.profileCard}>
              <Block middle>
            <Text
              bold
              color="#525F7F"
              size={28}
              style={{ marginBottom: 4 }}
            >

             Welcome, Blessing</Text>
             <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
               Credit Limit - NGN 300,000
             </Text>


              </Block>
              </Block>











  <Block flex >
                <Block style={styles.info}>

                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20 }}
                  >

                    <Button
                      medium
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                       onPress={() => navigation.navigate("Borrow")}
                    >
                      APPLY FOR LOAN
                    </Button>
                  </Block>


                </Block>




                <Block row space="around"   style={{ marginTop: 35,marginBottom: 35, backgroundColor:argonTheme.COLORS.PRIMARY }}>
                <Block middle style={{ paddingBottom: 30, paddingTop: 30,}} >
                  <Text bold size={20} color="#fff">
                    Current Debt: NGN 27
                  </Text>


                    </Block>
                      </Block>













                <Block row space="around">
                  <Block middle>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="money"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.125}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}
                    onPress={() => navigation.navigate("Borrow")}
                  />
                    <Text size={15} color={argonTheme.COLORS.TEXT}>Borrow</Text>
                  </Block>
                  <Block middle>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="calculator"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.125}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}
                      onPress={() => navigation.navigate("Repay")}
                  />
                    <Text size={15} color={argonTheme.COLORS.TEXT}>Repay</Text>
                  </Block>
                  <Block middle>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="credit-card"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.125}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}
                    onPress={() => alert('coming soon')}
                  />
                    <Text size={15} color={argonTheme.COLORS.TEXT}>Cards</Text>
                  </Block>


                </Block>





                <Block row space="around"   style={{ marginTop: 20, paddingBottom: 24 }}>
                  <Block middle>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="history"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.125}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}

                        onPress={() => navigation.navigate("LoanHistory")}

                  />
                    <Text size={15} color={argonTheme.COLORS.TEXT}>Loan History</Text>
                  </Block>
                  <Block middle>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="user"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.125}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}
                      onPress={() => navigation.navigate("BioData")}
                  />
                    <Text size={15} color={argonTheme.COLORS.TEXT}>Info</Text>
                  </Block>
                  <Block middle>
                  <GaButton
                    round
                    onlyIcon
                    shadowless
                    icon="gift"
                    iconFamily="Font-Awesome"
                    iconColor={theme.COLORS.WHITE}
                    iconSize={theme.SIZES.BASE * 1.125}
                    color={theme.COLORS.FACEBOOK}
                    style={[styles.social, styles.shadow]}
                  />
                    <Text size={15} color={argonTheme.COLORS.TEXT}>Invite</Text>
                  </Block>


                </Block>








              </Block>
            </ScrollView>

        </Block>

      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height / 2
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default Profile;
