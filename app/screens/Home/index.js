import React, { Component } from "react";
import {
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Image,
  Text,
  Icon,
  Card,
  SafeAreaView,
  Tag,
  CardList
} from "@components";
import { BaseStyle, BaseColor, Images } from "@config";
import * as Utils from "@utils";
import styles from "./styles";
import Swiper from "react-native-swiper";

import {
  HomeListData,
  HomeBannerData
} from "@data";

export default class Home extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      banner: HomeBannerData,
      location: [
        { id: "1", name: "ACU - Australian Catholic University" },
        { id: "2", name: "University of Canberra" },
        { id: "3", name: "CQ University (CQU)" },
        { id: "4", name: "Kathmandu University" },
        { id: "5", name: "Charles Sturt University" }
      ],
      services:[] ,
      popular: [],
      list: HomeListData,
      heightHeader: Utils.heightHeader()
    };
    this._deltaY = new Animated.Value(0);
  }
  componentDidMount(){
   this.country();
   this.college();

  }
  country(){
    fetch('https://crm.uniatm.org/api/v1/countries').then((response) =>response.json())
    .then((responsejson) => {
      this.setState({
        isloading:false,
        services:responsejson
       
      })

    })
  }
  college(){
    fetch('https://crm.uniatm.org/api/v1/colleges').then((response) =>response.json())
    .then((responsejson) => {
      this.setState({
        isloading:false,
      popular:responsejson
       
      })

    })
  }
  

  /**
   * @description Show location on form searching
   * @author Passion UI <passionui.com>
   * @date 2019-09-01
   * @returns
   */
  renderLocation() {
    const { navigation } = this.props;
    return this.state.popular.slice(0,5).map((item, i) => {
      return (
        <Tag
          gray
          key={item.id}
          onPress={() => {}}
          style={{
            backgroundColor: BaseColor.fieldColor,
            marginTop: 5
          }}
        >
          <Text caption2>{item.college}</Text>
        </Tag>
      );
    });
  }

  render() {
    const { navigation } = this.props;
    const { banner, services, popular, list, heightHeader } = this.state;
    const heightImageBanner = Utils.scaleWithPixel(225);
    const marginTopBanner = heightImageBanner - heightHeader - 20;
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.imageBackground,
            {
              height: this._deltaY.interpolate({
                inputRange: [
                  0,
                  Utils.scaleWithPixel(150),
                  Utils.scaleWithPixel(150)
                ],
                outputRange: [heightImageBanner, heightHeader, 0]
              })
            }
          ]}
        >
          <Swiper
            dotStyle={{
              backgroundColor: BaseColor.textSecondaryColor
            }}
            activeDotColor={BaseColor.primaryColor}
            paginationStyle={styles.contentPage}
            removeClippedSubviews={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {banner.map((item, index) => {
              return (
                <Image key={item.id} source={item.image} style={{ flex: 1 }} />
              );
            })}
          </Swiper>
        </Animated.View>
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: "always" }}
        >
          <ScrollView
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { y: this._deltaY }
                }
              }
            ])}
            onContentSizeChange={() => {
              this.setState({
                heightHeader: Utils.heightHeader()
              });
            }}
            scrollEventThrottle={8}
          >
            <View style={[styles.searchForm, { marginTop: marginTopBanner }]}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SearchHistory")}
                activeOpacity={0.9}
              >
                <View
                  style={[
                    BaseStyle.textInput,
                    {
                      flexDirection: "row",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text body1 grayColor style={{ flex: 1 }}>
                    Search For Colleges
                  </Text>
                  <View style={styles.lineForm} />
                  <Icon
                    name="location-arrow"
                    size={18}
                    color={BaseColor.lightPrimaryColor}
                    solid
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.contentLocation}>
                {this.renderLocation()}
              </View>
            </View>
            {/* services */}
            <FlatList
              contentContainerStyle={{ padding: 20 }}
              data={services}
              numColumns={3}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.serviceItem}
                    onPress={() => navigation.navigate("Place")}
                  >
                    <View
                      style={[
                        styles.serviceCircleIcon,
                        { backgroundColor:"#b3b6b9" }
                      ]}
                    >
                      <Icon
                        name='flag'
                        size={20}
                        color={BaseColor.whiteColor}
                        solid
                      />
                    </View>
                    <Text
                      footnote
                      style={{
                        marginTop: 5,
                        marginBottom: 20
                        
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
            {/* Hiking */}
            <View style={styles.contentPopular}>
              <Text title3 semibold>
                Popular Colleges
              </Text>
              <Text body2 grayColor>
                Let find out career setting colleges.
              </Text>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={popular}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item, index }) => (
                <Card
                  style={[
                    styles.popularItem,
                    index == 0 ? { marginHorizontal: 20 } : { marginRight: 20 }
                  ]}
                  image={{uri:item.path}}
                  onPress={() => navigation.navigate("PlaceDetail",
                  {  'image': {uri: item.path},
                     'name':item.college,
                     'CollegeAddresh':item.address,
                     'contach':item.contact,
                     'website':item.website,
                     'openhour':item.openhour,
                     'description':item.description,
                    })}
                >
                  <Text headline whiteColor semibold>
                    {item.college}
                  </Text>
                </Card>
              )}
            />
            {/* Promotion */}
            <View
              style={{
                padding: 20
              }}
            >
              <Text title3 semibold>
                Recently Listed Colleges
              </Text>
              <Text body2 grayColor>
                This could be next destination.
              </Text>
              <FlatList
                style={{ marginTop: 20 }}
                data={popular}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <CardList
                   image={{uri:item.path}}
                    title={item.college}
                     subtitle={item.created_at}
                    style={{ marginBottom: 20  }}
                    onPress={() => navigation.navigate("PlaceDetail",
                  {  'image': {uri: item.path},
                     'name':item.college,
                     'CollegeAddresh':item.address,
                     'contach':item.contact,
                     'website':item.website,
                     'openhour':item.openhour,
                     'description':item.description,
                    })}
                  />
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
