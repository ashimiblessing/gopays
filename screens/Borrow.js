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

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '3 Days',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '7 Days',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '15 Days',
  },
];


var loan_amounts={
  first_time:10000,
  second_time: 30000,
  third_time:70000
}





class Borrow extends React.Component {

  static defaultProps = {
    data: DATA,
    initialIndex: null,
  }





  constructor(props){
    super(props);
    this.state = {
      isLoading:false,
      reason:"",
      amount:"",
      setError:"",
      active:null,
    }


  }




  componentDidMount() {
    const { initialIndex } = this.props;
    initialIndex && this.selectMenu(initialIndex);
  }



validateVBorrow()
{
var amt = this.state.amount * 1;

if(amt <1000){alert('Sorry, you cannot borrow less that NGN 1000')

return;

}
var borrowable = 0;



//CurrentLoanOffer is the amount borrowable by user currently
let data = SecureStore.getItemAsync("CurrentLoanOffer").then(dataItem => {



if(dataItem == '' || typeof dataItem === 'undefined' )
{
 SecureStore.setItemAsync('CurrentLoanOffer', loan_amounts.first_time);
 borrowable = loan_amounts.first_time;

this.props.navigation.navigate("DummyLoading");

}
else{

 borrowable = dataItem;

 if(amt > borrowable*1){
   alert("Sorry, you can only borrrow "+ borrowable*1 + " at this time. Please adjust the amount");
   return;
 }

 else{
//attempt to give the loan


Alert.alert(
   "Loan confirmation",
   "You are about to request for  loan of NGN "+ amt+ " . The loan will process willbe initiated if you click proceed",
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







 }


}
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








  renderItem = (item) => {
    const isActive = this.state.active === item.id;

    const textColor = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [argonTheme.COLORS.BLACK, isActive ? argonTheme.COLORS.WHITE : argonTheme.COLORS.BLACK],
      extrapolate: 'clamp',
    });

    const containerStyles = [
      styles.titleContainer,
      !isActive && { backgroundColor: argonTheme.COLORS.SECONDARY },
      isActive && styles.containerShadow
    ];

    return (
      <Block style={containerStyles}>
        <Animated.Text
          style={[
            styles.menuTitle,
            { color: textColor }
          ]}
          onPress={() => this.selectMenu(item.id)}>
          {item.title}
        </Animated.Text>
      </Block>
    )
  }



  render() {
        const { navigation } = this.props;
          const { data, ...props } = this.props;
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







        </KeyboardAvoidingView>





  <Block flex >








                <Block middle style={{marginTop:40}}>
                  <Text
                    size={14}
                    color="#525F7F"

                  >
                  Loan term
                  </Text>

                </Block>
<Block middle style={{marginTop:1}}>


                  <FlatList
                     {...props}
                     data={data}
                     horizontal={true}
                     ref={this.menuRef}
                     extraData={this.state}
                     keyExtractor={(item) => item.id}
                     showsHorizontalScrollIndicator={false}
                     onScrollToIndexFailed={this.onScrollToIndexFailed}
                     renderItem={({ item }) => this.renderItem(item)}
                     contentContainerStyle={styles.menu}
                   />

                   </Block>



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
