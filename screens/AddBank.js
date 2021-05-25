import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar, ActivityIndicator,
  KeyboardAvoidingView,TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import {Picker} from '@react-native-picker/picker';

import { Button, Icon} from "../components";
import {   argonTheme } from "../constants";
import Images from "../constants/Images";
import axios from 'axios';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

axios.defaults.baseURL = 'http://18.198.103.233';
import * as SecureStore from 'expo-secure-store';

const banksList = ['Abbey Mortgage Bank','Access Bank','Access Bank (Diamond)','ALAT by WEMA','ASO Savings and Loans','Bowen Microfinance Bank','CEMCS Microfinance Bank','Citibank Nigeria','Coronation Merchant Bank','Ecobank Nigeria','Ekondo Microfinance Bank','Eyowo','Fidelity Bank','First Bank of Nigeria','First City Monument Bank','FSDH Merchant Bank Limited','Globus Bank','Guaranty Trust Bank','Hackman Microfinance Bank','Hasal Microfinance Bank','Heritage Bank','Ibile Microfinance Bank','Infinity MFB','Jaiz Bank','Keystone Bank','Kuda Bank','Lagos Building Investment Company Plc.','Mayfair MFB','One Finance','PalmPay','Parallex Bank','Parkway - ReadyCash','Paycom','Petra Mircofinance Bank Plc','Polaris Bank','Providus Bank','Rand Merchant Bank','Rubies MFB','Sparkle Microfinance Bank','Stanbic IBTC Bank','Standard Chartered Bank','Sterling Bank','Suntrust Bank','TAJ Bank','TCF MFB','Titan Bank','Union Bank of Nigeria','United Bank For Africa','Unity Bank','VFD Microfinance Bank Limited','Wema Bank','Zenith Bank'];

var banksPicker   = banksList.map((myValue,myIndex)=>{

    return(<Picker.Item label={myValue} value={myValue} key={myIndex}/>)



  });

class AddBank extends React.Component {



  constructor(props){
    super(props);
    this.state = {
    date:"",
isDatePickerVisible:false,
      isLoading:false,
      account_number:"",
      account_name:'',
      bank_name:'',


    }




    this.save_bank = this.save_bank.bind(this);





  }







  componentDidMount(){



    let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


        if(dtstr)
        {
           var dat = JSON.parse(dtstr);



           const config = {
               headers: { Authorization: 'Bearer '+dat.token }
           };



           axios.post(
                '/api/my_bank',{
                foo:''

               },
             config
              )


                  .then(response => {



           const bank_info =  response.data.data;


if(bank_info && typeof bank_info.bank_name !== null)
{

  this.setState({bank_name:bank_info.bank_name});
  this.setState({account_number:bank_info.account_number});
    this.setState({account_name:bank_info.account_name});
}



                })
                .catch(error => {
                  this.setState({loading:false});
alert(error)
           //  alert('There was an error loading your information. Please check your network connection');

                })



        }
            })




 }
















  save_bank() {


    if(!this.state.account_number || !this.state.bank_name)
    {
        alert('Please fill all fields');
        return;
    }


    this.setState({isLoading:true})


    let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


        const dat = JSON.parse(dtstr);

            const config = {
              headers: { Authorization: 'Bearer '+dat.token }
          };
        //alert(BVN);return;


          axios.post('/api/save_bank',{
            bank_name:this.state.bank_name,
            account_number:this.state.account_number,
            account_name:this.state.account_name,


        },
        config

        )
        .then(response => {



          this.props.navigation.navigate('Profile');

          alert(response.data.success);

        })
        .catch(error => {
        
          
            
         this.setState({isLoading:false})

        if(error.response.data) {
          const key = Object.keys(error.response.data)[0];
          alert(error.response.data[key])
        }

        else{
          alert(error)
        }


        //

        })



        })





  }






  render() {
        const { navigation } = this.props;
    return (

      <Block flex>
      <StatusBar hidden />
      <ScrollView style={{backgroundColor:"white"}}>

      <Block center style={{marginTop:40}}>
       <Text size={20}>Bank Details</Text>
      </Block>



                <Block flex center style={styles.registerContainer}>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >

 <Block center style={styles.formContain}>
 <TextInput
 keyboardType="numeric"
     label="Account Number"
     editable={!this.state.account_number ? true:false}
     mode="flat"
     underlineColor="blue" style={styles.formi}
     value={this.state.account_number}
                        onChangeText={(text) => this.setState({ account_number:text })}

   />


                    </Block>




                    <Block center style={styles.formContain}>
                    <TextInput
                    editable={!this.state.account_number ? true:false}
                        label="Account Name"
                        mode="flat"
                        underlineColor="blue" style={styles.formi}
                        value={this.state.account_name}
                                           onChangeText={(text) => this.setState({ account_name:text })}

                      />


                                       </Block>




                    <Block center style={styles.formContain}>









                        <Block space="around" style={{marginLeft:'5%',width:'100%',   marginTop:35 }}>
                        <Text color={argonTheme.COLORS.MUTED}>
                          Name of Bank
                          </Text>

                                                   <Picker
                                            emabled={!this.state.account_number ? true:false}
                                           style={{ height: 50, }}

                                           selectedValue={this.state.bank_name}
                                               onValueChange={(itemValue, itemIndex) =>
                                               this.setState({bank_name: itemValue})
                                               }


                                               selectedValue={this.state.bank_name}

                                         >

                                           <Picker.Item label="Select one" value="" />


                                          {banksPicker}

                                          </Picker>

                        </Block>














                                       </Block>





















<Block middle>
<Text style={{color:argonTheme.COLORS.MUTED,marginHorizontal:10, marginTop:20}}>
WARNING:  Make sure you add the correct bank details. This is where your funds will be sent to
</Text>
</Block>
                    <Block middle>





                      <Button color="primary" style={styles.createButton}
                       onPress={this.save_bank}
                      >
                         {this.state.isLoading ?
                      <ActivityIndicator  size="large" color="#ffff" />
                      :
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                         Save
                        </Text>
                      }
                      </Button>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
                </ScrollView>
              </Block>


    );
  }
}

const styles = StyleSheet.create({


    formContain: {
 width:width*0.9
    } ,

  formtext: {
    fontSize:12,
    marginTop:2,
    marginLeft:2,
    textAlign:'left',
    alignSelf:'flex-start',
  } ,


  logo: {
    width: 160,
    height: 27,
    zIndex: 20,
    position: 'relative',
    marginTop: '20%'
  },


  formi: {
    marginTop:10,
    backgroundColor:"white",
    width:width*0.9,
    fontSize:14,
    color:'#000',
  } ,



  registerContainer: {
    width: width * 0.98,

    backgroundColor: "#fff",



  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default AddBank;
