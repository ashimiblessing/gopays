import React, { createRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,View,
  ImageBackground,
  Platform,FlatList, Animated,SafeAreaView,
} from "react-native";
import { Block, Text, theme , Button as GaButton} from "galio-framework";


import PaystackWebView from 'react-native-paystack-webview';



import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { Button,Header, } from "../components";
import { Images, argonTheme,Tabs } from "../constants";
import { HeaderHeight } from "../constants/utils";


import repay_image from '../assets/repay.jpg'; 




const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const DATA = [
  {
    id: 'bd7acbea1',
    title: 'NGN 50000 at 12/2/2020 (Paid)',
  },
  {
    id: '3ac68af2',
    title: 'NGN 40000 at 12/2/2020 (Paid)',
  },
  {
    id: '58694a03',
    title: 'NGN 600000 at 12/2/2020 (Paid)',
  },
  {
    id: '58694a04',
    title: 'NGN 7000 at 12/2/2020 (Paid)',
  },

  {
    id: '58694a05',
    title: 'NGN 500 at 12/2/2020 (Paid)',
  },
];

var general_token ='';



class Repay extends React.Component {



  constructor() {
    super()
    this.paystackWebViewRef = createRef();
  }




  static defaultProps = {
    data: DATA,
    initialIndex: null,
  }

  state = {
    active: null,
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






           let userResponse =  {
            user: response.data.user,
            message: 'success',
            token: response.data.token
          }
      
          SecureStore.setItemAsync('userInfo', JSON.stringify(userResponse));
          SecureStore.setItemAsync('is_loggedin', JSON.stringify(response.data));


 
alert('Your repayment was successful');



          })
          .catch(error => {

      // alert('sorry, there was an error loading your information');
     // alert(error)

          })



  }



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
 
  


  render() {
        const { navigation } = this.props;
          const { data, ...props } = this.props;
    return (
      <Block flex style={styles.profile}>
        <Block flex>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '5%' }}
            >


<Block flex middle style={{marginTop:80}}>


<Image
        style={{width:width,height:300}}
        source={repay_image}
      />

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
      <PaystackWebView
        showPayButton={false}
        paystackKey="pk_test_dc8effc26e39ed2447d5b4da5748c5795f2f2d0a"
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
    medium
    style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}
    onPress={()=> this.paystackWebViewRef.current.StartTransaction()}
  >
 Pay Now
  </Button>
</Block>

 





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
