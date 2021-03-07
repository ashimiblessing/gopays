import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,View
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




import blue_image from '../assets/blue2.png';









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

             alert('There was an error loading your information. Please check your network connection');

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

              // alert('There was an error loading your information. Please check your network connection');

          })



  }
      })















  }










determineLoan()
{







//                let data = SecureStore.getItemAsync("is_loggedin").then(userString => {
// let userx = JSON.parse(userString);

//   if(!userx.first_name )
//            {
//              alert('Please fill your profile to continue.');
//              this.props.navigation.navigate("BioData")
//            }

//                })











  let data2 = SecureStore.getItemAsync("CurrentLoanOffer").then(userString => {



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

    today = dd + '/' + mm + '/' + yyyy;














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





                <View source={blue_image} style={{width:width,height:200,flex:1,flexDirection:'column',

              marginTop: 5,marginBottom: 35, paddingTop:20,paddingLeft:20,paddingRight:20,paddingBottom:15 , backgroundColor:'#015CE1',

              }}>



                  <Block style={{flex:1, justifyContent:'space-between',flexDirection:'row'}}>

                  <Text size={13} color="#fff">
LOAN DETAILS
                  </Text>

                  <Text size={13} color="#fff">
{today}
                  </Text>

                  </Block>




                <Block style={{ flex:1, paddingBottom: 30, paddingTop: 0,alignSelf:'center', justifyContent:'center'}} >
                  <Text bold size={12} color="#fff">
                    YOU CURRENTLY OWE
                  </Text>

                  <Text bold size={32} color="#fff" style={{marginTop:10, fontWeight:'bold'}}>
                   {'\u20A6'} {this.state.outstanding_balance}
                  </Text>


                    </Block>



 </View>


                      <Block row space="around">





<Block middle>
<Button    onPress={() => this.determineLoan()} onlyIcon icon="credit"

iconFamily="Entypo" iconSize={20} color=""
iconColor="#fff" style={{ width: 50, height: 50 }}>warning</Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Borrow</Text>
</Block>




<Block middle>
<Button    onPress={() => this.determineRepay()} onlyIcon icon="calculator"

iconFamily="Entypo" iconSize={20}
iconColor="#fff" style={{ width: 50, height: 50 }}></Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Repayments</Text>
</Block>



<Block middle>
<Button      onPress={() => navigation.navigate('AddCard')} onlyIcon icon="credit-card"

iconFamily="Entypo" iconSize={20} color=""
iconColor="#fff" style={{ width: 50, height: 50 }}></Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Add Card</Text>
</Block>





</Block>



























                <Block row space="around"   style={{ marginTop: 40, paddingBottom: 14 }}>









<Block middle>
<Button   onPress={() => navigation.navigate("LoanHistory")}  onlyIcon icon="credit"

iconFamily="Entypo" iconSize={20} color=""
iconColor="#fff" style={{ width: 50, height: 50 }}>warning</Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Loan History</Text>
</Block>




<Block middle>
<Button    onPress={() => navigation.navigate("BioData")} onlyIcon icon="user"

iconFamily="Entypo" iconSize={20} color=""
iconColor="#fff" style={{ width: 50, height: 50 }}></Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>My Info</Text>
</Block>



<Block middle>
<Button      onPress={() => alert('coming soon')} onlyIcon icon="credit-card"

iconFamily="Entypo" iconSize={20} color=""
iconColor="#fff" style={{ width: 50, height: 50 }}></Button>


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
