import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions, Picker
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import DateTimePicker from '@react-native-community/datetimepicker';

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";


class BioData extends React.Component {

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

 const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };


const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };


 const showDatepicker = () => {
    showMode('date');
  };












  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBa />
        
 <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="First Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
 
                    </Block>



           <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Middle Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
 
                    </Block>



 <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Last Name"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />

  

                    </Block>




  

           <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input onFocus={showDatepicker}
                        borderless
                        placeholder="DOB"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
 
                    </Block>


     {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}







 



                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>

 
                     

           <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input 
                        borderless
                        placeholder="Phone"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
 
                    </Block>
 



 






           <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Picker
   
  style={{ height: 50, width: 100 }}
  onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>

  <Picker.Item label="Type of Residence" value="" />
  <Picker.Item label="Rented" value="rented" />
  <Picker.Item label="Owned" value="owned" />
  <Picker.Item label="Family House" value="family-house" />
  <Picker.Item label="Employer Provided" value="employer-provided" />
  <Picker.Item label="Temporary" value="temporary" />

</Picker>

 
                    </Block>



  <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Picker
   
  style={{ height: 50, width: 100 }}
  onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>

  <Picker.Item label="Employment Status" value="" />
  <Picker.Item label="Employed" value="employed" />
  <Picker.Item label="Self-Employed" value="self-employed" />
  <Picker.Item label="Retired" value="retired" />
  <Picker.Item label="Unemployed" value="unemployed" />
  <Picker.Item label="Student" value="student" />

</Picker>

 
                    </Block>





           <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input 
                        borderless
                        placeholder="Monthly Income"
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="hat-3"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                          />
                        }
                      />
 
                    </Block>







                  </KeyboardAvoidingView>
 


        <Block>

 

      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor:'blue',
    color:'white'
  },



  button2: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor:'white',
    color:'white'
  },


  logo: {
    width: 200,
    height: 60,
    zIndex: 20,
    position: 'relative',
    marginTop: '20%'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 60
  }
});

export default Onboarding;
