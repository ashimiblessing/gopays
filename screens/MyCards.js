import React, { createRef } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,View,
  ImageBackground,
  Platform,FlatList, Animated,SafeAreaView, ActivityIndicator,
} from "react-native";
import { Block, Text, theme , Button as GaButton} from "galio-framework";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


import PaystackWebView from 'react-native-paystack-webview';



import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { Button,Header, } from "../components";
import { Images, argonTheme,Tabs } from "../constants";
import { HeaderHeight } from "../constants/utils";


import repay_image from '../assets/cardimg.png'; 




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



class MyCards extends React.Component {



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
    name:'',
    email:'',
    tableHead: ['CARD NUMBER','EXPIRY'],
    user_cards:'',
  }



 

  

handle_pay_success(res){

console.log(res)
  if(res)
  {
   
     const config = {
         headers: { Authorization: 'Bearer '+this.state.token }
     };

     this.setState({isLoading:true});

     axios.post(
          '/api/attach_card',{
            
            transaction_reference: res.data.transactionRef.reference,

         },
       config
        )


            .then(response => {


 var card_data = response.data.data;
var cards_screened =[]

 card_data.forEach(function(item){
    var it= [item.last4,item.expiry];
    cards_screened.push(it);
     
          })


 this.setState({user_cards:cards_screened});
 
 console.log(cards_screened)
alert(response.data.information);
this.setState({isLoading:false});


          })
          .catch(error => {

        //     const key = Object.keys(error.response.data);

        // alert(error.response.data[key]);

        alert(error)

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
              '/api/get_cards',{
              foo:''
    
             },
           config
            )
    
    
                .then(response => {
    
    
    
         var user_cards = response.data.data;
   
     
             this.setState({user_cards:user_cards});
            
    
              })
              .catch(error => {
                const key = Object.keys(error.response.data);
           alert('sorry, there was an error loading cards. ');
           alert(error.response.data[key])
    
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
              
            >


<Block flex middle style={{marginTop:30}}>


<Image
        style={{width:'50%',height:300,resizeMode:'contain'}}
        source={repay_image}
      />

</Block>





    









              <View>
      <PaystackWebView
        showPayButton={false}
        paystackKey="pk_test_70549a8e37bba3b850b89ae72898e5157321a628"
        amount='50'
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

        refNumber={'GOPAYS_'+Date.now()}


      />

         
  

 

<Block middle>
                      <Button color="primary" style={styles.createButton}
                        onPress={()=> this.paystackWebViewRef.current.StartTransaction()}
                      >
                         {this.state.isLoading ?
                      <ActivityIndicator  size="large" color="#ffff" />
                      :
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                       ADD CARD
                        </Text>
                      }
                      </Button>
                    </Block>





      </View>





      <View middle style={{width:'95%', justifyContent:'center', alignSelf:'center',marginTop:20}}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={{backgroundColor:'#fff'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={this.state.user_cards} style={styles.row} textStyle={styles.text} />
        </Table>
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

export default MyCards;