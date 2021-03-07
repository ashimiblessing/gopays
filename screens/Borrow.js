import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,FlatList, Animated,KeyboardAvoidingView,Alert,AsyncStorage ,
} from "react-native";
import { Block, Text, theme , Button as GaButton} from "galio-framework";

import { Button,Header, } from "../components";
import { Images, argonTheme,Tabs } from "../constants";
import { HeaderHeight } from "../constants/utils";
import {Picker} from '@react-native-picker/picker';

import { TextInput, Paragraph, Dialog, Portal } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import * as Network from 'expo-network';


const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

var tenure_step =1;







class Borrow extends React.Component {





  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      reason:"",
      amount:"",
      setError:"",
      active:null,
      tenure:'',
      tenureData:'',
      tenureStep:'',
    }


  }




  componentDidMount() {
    const { initialIndex } = this.props;
    initialIndex && this.selectMenu(initialIndex);





let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


  if(dtstr)
  {
     var dat = JSON.parse(dtstr);
      this.setState({tenureStep:dat.user.user_tenure_step});
     var loan_limit = dat.user.loan_limit;

var tenure_step = dat.user.user_tenure_step;



     if(tenure_step ==1)
     {
    this.setState({tenureData:[3,7,14]});
     }





     if(tenure_step ==2)
     {
       this.setState({tenureData:[3,7,14]});
     }

     if(tenure_step ==3)
     {

       this.setState({tenureData:[3,7,14]});

     }

     if(tenure_step ==4)
     {


       this.setState({tenureData: [3,7,14,21,28]});
     }














  }
      })


















  }






async validateVBorrow()
{

  var net =     await Network.getNetworkStateAsync();


  if(!net.isConnected)
{
  alert('Network unavailable. Please try with a better internet connection');

  return;
}














var amt = this.state.amount * 1;




if(amt <1000){alert('Please enter a value between N1000 and N1,000,000')

return;

}

if(!this.state.reason){alert('Please select a loan reason')

return;

}




if(!this.state.tenure)

{

  alert('Please select a loan tenure')

return;

}



//CurrentLoanOffer is the amount borrowable by user currently
let data = SecureStore.getItemAsync("is_loggedin").then(dataItem => {

  const borrow_load = {
    amount:amt,
    reason:this.state.reason,
    tenure:this.state.tenure,
    token:JSON.parse(dataItem).token,
  }



      SecureStore.setItemAsync('borrow_payload', JSON.stringify(borrow_load));





//attempt to give the loan


Alert.alert(
   "Loan confirmation",
   "You are about to request for  loan of NGN "+ amt+ " . The loan process will be initiated if you click proceed",
   [
     {
       text: "CANCEL",
       onPress: () => console.log("Ask me later pressed"),
        style: "cancel"
     },


     { text: "PROCEED", onPress: () => {AsyncStorage.setItem('loanToGive',amt+''); this.props.navigation.navigate("DummyLoading")} }
   ],
   { cancelable: false }
 );



})


}






  animatedValue = new Animated.Value(1);

  animate() {
    this.animatedValue.setValue(0);

    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 300,
      // useNativeDriver: true, // color not supported
    }).start()
  }

  menuRef = React.createRef();

  onScrollToIndexFailed = () => {
    this.menuRef.current.scrollToIndex({
      index: 0,
      viewPosition: 0.5
    });
  }

  selectMenu = (id) => {
    this.setState({ active: id });

    //this.props.navigation.navigate(id)
  }


















  render() {

 if(this.state.tenureData){
  var myList = this.state.tenureData.map((myValue,myIndex)=>{

    return(<Picker.Item label={myValue + ' Days '} value={myValue} key={myIndex}/>)



  });

 }

 else{


  var myList =  [3,7,14].map((myValue,myIndex)=>{


    return(<Picker.Item label={myValue + ' Days '} value={myValue} key={myIndex}/>)


  });




 }






        const { navigation } = this.props;

    return (
      <Block style={styles.profile}>
        <Block>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{  marginTop: '10%' }}
            >






            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled
            >

                             <Block center style={styles.formContain}>


                             <TextInput
                                 label="Loan amount"
                                 mode="flat"
                                 underlineColor="blue" style={styles.formi}
onChangeText={(text) => this.setState({ amount:text })}

keyboardType="numeric"

                               />

                               <Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                          The typical amount for new users is {'	\u20A6'}10,000
                                 </Text>
              </Block>







                            <Block space="around" style={{marginLeft:'5%',width:'95%', marginBottom: 15, marginTop:35 }}>
                            <Text size={14}>
                              Loan Reason
                            </Text>
                           <Picker

                   style={{ height: 50, }}

                   selectedValue={this.state.reason}
                       onValueChange={(itemValue, itemIndex) =>
                       this.setState({reason: itemValue})
                       }


                 >

                   <Picker.Item label="Select one" value="" />
                   <Picker.Item label="Housing" value="housing" />
                   <Picker.Item label="Fees" value="fees" />
                   <Picker.Item label="Family" value="family" />
                   <Picker.Item label="Goods" value="goods" />
                   <Picker.Item label="Other" value="tother" />

                  </Picker>

</Block>













<Block space="around" style={{marginLeft:'5%',width:'95%', marginBottom: 15, marginTop:15 }}>
                            <Text size={14}>
                             Loan Tenure
                            </Text>
                           <Picker

                   style={{ height: 50, }}

                   selectedValue={this.state.tenure}
                       onValueChange={(itemValue, itemIndex) =>
                       this.setState({tenure: itemValue})
                       }


                 >

                   <Picker.Item label="Select one" value="" />


                  {myList}

                  </Picker>

</Block>




















        </KeyboardAvoidingView>





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
                         color="primary"


   onPress={() => this.validateVBorrow()}
                       >
                         APPLY
                       </Button>
                     </Block>


                   </Block>







































                <Block flex>

                  <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                    <Block style={styles.divider} />
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
  formtext: {
    fontSize:12,
    marginTop:2,
    marginLeft:25,
    textAlign:'left',
    alignSelf:'flex-start',
  } ,



      formContain: {
   width:width,
   marginTop:50,

      } ,

      formi: {
        marginTop:10,
        backgroundColor:"white",
        width:width*0.9,
        fontSize:14,
        color:'#000',
      } ,



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

export default Borrow;
