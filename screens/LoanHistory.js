import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,View,  Platform,FlatList, Animated,SafeAreaView,
} from "react-native";
import { Block, Text, theme , Button as GaButton} from "galio-framework";

import { Button,Header, } from "../components";
import { Images, argonTheme,Tabs } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import history_image from '../assets/history.jpg';



const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

import * as SecureStore from 'expo-secure-store';

import axios from 'axios';


class LoanHistory extends React.Component {



  state = {
    active: null,
    loading:false,
    user:'',
     myArray: [],
      tableHead: ['Amount (NGN) ','Status','Loan Date','Payback Date', 'Due Date'],

  }

  componentDidMount() {


      let dt = SecureStore.getItemAsync("is_loggedin").then(dtstr => {


        if(dtstr)
        {
           var dat = JSON.parse(dtstr);
      this.setState({user:dat.first_name})


           const config = {
               headers: { Authorization: 'Bearer '+dat.token }
           };



           axios.post(
                '/api/loan_history',{
                foo:''

               },
             config
              )


                  .then(response => {

      var loan_hist =[];
      var lh = response.data.success;
      lh.forEach(function(item){
var it= [item.amount,item.loan_status,item.date,item.payback_date, item.due_date];
loan_hist.push(it);

      })

     // alert(loan_hist);return;


           this.setState({myArray:loan_hist})


                })
                .catch(error => {

             alert(JSON.stringify(error.response));

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





<Block flex middle style={{marginTop:50}}>


<Image
        style={{width:width,height:300}}
        source={history_image}
      />

</Block>

















            <Block flex style={styles.profileCard}>
              <Block middle>
            <Text
              bold
              color="#525F7F"
              size={24}
              style={{ marginBottom: 4 }}
            >

             Your Loans</Text>

              </Block>
              </Block>



   <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={{backgroundColor:'#fff'}}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={this.state.myArray} style={styles.row} textStyle={styles.text} />
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

  container: { flex: 1, padding: 5, paddingTop: 30, backgroundColor: '#fff' },
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

  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center', fontSize:12 }


});







export default LoanHistory;
