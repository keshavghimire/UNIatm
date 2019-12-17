import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity,AsyncStorage } from "react-native";
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";

// Load sample data
import { UserData } from "@data";
const statusUrl='http://crm.uniatm.org/api/v1/student/edit-profile'
export default class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id:'',
            name:'',
            email:'',
            address:'',
            image: UserData[0].image,
            loading: false,
            data:''
        };
    }
    componentDidMount(){
        this._retrieveData();
        
    }
    stausCheck=()=>{
  
        const data={
          
            user_id:idValue,
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            
        }
        axios.post(statusUrl,data).then((response) => {
        
         const responseData = JSON.parse(JSON.stringify(response))
         console.log("response data",responseData)
          this.setState({
            loadingStatus:false,
            checkStatus:true
          })
      
         
      
        })
        .catch((error) => {
          console.log(error);
        });
      }
      
    
    

    /**
     * @description Simple logout with Redux
     * @author Passion UI <passionui.com>
     * @date 2019-09-01
     */
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('userData');
          
          if (value !== null) {
           const data=JSON.parse(value);
           this.setState({
                
                id:data.ids,
                name:data.name,
                email:data.email,
                address:data.address
            })
               
            
           console.log(value);
          }
        } catch (error) {
            //alert("value")
          // Error retrieving data
         
        }
      };
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Edit Profile"
                    renderLeft={() => {
                        return (
                            <Icon
                                name="arrow-left"
                                size={20}
                                color={BaseColor.primaryColor}
                            />
                        );
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    onPressRight={() => {}}
                />
                <ScrollView>
                    <View style={styles.contain}>
                        <View>
                            <Image
                                source={this.state.image}
                                style={styles.thumb}
                            />
                        </View>
                        <View style={styles.contentTitle}>
                            <Text headline semibold>
                                Account
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text => this.setState({ id: text })}
                            autoCorrect={false}
                            placeholder="Input ID"
                            placeholderTextColor={BaseColor.grayColor}
                            value={"@"+this.state.name}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <View style={styles.contentTitle}>
                            <Text headline semibold>
                                Name
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                           
                            autoCorrect={false}
                            placeholder="Input Name"
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                            selectionColor={BaseColor.primaryColor}
                        />
                        <View style={styles.contentTitle}>
                            <Text headline semibold>
                                Email
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                            autoCorrect={false}
                            placeholder="Input Email"
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.email}
                        />
                        <View style={styles.contentTitle}>
                            <Text headline semibold>
                                Address
                            </Text>
                        </View>
                        <TextInput
                            style={BaseStyle.textInput}
                            onChangeText={text =>
                                this.setState({ address: text })
                            }
                            autoCorrect={false}
                            placeholder="Input Address"
                            placeholderTextColor={BaseColor.grayColor}
                            value={this.state.address}
                            selectionColor={BaseColor.primaryColor}
                        />
                    </View>
                </ScrollView>
                <View style={{ padding: 20 }}>
                    <Button
                        loading={this.state.loading}
                        full
                        onPress={() => {
                            this.setState(
                                {
                                    loading: true
                                },
                                () => {
                                    setTimeout(() => {
                                        navigation.goBack();
                                    }, 500);
                                }
                            );
                        }}
                    >
                        Confirm
                    </Button>
                </View>
            </SafeAreaView>
        );
    }
}
