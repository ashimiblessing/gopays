import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,Alert,
  Platform,View
} from "react-native";
import { Block, Text, theme , Button as GaButton} from "galio-framework";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import axios from 'axios';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import * as Location from "expo-location";
import Spinner from 'react-native-loading-spinner-overlay';


const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;




import blue_image from '../assets/blue2.png';








class Profile extends React.Component {
  constructor(props){
    super(props);
    this.determineLoan = this.determineLoan.bind(this);

    this.state = {
      isLoading:false,
      setUserInfo:"",
      wallet_balance:"",
      outstanding_balance:"",
      loan_in_progress :'',
      loan_limit:"",
        spinner: false,


    }
    this.getUserData = this.getUserData.bind(this);
    global.errors = "";

const time_out = 5;

//check if logged in timeout

let dt = SecureStore.getItemAsync("lastLogin").then(dtstr => {

  if(dtstr)
  {
    const prev_login = Date.parse(JSON.parse(dtstr));

    const curr_date = Date.parse(new Date);
    const plus30 = new Date(prev_login + time_out*60000);

    if(plus30 < curr_date){
      SecureStore.deleteItemAsync('lastLogin');
      this.props.navigation.replace('Login');
      //alert("Please login");
    }

  }





});











  }











  checkBack(){






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
                  this.setState({loan_in_progress :user_info.loan_in_progress });

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
           this.setState({loan_in_progress :user_info.loan_in_progress });

          })
          .catch(error => {

              // alert('There was an error loading your information. Please check your network connection');

          })



  }
      })















  }






  async handlePerms() {

    const { status1, expires1, permissions1 } = await Permissions.askAsync(
      Permissions.CONTACTS,
      Permissions.CAMERA,
      Permissions.LOCATION,


    );

    if (status1 === 'granted') {
      var loc =  Location.getCurrentPositionAsync({enableHighAccuracy: true});

      const { datac } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.PHONE_NUMBERS],
  });


  if (datac.length > 0) {
       SecureStore.setItemAsync('contacts_info', JSON.stringify(datac));
         SecureStore.setItemAsync('current_location', JSON.stringify(loc));
     }


this.setState({spinner:false})

this.props.navigation.navigate("Borrow")

    } else {
      this.setState({spinner:false})
       alert('Please grant permissions to continue');

    }



  }












    async checkPerms() {
    this.setState({spinner:true})

      const { status, expires, permissions } = await Permissions.getAsync(
        Permissions.CONTACTS,
        Permissions.CAMERA,
        Permissions.LOCATION,
       );
       if (status !== 'granted') {
         Alert.alert(
            //title
            'Permissions Required',
            //body
            "Gopays needs access to your location and contacts. These data are used to inform our loan decisions and not shared with anyone.",
            [
              {
                text: 'Yes',
                onPress: () => {this.handlePerms()}
              },
              {
                text: 'No',
                onPress: () => console.log('No Pressed'), style: 'cancel'
              },
            ],
            {cancelable: false},
            //clicking out side of alert will not cancel
          );

       }

       else{
            var loc = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            SecureStore.deleteItemAsync('current_location');
              SecureStore.setItemAsync('current_location', JSON.stringify(loc));
                  this.setState({spinner:false})
                  console.log(loc);
                  this.props.navigation.navigate("Borrow")
       }




    this.setState({spinner:false})



    }





determineLoan()
{

  var outstanding_balance = this.state.outstanding_balance*1;
  var loan_in_progress = this.state.loan_in_progress;


  if(loan_in_progress > 0)
  {
    alert('You have a loan in progress');

    return;
  }



  if(outstanding_balance > 0 )
  {
    alert('Please repay your outstanding loan');
    return;
  }


this.checkPerms()







}










  LoanButton()
{
  var outstanding_balance = this.state.outstanding_balance*1;
  var loan_in_progress = this.state.loan_in_progress;


if(outstanding_balance > 0)
{
  return(    <Block>

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


             onPress={() => this.props.navigation.navigate("Repay")}
          >
          REPAY YOUR LOAN
          </Button>
        </Block>


      </Block>)
}


else if(loan_in_progress > 0)
{
  return(    <Block>

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


             onPress={() => alert('You have a loan in progress')}
          >
          LOAN IN PROGRESS
          </Button>
        </Block>


      </Block>)
}
else {
  return(    <Block>

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


      </Block>)
}



}










  render() {

    var outstanding_balance = this.state.outstanding_balance*1;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;






        const { navigation } = this.props;







    return (
      <Block flex style={styles.profile}>

      <Spinner
               visible={this.state.spinner}
               textContent={'Hold tight...'}
               textStyle={styles.spinnerTextStyle}
             />


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


 {this.LoanButton()}



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
                   {'\u20A6'} {outstanding_balance.toFixed(2)}
                  </Text>


                    </Block>



 </View>


                      <Block row space="around">





<Block middle>
<Button    onPress={() => this.determineLoan()} style={{ width: 50, height: 50,borderRadius:25 }}>

<Text style={{color:'#fff',fontSize:20}}>{'\u20A6'}</Text>

</Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Borrow</Text>
</Block>




<Block middle>
<Button    onPress={() => navigation.navigate('MyCards')} onlyIcon icon="credit-card"

iconFamily="Entypo" iconSize={20}
iconColor="#fff" style={{ width: 50, height: 50 }}></Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Cards</Text>
</Block>



<Block middle>
<Button      onPress={() => navigation.navigate('AddBank')} onlyIcon icon="wallet"

iconFamily="Entypo" iconSize={20} color=""
iconColor="#fff" style={{ width: 50, height: 50 }}></Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Bank Details</Text>
</Block>





</Block>



























                <Block row space="around"   style={{ marginTop: 40, paddingBottom: 14 }}>









<Block middle>
<Button   onPress={() => navigation.navigate("LoanHistory")}  onlyIcon icon="calendar"

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
<Button      onPress={() => {this.props.navigation.replace('Onboarding');   SecureStore.deleteItemAsync('is_loggedin');}} onlyIcon icon="close"

iconFamily="FontAwesome" iconSize={20} color=""
iconColor="#fff" style={{ width: 50, height: 50 }}></Button>


  <Text style={styles.but} color={argonTheme.COLORS.TEXT}>Logout</Text>
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
