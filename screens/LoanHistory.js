import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,FlatList, Animated,SafeAreaView,
} from "react-native";
import { Block, Text, theme , Button as GaButton} from "galio-framework";

import { Button,Header, } from "../components";
import { Images, argonTheme,Tabs } from "../constants";
import { HeaderHeight } from "../constants/utils";

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





class LoanHistory extends React.Component {

  static defaultProps = {
    data: DATA,
    initialIndex: null,
  }

  state = {
    active: null,
  }

  componentDidMount() {
    const { initialIndex } = this.props;
    initialIndex && this.selectMenu(initialIndex);
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
      <Block flex style={styles.profile}>
        <Block flex>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width, marginTop: '5%' }}
            >

            <Block flex style={styles.profileCard}>
              <Block middle>
            <Text
              bold
              color="#525F7F"
              size={28}
              style={{ marginBottom: 4 }}
            >

             Hi, Blessing</Text>

              </Block>
              </Block>



  <Block flex >




                   </Block>





                <Block  middle style={{marginTop:20}}>

                <Text size={12}>
                  No loans available
                </Text>

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

export default LoanHistory;
