    import React, { Component } from "react";
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    RefreshControl,
    TextInput,
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import {
    Header,
    SafeAreaView,
    Icon,
    Text,
    StarRating,
    Tag,
    Image,
    RateDetail,
    CommentItem,
    PlaceItem,
    CardList,
    Button
} from "@components";
import { TabView, TabBar } from "react-native-tab-view";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Utils from "@utils";
import Category from "@screens/Category";
import styles from "./styles";

// Load sample data
import { PlaceListData, ReviewData } from "@data";

export default class PlaceDetail extends Component {
    constructor(props) {
        super(props);

        // Temp data define
        this.state = {
            collapseHour: true,
            index: 0,
            routes: [
                { key: "information", title: "Information" },
                { key: "College", title: "Courses" },
                { key: "map", title: "Review" },
                { key: "feedback", title: "Feedback" },
               
                
            ],
            heightHeader: Utils.heightHeader(),
            tabHeightSize: Utils.heightTabView(),
            information: [
                {
                    id: "1",
                    icon: "map-marker-alt",
                    title: "Address",
                    information:this.props.navigation.state.params.CollegeAddresh,
                },
                {
                    id: "2",
                    icon: "mobile-alt",
                    title: "Tel",
                    information: this.props.navigation.state.params.contach,
                },
                {
                    id: "3",
                    icon: "envelope",
                    title: "Email",
                    information: "abc@gmail.com"
                },
                {
                    id: "4",
                    icon: "globe",
                    title: "Website",
                    information:this.props.navigation.state.params.website,
                }
            ],
            workHours: [
                { id: "1", date: "Monday", hour: "09:0 AM - 18:00 PM" },
                { id: "2", date: "Tuesday", hour: "09:0 AM - 18:00 PM" },
                { id: "3", date: "Wednesday", hour: "09:0 AM - 18:00 PM" },
                { id: "4", date: "Thursday", hour: "09:0 AM - 18:00 PM" },
                { id: "5", date: "Friday", hour: "09:0 AM - 18:00 PM" },
                { id: "6", date: "Saturday", hour: "Close" },
                { id: "7", date: "Sunday", hour: "Close" }
            ]
        };
        this._deltaY = new Animated.Value(0);
    }

    // When tab is activated, set what's index value
    _handleIndexChange = index =>
        this.setState({
            index
        });

    // Customize UI tab bar
    _renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled
            indicatorStyle={styles.indicator}
            style={styles.tabbar}
            tabStyle={styles.tab}
            inactiveColor={BaseColor.grayColor}
            activeColor={BaseColor.textPrimaryColor}
            renderLabel={({ route, focused, color }) => (
                <View style={{ flex: 1, width: 130, alignItems: "center" }}>
                    <Text headline semibold={focused} style={{ color }}>
                        {route.title}
                    </Text>
                </View>
            )}
        />
    );

    // Render correct screen container when tab is activated
    _renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case "information":
                return (
                    <InformationTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
                case "College":
                return (
                    <College
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "feedback":
                return (
                    <Feedback
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
            case "map":
                return (
                    <Map jumpTo={jumpTo} navigation={this.props.navigation} />
                );
            case "review":
                return (
                    <ReviewTab
                        jumpTo={jumpTo}
                        navigation={this.props.navigation}
                    />
                );
        }
    };

    onCollapse() {
        Utils.enableExperimental();
        this.setState({
            collapseHour: !this.state.collapseHour
        });
    }

    render() {
        const { navigation } = this.props;
        const {
            heightHeader,
            tabHeightSize,
            information,
            workHours,
            collapseHour
        } = this.state;
        const heightImageBanner = Utils.scaleWithPixel(250, 1);
        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        styles.imgBanner,
                        {
                            height: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(140),
                                    Utils.scaleWithPixel(140)
                                ],
                                outputRange: [
                                    heightImageBanner,
                                    heightHeader,
                                    heightHeader
                                ]
                            })
                        }
                    ]}
                >
                    <Image source={this.props.navigation.state.params.image} style={{ flex: 1 }} />
                    <Animated.View
                        style={{
                            position: "absolute",
                            bottom: 15,
                            left: 20,
                            flexDirection: "row",
                            opacity: this._deltaY.interpolate({
                                inputRange: [
                                    0,
                                    Utils.scaleWithPixel(140),
                                    Utils.scaleWithPixel(140)
                                ],
                                outputRange: [1, 0, 0]
                            })
                        }}
                    >
                        
                    </Animated.View>
                </Animated.View>

                <SafeAreaView
                    style={BaseStyle.safeAreaView}
                    forceInset={{ top: "always" }}
                >
                    {/* Header */}
                    <Header
                        title=""
                        renderLeft={() => {
                            return (
                                <Icon
                                    name="arrow-left"
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        renderRight={() => {
                            return (
                                <Icon
                                    name="images"
                                    size={20}
                                    color={BaseColor.whiteColor}
                                />
                            );
                        }}
                        onPressLeft={() => {
                            navigation.goBack();
                        }}
                        onPressRight={() => {
                            navigation.navigate("PreviewImage");
                        }}
                    />
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
                                heightHeader: Utils.heightHeader(),
                                tabHeightSize: Utils.heightTabView()
                            });
                        }}
                        scrollEventThrottle={8}
                    >
                        <View style={{ height: 255 - heightHeader }} />
                        <View
                            style={{
                                paddingHorizontal: 20,
                                marginBottom: 20
                            }}
                        >
                            <View style={styles.lineSpace}>
                                <Text title1 semibold>
                                {this.props.navigation.state.params.name}
                                </Text>
                                {/* <Icon
                                    name="heart"
                                    color={BaseColor.lightPrimaryColor}
                                    size={24}
                                    style={{left:-20,top:10,}}
                                /> */}
                            </View>
                            <View style={styles.lineSpace}>
                                <View>
                                    <Text caption1 grayColor>
                                        Software
                                    </Text>
                                    <View style={styles.rateLine}>
                                        <Tag
                                            rateSmall
                                            style={{ marginRight: 5 }}
                                        >
                                            4.5
                                        </Tag>
                                        <StarRating
                                            disabled={true}
                                            starSize={10}
                                            maxStars={5}
                                            rating={4.5}
                                            fullStarColor={
                                                BaseColor.yellowColor
                                            }
                                        />
                                        <Text
                                            footnote
                                            grayColor
                                            style={{ marginLeft: 5 }}
                                        >
                                            (620)
                                        </Text>
                                    </View>
                                </View>
                               
                                
                            </View>
                            {information.map(item => {
                                return (
                                    <View style={styles.line} key={item.id}>
                                        <View style={styles.contentIcon}>
                                            <Icon
                                                name={item.icon}
                                                size={16}
                                                color={BaseColor.whiteColor}
                                            />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text caption2 grayColor>
                                                {item.title}
                                            </Text>
                                            <Text
                                                footnote
                                                semibold
                                                style={{ marginTop: 5 }}
                                            >
                                                {item.information}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}

                            <View style={styles.line}>
                                <View style={styles.contentIcon}>
                                    <Icon
                                        name="clock"
                                        size={16}
                                        color={BaseColor.whiteColor}
                                    />
                                </View>
                                <View style={styles.contentInforAction}>
                                    <View>
                                        <Text caption2 grayColor>
                                           Admission
                                        </Text>
                                        <Text
                                            footnote
                                            semibold
                                            style={{ marginTop: 5 }}
                                        >
                                           {this.props.navigation.state.params.openhour}
                                        </Text>
                                        
                                    </View>
                                    
                                  
                                </View>
                               
                            </View>
                            
                        </View>
                        <Tag status 
                         onPress={()=>  navigation.navigate("Apply")}
                        style={{height:30,width:'80%',left:'3%'}}>Apply Now </Tag>
                        <View
                            style={{
                                height: tabHeightSize
                            }}
                        >
                            <TabView
                                lazy
                                swipeEnabled={true}
                                navigationState={this.state}
                                renderScene={this._renderScene}
                                renderTabBar={this._renderTabBar}
                                onIndexChange={this._handleIndexChange}
                            />
                           
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

/**
 * @description Show when tab Information activated
 * @author Passion UI <passionui.com>
 * @date 2019-09-01
 * @class PreviewTab
 * @extends {Component}
 */
class InformationTab extends Component {
    constructor(props) {
        super();
        this.state = {
            list: PlaceListData,
            relate: PlaceListData.slice(2, 4),
            facilities: [
                { id: "1", icon: "wifi", name: "Free Wifi", checked: true },
                { id: "2", icon: "bath", name: "Clean environment" },
                { id: "3", icon: "paw", name: "Transportation" },
                { id: "4", icon: "bus", name: "Friendly Environment" },
                { id: "5", icon: "cart-plus", name: "Modern Technology " },


            ]
        };
    }

    render() {
        const { list, relate, facilities } = this.state;
        const { navigation } = this.props;
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                    <Text body2 style={{ lineHeight: 20,height:98 }}>
                      {this.props.navigation.state.params.description}
                    </Text>
                    <View
                        style={{
                            paddingVertical: 15,
                            flexDirection: "row",
                            borderBottomWidth: 1,
                            borderColor: BaseColor.textSecondaryColor
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text caption1 grayColor>
                                Date Established
                            </Text>
                            <Text headline style={{ marginTop: 5 }}>
                                Sep 26, 2009
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text caption1 grayColor>
                                Price Range
                            </Text>
                            <Text headline style={{ marginTop: 5 }}>
                                RS.2 lakhs to RS.10 lakhs
                            </Text>
                        </View>
                    </View>
                </View>
               
                <Text
                    title3
                    semibold
                    style={{
                        paddingHorizontal: 20,
                        paddingTop: 15,
                        paddingBottom: 5
                    }}
                >
                    Facilities
                </Text>
                <View style={styles.wrapContent}>
                    {facilities.map(item => {
                        return (
                            <Tag
                                icon={
                                    <Icon
                                        name={item.icon}
                                        size={12}
                                        color={BaseColor.accentColor}
                                        solid
                                        style={{ marginRight: 5 }}
                                    />
                                }
                                chip
                                key={item.id}
                                style={{
                                    marginTop: 10,
                                    marginRight: 10
                                }}
                            >
                                {item.name}
                            </Tag>
                        );
                    })}
                     
                </View>
                
                
              
                
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={list}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item, index }) => (
                        <PlaceItem
                            grid
                            image={item.image}
                            title={item.title}
                            subtitle={item.subtitle}
                            phone={item.phone}
                            rate={item.rate}
                            status={item.status}
                            rateStatus={item.rateStatus}
                            numReviews={item.numReviews}
                            onPress={() => navigation.navigate("PlaceDetail")}
                            style={{ marginLeft: 20}}
                        />
                    )}
                />
              
                
            </ScrollView>
        );
    }
}
class College extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render() {
        
        return (
           <Category/>
        );
    }
}

/**
 * @description Show when tab Feedback activated
 * @author Passion UI <passionui.com>
 * @date 2019-09-01
 * @class PreviewTab
 * @extends {Component}
 */
class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 4.5,
            title: "",
            review: ""
        };
    }

    render() {
        const { rate, title, review } = this.state;
        return (
            <View style={{ alignItems: "center", padding: 20 }}>
                <View style={{ width: 160 }}>
                    <StarRating
                        starSize={26}
                        maxStars={5}
                        rating={rate}
                        selectedStar={rating => {
                            this.setState({ rate: rating });
                        }}
                        fullStarColor={BaseColor.yellowColor}
                        containerStyle={{ padding: 5 }}
                    />
                    <Text caption1 grayColor style={{ textAlign: "center" }}>
                        Tap a star to rate
                    </Text>
                </View>
                <TextInput
                    style={[BaseStyle.textInput, { marginTop: 10 }]}
                    onChangeText={text => this.setState({ title: text })}
                    autoCorrect={false}
                    placeholder="Title"
                    placeholderTextColor={BaseColor.grayColor}
                    value={title}
                    selectionColor={BaseColor.primaryColor}
                />
                <TextInput
                    style={[
                        BaseStyle.textInput,
                        { marginTop: 20, height: 140 }
                    ]}
                    onChangeText={text => this.setState({ review: text })}
                    textAlignVertical="top"
                    multiline={true}
                    autoCorrect={false}
                    placeholder="Reviews"
                    placeholderTextColor={BaseColor.grayColor}
                    value={review}
                    selectionColor={BaseColor.primaryColor}
                />
                <Button full style={{ marginTop: 20 }} onPress={() => {}}>
                    Sent
                </Button>
            </View>
        );
    }
}

/**
 * @description Show when tab Map activated
 * @author Passion UI <passionui.com>
 * @date 2019-09-01
 * @class PreviewTab
 * @extends {Component}
 */
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateDetail: {
                point: 4.7,
                maxPoint: 5,
                totalRating: 25,
                data: ["80%", "10%", "10%", "0%", "0%"]
            },
            reviewList: [
                {
                    id: "1",
                    source: Images.profile3,
                    name: "MR.Sital",
                    rate: 4,
                    date: "Jun 2018",
                    title: "Nice Place",
                    comment:
                        "Lorem ipsum dolor purus in efficitur aliquam, enim enim porttitor lacus, ut sollicitudin nibh neque in metus. adipiscing elit. Aliqam at turpis orci. Mauris nisl, in mollis acu  tincidunt. neque nec turpis aliquet, ut ornare velit molestie. "
                },
                {
                    id: "2",
                    source: Images.profile4,
                    name: "MRs.sita",
                    rate: 4,
                    date: "Jun 2018",
                    title: "Great for families",
                    comment:
                        "Lorem ipsum dolor adipiscing elit. Aliquam at turpis orci. Mauris nisl, in mollis arcu  tincidunt. Integer consectetur neque nec turpis aliquet, ut ornare velit molestie. Suspendisse sagittis, justo sit amet consectetur maximus"
                }
            ]
        };
    }

    render() {
        let { rateDetail, reviewList } = this.state;
        return (
            <FlatList
                style={{ padding: 20 }}
                refreshControl={
                    <RefreshControl
                        colors={[BaseColor.primaryColor]}
                        tintColor={BaseColor.primaryColor}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {}}
                    />
                }
                data={reviewList}
                keyExtractor={(item, index) => item.id}
               
                renderItem={({ item }) => (
                    <CommentItem
                        style={{ marginTop: 10 }}
                        image={item.source}
                        name={item.name}
                        rate={item.rate}
                        date={item.date}
                        title={item.title}
                        comment={item.comment}
                    />
                )}
            />
        );
    }
}
   

