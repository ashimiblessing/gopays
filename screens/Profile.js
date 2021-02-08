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
import * as SecureStore from 'expo-secure-store';
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      setUserInfo:"",


    }
    this.getUserData = this.getUserData.bind(this);

    global.errors = "";
  }
  getUserData(){
    let data = SecureStore.getItemAsync("userInfo").then(userString => {
      let userInfo = JSON.parse(userString);
      this.setState({
        setUserInfo:userInfo.user.first_name
      })

// alert(userInfo.user.dob )

    })



  }
  componentDidMount(){
    this.getUserData();



              let data = SecureStore.getItemAsync("isProfileSaved").then(userString => {



          if(userString !=='YES'  )
          {
            alert('Please fill your profile to continue');
            navigation.navigate("BioData")
          }
              })



                        let data2 = SecureStore.getItemAsync("CurrentLoanOffer").then(userString => {



               this.setState({current_limit:userString})
                        })








                        let data3 = SecureStore.getItemAsync("CurrentLoaned").then(userString => {



                        if(userString == '' || typeof userString === 'undefined' )
                        {

                        this.setState({current_loaned:0})
                        }
                        else{
                         var the_amt = userString;

                           this.setState({current_loaned:the_amt})
                        }
                        })













  }










determineLoan()
{

  let data = SecureStore.getItemAsync("CurrentLoanOffer").then(userString => {



  if(userString == '' || typeof userString === 'undefined' )
  {

  this.props.navigation.navigate("UserPerms")
  }
  else{
      this.props.navigation.navigate("Borrow")
  }
  })
}








  render() {














        const { navigation } = this.props;







    return (
      <Block flex style={styles.profile}>
        <Block flex>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '10%',textTransform: 'uppercase'}}
            >

            <Block flex style={styles.profileCard}>
              <Block middle>
            <Text
              bold
              color="#525F7F"
              size={16}
              style={{ marginBottom: 0 }}
            >

             Welcome, {this.state.setUserInfo}</Text>



              </Block>
              </Block>











  <Block flex >
                <Block style={styles.info}>

                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 0 }}
                  >

                    <Button
                      medium
                       color="primary"
                       style={{width:'90%'}}


                       onPress={() => this.determineLoan()}
                    >
                      APPLY FOR LOAN
                    </Button>
                  </Block>


                </Block>




                <Block row space="around"   style={{ marginTop: 35,marginBottom: 35, backgroundColor:'#f1f1f1' }}>
                <Block middle style={{ paddingBottom: 30, paddingTop: 30,}} >
                  <Text bold size={14} color="#333">
                    Wallet Balance: {'	\u20A6'} {this.state.current_loaned ? this.state.current_loaned :0}
                  </Text>


                    </Block>
                      </Block>













                <Block row space="around">
                  <Block middle>
                  <GaButton

                    onlyIcon
                    shadowless
                    icon="dollar"
                    iconFamily="Font-Awesome"
                    iconColor={icoColor}
                    iconSize={theme.SIZES.BASE *   1.425}
                     color={'transparent'}
                    style={[styles.social, styles.shadow]}
                    onPress={() => this.determineLoan()}
                  />
                    <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Borrow</Text>
                  </Block>
                  <Block middle>
                  <GaButton

                    onlyIcon
                    shadowless
                    icon="calculator"
                    iconFamily="Font-Awesome"
                    iconColor={icoColor}
                    iconSize={theme.SIZES.BASE *   1.425}
                     color={'transparent'}
                    style={[styles.social, styles.shadow]}
                      onPress={() => navigation.navigate("Repay")}
                  />
                    <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Repay</Text>
                  </Block>
                  <Block middle>
                  <GaButton

                    onlyIcon
                    shadowless
                    icon="credit-card"
                    iconFamily="Font-Awesome"
                    iconColor={icoColor}
                    iconSize={theme.SIZES.BASE *   1.425}
                       color={'transparent'}
                    style={[styles.social, styles.shadow]}
                    onPress={() => alert('coming soon')}
                  />
                    <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Cards</Text>
                  </Block>


                </Block>





                <Block row space="around"   style={{ marginTop: 20, paddingBottom: 24 }}>
                  <Block middle>
                  <GaButton

                    onlyIcon
                    shadowless
                    icon="history"
                    iconFamily="Font-Awesome"
                    iconColor={icoColor}
                    iconSize={theme.SIZES.BASE *   1.425}
                     color={'transparent'}
                    style={[styles.social, styles.shadow]}

                        onPress={() => navigation.navigate("LoanHistory")}

                  />
                    <Text style={styles.but} color={argonTheme.COLORS.TEXT}>History</Text>
                  </Block>
                  <Block middle>
                  <GaButton

                    onlyIcon
                    shadowless
                    icon="user"
                    iconFamily="Font-Awesome"
                    iconColor={icoColor}
                    iconSize={theme.SIZES.BASE *   1.425}
                       color={'transparent'}
                    style={[styles.social, styles.shadow]}
                      onPress={() => navigation.navigate("BioData")}
                  />
                    <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Info</Text>
                  </Block>
                  <Block middle>
                  <GaButton

                    onlyIcon
                    shadowless
                    icon="gift"
                    iconFamily="Font-Awesome"
                    iconColor={icoColor}
                    iconSize={theme.SIZES.BASE *   1.425}
                    color={'transparent'}
                    style={[styles.social, styles.shadow]}
                  />
                    <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Invite</Text>
                  </Block>


                </Block>








              </Block>
            </ScrollView>

        </Block>

      </Block>
    );
  }
}

const icoColor = '#333';

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

  social: {
  backgroundColor:'#fff',
  width:50,
  height:50,

  borderColor:'#fff',

  },


  but: {
fontSize:13

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
