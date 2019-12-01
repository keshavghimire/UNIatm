import React, { Component } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Header, SafeAreaView, Icon, Text, Card } from "@components";
import styles from "./styles";

export default class SearchHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            loading: false,
            popular: [
            //     { id: "1", keyword: "Kathmandu university" },
            //     { id: "2", keyword: "Pokhara university" },
            //     { id: "3", keyword: "NCIT" },
            //     { id: "4", keyword: "NIMS" },
            //     { id: "5", keyword: "HCOE" }
            // ],
            // discoverMore: [
            //     { id: "1", keyword: "Computer Science" },
            //     { id: "2", keyword: "Best IT College" },
            //     { id: "3", keyword: "Best For BBS" }
            // ],
            // recentlyView: [
            //     { id: "1", name: "MCIT", image: Images.trip1 },
            //     { id: "2", name: "MOLIHSS", image: Images.trip2 },
            //     { id: "3", name: "AIMS", image: Images.trip3 },
            //     { id: "4", name: "KMC", image: Images.trip4 }
            ]
        };
    }
    componentDidMount(){
        this.college();
     
       }
    college(){
        fetch('https://crm.uniatm.org/api/v1/colleges').then((response) =>response.json())
        .then((responsejson) => {
          this.setState({
            isloading:false,
          popular:responsejson.slice(0,3)
           
          })
    
        })
      }

    onSearch(keyword) {
        const { navigation } = this.props;
        const { search, popular } = this.state;
        const found = popular.some(item => item.keyword == keyword);
        let searchData = [];

        if (found) {
            searchData = popular.map(item => {
                return {
                    ...item,
                    checked: item.keyword == keyword
                };
            });
        } else {
            searchData = popular.concat({
                keyword: search
            });
        }
        this.setState(
            {
                search: keyword,
                popular: searchData,
                loading: true
            },
            () => {
                setTimeout(() => navigation.navigate("Place"), 1000);
            }
        );
    }

    render() {
        const { navigation } = this.props;
        const {
            search,
            popular,
            discoverMore,
            recentlyView,
            loading
        } = this.state;
        return (
            <SafeAreaView
                style={[
                    BaseStyle.safeAreaView,
                    { backgroundColor: BaseColor.whiteColor }
                ]}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Search"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="times"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    renderRight={() => {
                        if (loading) {
                            return (
                                <ActivityIndicator
                                    size="small"
                                    color={BaseColor.primaryColor}
                                />
                            );
                        }
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <View style={{ padding: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text =>
                                this.setState({ search: text })
                            }
                            autoCorrect={false}
                            placeholder="Search..."
                            placeholderTextColor={BaseColor.grayColor}
                            value={search}
                            selectionColor={BaseColor.primaryColor}
                            onSubmitEditing={() => {
                                this.onSearch(search);
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    search: ""
                                });
                            }}
                            style={styles.btnClearSearch}
                        >
                            <Icon
                                name="times"
                                size={18}
                                color={BaseColor.grayColor}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View style={styles.rowTitle}>
                            <Text headline>SEARCH HISTORY</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    this.setState({ popular: [] })
                                }
                            >
                                <Text caption1 accentColor>
                                    Clear
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}
                        >
                            {popular.map((item, index) => (
                                <TouchableOpacity
                                    style={[
                                        styles.itemHistory,
                                        item.checked
                                            ? {
                                                  backgroundColor:
                                                      BaseColor.primaryColor
                                              }
                                            : {}
                                    ]}
                                    onPress={() => this.onSearch(item.college)}
                                    key={"search" + index}
                                >
                                    <Text
                                        caption2
                                        style={
                                            item.checked
                                                ? {
                                                      color:
                                                          BaseColor.whiteColor
                                                  }
                                                : {}
                                        }
                                    >
                                        {item.college}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View style={styles.rowTitle}>
                            <Text headline>DISCOVER MORE</Text>
                            <TouchableOpacity>
                                <Text caption1 accentColor>
                                    Refresh
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{ flexDirection: "row", flexWrap: "wrap" }}
                        >
                             {popular.map((item, index) => (
                                <TouchableOpacity
                                    style={styles.itemHistory}
                                    key={"discover" + index}
                                >
                                    <Text caption2>{item.college}</Text>
                                </TouchableOpacity>
                            ))} 
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text headline>RECENTLY VIEWED</Text>
                        <FlatList
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            data={popular}
                            keyExtractor={(item, index) => item.id}
                            renderItem={({ item, index }) => (
                                <Card
                                    style={{
                                        width: 100,
                                        height: 100,
                                        marginRight: 20,
                                        marginTop: 5
                                        
                                    }}
                                    image={{uri:item.path}}
                                    onPress={() =>
                                        navigation.navigate("HotelDetail")
                                    }
                                >
                                    <Text style={{color:'white',fontWeight: '200',}}>
                                        {item.college}
                                    </Text>
                                </Card>
                            )}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
