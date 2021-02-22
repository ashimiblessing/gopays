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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import axios from 'axios';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      setUserInfo:"",
      wallet_balance:"",
      outstanding_balance:"",
      loan_limit:"",


    }
    this.getUserData = this.getUserData.bind(this);

    global.errors = "";
  }




determineRepay(){

if(this.state.outstanding_balance*1 < 1)
{
  alert('Looks like your outstanding balance is empty');

  return;
}


  this.props.navigation.navigate("Repay")

}









  getUserData(){
    let data = SecureStore.getItemAsync("userInfo").then(userString => {
      let userInfo = JSON.parse(userString);
      // this.setState({
      //   setUserInfo:userInfo.user.first_name
      // })

// alert(userInfo.user.dob )

    })



  }



  componentWillUnmount() {
    this._unsubscribe();
  }








  componentDidMount(){


    this._unsubscribe = this.props.navigation.addListener('focus', () => {
    
     

      let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


        if(dtstr)
        {
           var dat = JSON.parse(dtstr);
      
      
      
           const config = {
               headers: { Authorization: 'Bearer '+dat.token }
           };
      
      
      
           axios.post(
                '/api/me',{
                foo:''
      
               },
             config
              )
      
      
                  .then(response => {
      
      
      
           const user_info = response.data.user;
           const token_info = response.data.token;
      
      
      
      
               this.setState({loan_limit:user_info.loan_limit});
                this.setState({outstanding_balance:user_info.outstanding_balance});
                 this.setState({wallet_balance:user_info.wallet_balance});
      
                })
                .catch(error => {
      
             alert('sorry, there was an error loading your information');
      
                })
      
      
      
        }
            })
      
      
      
      
      
      

    });



    this.getUserData();

       
 



              
//get saved data




let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


  if(dtstr)
  {
     var dat = JSON.parse(dtstr);



     const config = {
         headers: { Authorization: 'Bearer '+dat.token }
     };



     axios.post(
          '/api/me',{
          foo:''

         },
       config
        )


            .then(response => {



     const user_info = response.data.user;
     const token_info = response.data.token;




         this.setState({loan_limit:user_info.loan_limit});
          this.setState({outstanding_balance:user_info.outstanding_balance});
           this.setState({wallet_balance:user_info.wallet_balance});

          })
          .catch(error => {

       alert('sorry, there was an error loading your information');

          })



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

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
   
     












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
              size={15}
              style={{ marginBottom: 0 }}
            >

             Need Money Now?</Text>



              </Block>
              </Block>











  <Block flex >
                <Block>

                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 0 }}
                  >

                    <Button
                      medium
                       color="primary"
                       style={{width:'85%'}}


                       onPress={() => this.determineLoan()}
                    >
                      APPLY FOR LOAN
                    </Button>
                  </Block>


                </Block>




                <Block   style={{ marginTop: 5,marginBottom: 35, backgroundColor:'#87eeee', paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:10 }}>

                  <Block style={{flex:1, justifyContent:'space-between',flexDirection:'row'}}> 
                  
                  <Text size={13}>
YOUR WALLET
                  </Text>

                  <Text size={13}>
{today}
                  </Text>
                  
                  </Block>




                <Block style={{ flex:1, paddingBottom: 30, paddingTop: 30,alignSelf:'center'}} >
                  <Text bold size={12} color="#333">
                    You Owe: 
                  </Text>

                  <Text bold size={22} color="#333" style={{marginTop:10, fontWeight:'bold'}}>
                   {'	\u20A6'}{this.state.outstanding_balance}
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
                    iconSize={theme.SIZES.BASE *   1.725}
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
                    iconSize={theme.SIZES.BASE *   1.725}
                     color={'transparent'}
                    style={[styles.social, styles.shadow]}
                    onPress={() => this.determineRepay()}
                  />
                    <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Repayments</Text>
                  </Block>
                  <Block middle>
                  <GaButton

                    onlyIcon
                    shadowless
                    icon="credit-card"
                    iconFamily="Font-Awesome"
                    iconColor={icoColor}
                    iconSize={theme.SIZES.BASE *   1.725}
                       color={'transparent'}
                    style={[styles.social, styles.shadow]}
                    onPress={() => navigation.navigate('AddCard')}
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
                    iconSize={theme.SIZES.BASE *   1.725}
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
                    iconSize={theme.SIZES.BASE *   1.725}
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
                    iconSize={theme.SIZES.BASE *   1.725}
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
  
    marginTop: 75,
    marginBottom:4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
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
