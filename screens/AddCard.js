import * as React from 'react';
import {
 
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';

import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { Block, Checkbox, Text, theme } from "galio-framework";
import { Images, argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


var formData ='';
 
class AddCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
     
     card_number:'',
     card_expiry:'',
     card_cvc:'',
     card_type:'',
     card_name:'',
     last_four_digits:'',
     card_middle_message:'',
    }
  

  }




   _onChange(form){
if(form.valid)
 {
  formData=form;

 
  
 }

  } 



  componentDidMount(){

    let dt = SecureStore.getItemAsync("my_card").then(cardst => {
    
if(cardst){

var cardstr = JSON.parse(cardst);

 
  this.setState({ 
    card_number:cardstr.card_number,
    card_expiry:''+cardstr.card_expiry+'',
    card_type:''+cardstr.card_type+'',
    card_cvv:cardstr.card_cvc,
    last_four_digits: cardstr.last_four_digits,
    card_middle_message:'card ending in',
  
  });

}



    })



  }

  

save_card(){
 this.setState({isLoading:true})

  let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


    if(dtstr)
    {
       var dat = JSON.parse(dtstr);
  
 
  
       const config = {
           headers: { Authorization: 'Bearer '+dat.token,
          
          
          
          
          }
       };
  



var card_no_split = formData.values.number.split(' ')[3]




  var card_payload = { 
    card_number:formData.values.number,
    card_expiry:''+formData.values.expiry+'',
    card_type:''+formData.values.type+'',
    card_cvv:formData.values.cvc,
    last_four_digits: card_no_split
 
  };


this.setState({ 
  card_number:formData.values.number,
  card_expiry:''+formData.values.expiry+'',
  card_type:''+formData.values.type+'',
  card_cvv:formData.values.cvc,
  last_four_digits: card_no_split,
  card_middle_message:'card ending in',

});


  
  SecureStore.setItemAsync('my_card', JSON.stringify(card_payload));

  this.props.navigation.navigate('Profile');
  alert('Card was successfully added');
  
  
  
    }
        })
  
  
}














  render() {
    const { navigation } = this.props;
return(
<Block style={{marginTop:20}}>

<Text size={17} style={{textAlign:'center', margin:10}}>Update Card Details</Text>


<CreditCardInput onChange={this._onChange} />

<Block middle style={{marginTop:20}}>
<Button color="primary" style={styles.createButton}
                       onPress={() => this.save_card()}
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

<Block style={{marginTop:50, marginLeft:20}}>
<Text size={17}>Current card: {this.state.card_type} {this.state.card_middle_message} {this.state.last_four_digits}</Text>
<Text size={15}>
   


</Text>



</Block>


</Block>



)


  }


}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default AddCard;
