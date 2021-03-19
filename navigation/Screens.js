import React from "react";
import { Easing, Animated, Dimensions } from "react-native";
import { Appbar } from 'react-native-paper';
import { NavigationActions } from 'react-navigation';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderBackButton } from '@react-navigation/stack';


 
import { Block } from "galio-framework";

// screens

import Register from "../screens/Register";
import Login from "../screens/Login";
import Borrow from "../screens/Borrow";
import Repay from "../screens/Repay";
import LoanHistory from "../screens/LoanHistory";
import BioData from "../screens/BioData";

import UserPerms from "../screens/UserPerms";
import DummyLoading from "../screens/DummyLoading";
import AddCard from "../screens/AddCard";
import OtpInput from "../screens/OtpInput";
import AddBank from "../screens/AddBank";




import Dashboard from "../screens/Dashboard";


import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Elements from "../screens/Elements";
import Articles from "../screens/Articles";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ElementsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Elements"
        component={Elements}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Elements" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
            <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function ArticlesStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Articles" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />






    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen"

    screenOptions={{
       headerShown: false
     }}

    >
      <Stack.Screen



        name="Profile"
        component={Profile}
        options={{

headerShown: true,


          header: ({ navigation, scene }) => (
            <Header

              title="Gopays"
              navigation={navigation}
              scene={scene}
              style={{height:60, alignSelf:'center',textAlign:'center'}}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },

        }}
      />


                 <Stack.Screen name="UserPerms" component={UserPermsStack} />





              <Stack.Screen name="Borrow" component={BorrowStack} 
              
              
              
              
              options={{
headerShown:true,
                title: 'Get a Loan',
                 
                        headerLeft: ({navigation, screenProps}) => (
                           <HeaderBackButton
                             {...props}
                             onPress={(navigation) => {  props.navigation.goBack() }}
                           />
                         ),
                
                        }}
              
              
              
              
              
              />
              
                <Stack.Screen name="Repay" component={RepayStack} 
                
                
                
                
                options={{
                  headerShown:true,
                                  title: 'Repay a Loan',
                                   
                                          headerLeft: ({navigation, screenProps}) => (
                                             <HeaderBackButton
                                               {...props}
                                               onPress={(navigation) => {  props.navigation.goBack() }}
                                             />
                                           ),
                                  
                                          }}
                
                
                
                
                
                />
                <Stack.Screen name="LoanHistory" component={LoanHistoryStack} 
                
                
                
                
                
                
                options={{
                  headerShown:true,
                                  title: 'Loan History',
                                   
                                          headerLeft: ({navigation, screenProps}) => (
                                             <HeaderBackButton
                                               {...props}
                                               onPress={(navigation) => {  props.navigation.goBack() }}
                                             />
                                           ),
                                  
                                          }}
                
                
                
                
                
                />
                  <Stack.Screen name="BioData" component={BioDataStack} 
                  
                  
                  
                  
                  options={{
                    headerShown:true,
                                    title: 'Edit Profile',
                                     
                                            headerLeft: ({navigation, screenProps}) => (
                                               <HeaderBackButton
                                                 {...props}
                                                 onPress={(navigation) => {  props.navigation.goBack() }}
                                               />
                                             ),
                                    
                                            }}
                  
                  
                  
                  
                  />












<Stack.Screen name="AddBank" component={AddBankStack} 
                
                
                
                
                
                
                options={{
                  headerShown:true,
                                  title: 'Add Bank Details',
                                   
                                          headerLeft: ({navigation, screenProps}) => (
                                             <HeaderBackButton
                                               {...props}
                                               onPress={(navigation) => {  props.navigation.goBack() }}
                                             />
                                           ),
                                  
                                          }}
                
                
                
                
                
                />




















                 <Stack.Screen name="DummyLoading" component={DummyLoadingStack} />
                  <Stack.Screen name="AddCard" component={AddCardStack} 
                  
                  
                  
                  
                  options={{
                    headerShown:true,
                                    title: 'Add Card',
                                     
                                            headerLeft: ({navigation, screenProps}) => (
                                               <HeaderBackButton
                                                 {...props}
                                                 onPress={(navigation) => {  props.navigation.goBack() }}
                                               />
                                             ),
                                    
                                            }}
                  
                  
                  
                  
                  
                  />



    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Home"

              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />







    </Stack.Navigator>
  );
}

function OnboardingStack(props) {

  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="Register" component={RegisterStack} />
       <Stack.Screen name="Login" component={LoginStack} />
       <Stack.Screen name="Profile" component={ProfileStack} />

    </Stack.Navigator>
  );
}









function AddCardStack(props) {
 return (
   <Stack.Navigator mode="card" headerMode="none">
     <Stack.Screen
       name="AddCard"
       component={AddCard}
       options={{

         header: ({ navigation, scene }) => (
           <Header

             title="Add a card"
             navigation={navigation}
             scene={scene}
           />
         ),
         cardStyle: { backgroundColor: "#FFFFFF" },

       }}

     />


        </Stack.Navigator>
      );
     }














     function AddBankStack(props) {
      return (
        <Stack.Navigator mode="card" headerMode="none">
          <Stack.Screen
            name="AddBank"
            component={AddBank}
            options={{
     
              header: ({ navigation, scene }) => (
                <Header
     
                  title="Bank Details"
                  navigation={navigation}
                  scene={scene}
                />
              ),
              cardStyle: { backgroundColor: "#FFFFFF" },
     
            }}
          />
      
        </Stack.Navigator>
      );
     }
     


















function BorrowStack(props) {
 return (
   <Stack.Navigator mode="card" headerMode="none">
     <Stack.Screen
       name="Borrow"
       component={Borrow}
       options={{

         header: ({ navigation, scene }) => (
           <Header

             title="Get a Loan"
             navigation={navigation}
             scene={scene}
           />
         ),
         cardStyle: { backgroundColor: "#FFFFFF" },

       }}
     />


 <Stack.Screen name="DummyLoading" component={DummyLoadingStack} />

   </Stack.Navigator>
 );
}






function UserPermsStack(props) {
 return (
   <Stack.Navigator mode="card" headerMode="none">
     <Stack.Screen
       name="UserPerms"
       component={UserPerms}
      options={{
          header: ({ navigation, scene }) => (
            <Header

              title="Gopays"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },

        }}
     />



 <Stack.Screen name="Borrow" component={BorrowStack} />



   </Stack.Navigator>
 );
}













function DummyLoadingStack(props) {
 return (
   <Stack.Navigator mode="card" headerMode="none">
    <Stack.Screen
        name="DummyLoading"
        component={DummyLoading}
        option={{
          headerTransparent: true
        }}
      />







   </Stack.Navigator>
 );
}












function RepayStack(props) {
 return (
   <Stack.Navigator mode="card" headerMode="none">
     <Stack.Screen
       name="Repay"
       component={Repay}
       options={{

         header: ({ navigation, scene }) => (
           <Header

             title="Repay Your Loan"
             navigation={navigation}
             scene={scene}
           />
         ),
         cardStyle: { backgroundColor: "#FFFFFF" },

       }}
     />

   </Stack.Navigator>
 );
}








function LoanHistoryStack(props) {
 return (
   <Stack.Navigator mode="card" headerMode="none">
     <Stack.Screen
       name="LoanHistory"
       component={LoanHistory}
       options={{

         header: ({ navigation, scene }) => (
           <Header

             title="Your previous loans"
             navigation={navigation}
             scene={scene}
           />
         ),
         cardStyle: { backgroundColor: "#FFFFFF" },

       }}
     />

   </Stack.Navigator>
 );
}
















 function RegisterStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Register"
        component={Register}
        option={{
          headerTransparent: true
        }}
      />
       <Stack.Screen name="OtpInput" component={OtpInputStack} />
       <Stack.Screen name="Login" component={LoginStack} />
    </Stack.Navigator>
  );
}





 function BioDataStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none"


    >
      <Stack.Screen
        name="BioData"
        component={BioData}
 

      />

    </Stack.Navigator>
  );
}





 function LoginStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Login"
        component={Login}
        option={{
          headerTransparent: true
        }}
      />
            <Stack.Screen name="BioData" component={BioDataStack} />
         <Stack.Screen name="Profile" component={ProfileStack} />
    </Stack.Navigator>
  );
}







function OtpInputStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="OtpInput"
        component={OtpInput}
        option={{
          headerTransparent: true
        }}
      />

     <Stack.Screen name="Login" component={LoginStack} />
    </Stack.Navigator>
  );
}




















 function DashboardStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        option={{
          headerTransparent: false
        }}

      />
        <Stack.Screen name="BioData" component={BioDataStack} />
    </Stack.Navigator>
  );
}




function CustomNavigationBar() {
  return (
    <Appbar.Header>
      <Appbar.Content title="My awesome app" />
    </Appbar.Header>
  );
}


const navigateAction = NavigationActions.navigate({
  routeName: 'SettingsScreen',
  params: {},
})



export default function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}

     


      initialRouteName="Profile"
    >



          <Drawer.Screen name="Onboarding" component={OnboardingStack}



          />
          <Drawer.Screen name="Dashboard" component={ProfileStack} />
          <Drawer.Screen name="View Profile" component={BioDataStack}

 
options={{
  headerShown:true,
                  title: 'Edit Profile',
                   
                          headerLeft: ({navigation, screenProps}) => (
                             <HeaderBackButton
                               {...props}
                               onPress={(navigation) => { console.log(props) }}
                             />
                           ),
                  
                          }}


        />
        <Drawer.Screen name="Borrow" component={BorrowStack} />
        <Drawer.Screen name="Manage Cards" component={AddCardStack} />
        <Drawer.Screen name="Loan History" component={LoanHistoryStack}



        options={{

          header: ({ navigation, scene }) => (
            <Header

              title="Your previous loans"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },

        }}




        />








    </Drawer.Navigator>
  );
}
