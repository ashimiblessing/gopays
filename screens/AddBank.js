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

import { Button, Icon} from "../components";
import {   argonTheme } from "../constants";
import Images from "../constants/Images";
import axios from 'axios'; 

import DateTimePickerModal from "react-native-modal-datetime-picker";

import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get("screen");

axios.defaults.baseURL = 'http://3.21.215.190';
import * as SecureStore from 'expo-secure-store';

class AddBank extends React.Component {
  


  constructor(props){
    super(props);
    this.state = {
    date:"",
isDatePickerVisible:false,
      isLoading:false,
      account_number:"",
      bank_name:"",

 
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
          
 


               this.setState({bank_name:bank_info.bank_name});
               this.setState({account_number:bank_info.account_number});
                

                })
                .catch(error => {
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
          
        
        },
        config
        
        )
        .then(response => {
        
        
        
          this.props.navigation.navigate('Profile');
       
          alert(response.data.success);
        
        })
        .catch(error => {
            alert(error)
            return;
            const key = Object.keys(error.response.data)[0];
         this.setState({isLoading:false})
   
        if(error.response.data) {
          alert(error.response.data)
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
     mode="flat"
     underlineColor="blue" style={styles.formi}
     value={this.state.account_number}
                        onChangeText={(text) => this.setState({ account_number:text })}

   />

   <Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
     Your account number
     </Text>
                    </Block>




                    <Block center style={styles.formContain}>

                      <TextInput
                          label="Bank Name"
                          mode="flat"
                          underlineColor="blue" style={styles.formi}

                            
                        value={this.state.bank_name}
                        onChangeText={(text) => this.setState({ bank_name:text })}

                        />
                      <Text color={argonTheme.COLORS.MUTED} style={styles.formtext}>
                        Name of Bank
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