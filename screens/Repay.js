import React, { createRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,View,
  ImageBackground,
  Platform,FlatList, Animated,SafeAreaView,Alert,
} from "react-native";
import { Block, Text, theme , Button as GaButton} from "galio-framework";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import PaystackWebView from 'react-native-paystack-webview';
import Spinner from 'react-native-loading-spinner-overlay';


import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { Button,Header, } from "../components";
import { Images, argonTheme,Tabs } from "../constants";
import { HeaderHeight } from "../constants/utils";


import repay_image from '../assets/repay.jpg';




const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;


var general_token ='';



class Repay extends React.Component {



  constructor(props) {
    super(props)

    this.LoanButton = this.LoanButton.bind(this);
    this.paystackWebViewRef = createRef();



  }





  state = {
    active: null,
    name:'',
    email:'',
    pay_succeed:false,
    tableHead: ['CARD NUMBER','ACTION'],
  user_cards:[],
    spinner: false,
  }



handle_pay_success(res){



  if(res)
  {

     const config = {
         headers: { Authorization: 'Bearer '+this.state.token }
     };



     axios.post(
          '/api/update_paid',{
          amount_paid:this.state.outstanding_balance

         },
       config
        )


            .then(response => {



     const user_info = response.data.user;
     const token_info = response.data.token;




         this.setState({loan_limit:user_info.loan_limit});
          this.setState({outstanding_balance:user_info.outstanding_balance});
           this.setState({wallet_balance:user_info.wallet_balance});





          //
          //  let userResponse =  {
          //   user: response.data.user,
          //   message: 'success',
          //   token: response.data.token
          // }

          // SecureStore.setItemAsync('userInfo', JSON.stringify(userResponse));
          // SecureStore.setItemAsync('is_loggedin', JSON.stringify(response.data));



          this.setState({pay_succeed:true});
alert('Your repayment was successful');



          })
          .catch(error => {

      // alert('sorry, there was an error loading your information');
     // alert(error)

          })



  }



}




payWithCard(last4,email)
{

  this.setState({spinner:true});


      let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


        if(dtstr)
        {
           var dat = JSON.parse(dtstr);
      general_token = dat.token

      this.setState({token:dat.token});
           const config = {
               headers: { Authorization: 'Bearer '+dat.token }
           };



           axios.post(
                '/api/charge_old_card',{
                last4:last4,
                amount:this.state.outstanding_balance,
                card_email:email,

               },
             config
              )


                  .then(response => {



                    this.setState({ spinner: false });



console.log(response.data.success)

var fresh_data = response.data.data;


         this.setState({loan_limit:fresh_data.loan_limit});
          this.setState({outstanding_balance:fresh_data.outstanding_balance});
           this.setState({wallet_balance:fresh_data.wallet_balance});

           setTimeout(() => {
          alert(response.data.information);
           }, 100);





                })
                .catch(error => {
                  // const key = Object.keys(error.response.data);


                                      this.setState({ spinner: false });

                                      setTimeout(() => {
                                   alert('sorry, there was an error loading cards');
                                   alert(error)
                                      }, 100);



          //   alert(error.response.data[key])

                })



        }
            })













}












  componentDidMount() {


    let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


      if(dtstr)
      {
         var dat = JSON.parse(dtstr);
    general_token = dat.token

    this.setState({token:dat.token});
         const config = {
             headers: { Authorization: 'Bearer '+dat.token }
         };



         axios.post(
              '/api/get_cards',{
              foo:''

             },
           config
            )


                .then(response => {



                  var card_data = response.data.data.cards;
                  var user_info = response.data.data.user;
                 var cards_screened =[]

                  card_data.forEach((item) => {



                     var it= [" Card ending with "+ item.last4, <Button small style={{ backgroundColor: argonTheme.COLORS.PRIMARY,width:'90%'}} onPress={()=> this.payWithCard(item.last4,item.card_email)} > USE  </Button> ];
                     cards_screened.push(it);

                           })


                  this.setState({user_cards:cards_screened});


                  //user Details


                               this.setState({loan_limit:user_info.loan_limit});
                                this.setState({outstanding_balance:user_info.outstanding_balance});
                                 this.setState({wallet_balance:user_info.wallet_balance});









              })
              .catch(error => {
                // const key = Object.keys(error.response.data);
           alert('sorry, there was an error loading cards. ');
        //   alert(error.response.data[key])

              })



      }
          })














  }









  LoanButton()
{
  var outstanding_balance = this.state.outstanding_balance*1;



if(outstanding_balance > 0)
{
  return(

<>
    <PaystackWebView
    showPayButton={false}
    paystackKey="pk_live_4cb31d85e9e27b470242219a4f3241a1f31b35bc"
    amount={this.state.outstanding_balance}
    billingEmail="joe@getnada.com"
    billingMobile="09787377462"
    billingName="Gopays User"
    ActivityIndicatorColor="green"
    SafeAreaViewContainer={{marginTop: 5}}
    SafeAreaViewContainerModal={{marginTop: 5}}
    onCancel={(e) => {
      alert('your payment was cancelled')
    }}
    onSuccess={(res) => {
     this.handle_pay_success(res)
    }}
    ref={this.paystackWebViewRef}

    refNumber={Math.random()+'GPa'+Math.random()}


  />



<Block
middle
row
space="evenly"
style={{ marginTop: 20 }}
>

<Button

style={{ backgroundColor: argonTheme.COLORS.PRIMARY,width:'90%', }}
onPress={()=> this.paystackWebViewRef.current.StartTransaction()}
>
Pay Now
</Button>




</Block>

</>

  )
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


             onPress={() => this.props.navigation.navigate("Borrow")}
          >
            APPLY FOR LOAN
          </Button>
        </Block>


      </Block>)
}



}





















  render() {
        const { navigation } = this.props;
          const { data, ...props } = this.props;
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
              style={{ width, marginTop: '5%' }}
            >


<Block flex middle style={{marginTop:80}}>

















</Block>





            <Block flex style={styles.profileCard}>
              <Block middle>
            <Text
              bold
              color="#525F7F"
              size={14}
              style={{ marginBottom: 4 }}
            >

             Your outstanding balance is:</Text>
             <Text size={28}  style={{ marginTop: 10 }}>
                NGN {this.state.outstanding_balance}
             </Text>


              </Block>
              </Block>









              <View style={{flex: 1}}>
              {this.LoanButton()}

<Block middle style={{marginTop:20}}>

<Text style={{fontSize:16}}>Use Saved Cards</Text>

</Block>

<View middle style={{width:'95%', justifyContent:'center', alignSelf:'center',marginTop:20}}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={{backgroundColor:'#fff'}}>
        <Row data={this.state.tableHead}   />
        <Rows data={this.state.user_cards} style={styles.row} textStyle={styles.text}    />
      </Table>
    </View>



      </View>









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
    marginTop: 15,
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
  },


  container: {
    width: width,
    backgroundColor: theme.COLORS.BLACK,
    zIndex: 2,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
  },
  menu: {
    paddingHorizontal: theme.SIZES.BASE * 2.5,
    paddingTop: 8,
    paddingBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
    backgroundColor: argonTheme.COLORS.ACTIVE,
    borderRadius: 4,
    marginRight: 9
  },
  containerShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  menuTitle: {
    fontWeight: '600',
    fontSize: 14,
    // lineHeight: 28,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: argonTheme.COLORS.MUTED
  },


});

export default Repay;
