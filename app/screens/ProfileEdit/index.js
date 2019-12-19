import React, { Component } from "react";
import { View, ScrollView, TextInput, TouchableOpacity,AsyncStorage ,PermissionsAndroid} from "react-native";
import ImagePicker from 'react-native-image-picker';
import { BaseStyle, BaseColor, Images } from "@config";
import { Image, Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";
import axios from "axios"

// Load sample data
import { UserData } from "@data";
const Editprofil='http://crm.uniatm.org/api/v1/student/edit-profile'
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
            data:'',
            photo:''
        };
    }
    componentDidMount(){
        this._retrieveData();
        
    }
    _editprofil=()=>{
        const data={
            user_id:this.state.id,
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            //photo:this.state.photo
        }
        axios.post(Editprofil,data).then((response) => {
         const productToBeSaved = { 
            'ids':response.data.data.id,
            'name':response.data.data.name,
            'type':response.data.data.type ,
            'email':response.data.data.email ,
            'photo':this.state.photo
          }
         
       AsyncStorage.setItem('userData',JSON.stringify(productToBeSaved))
       alert("Please re-load App")
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
                address:data.address,
                photo:data.photo
            })
           console.log(value);
          }
        } catch (error) {
            //alert("value")
          // Error retrieving data
         
        }
      };

      async _camara() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const options = {
              quality: 1.0,
              maxWidth: 500,
              maxHeight: 500,
              storageOptions: {
                skipBackup: true
              }
            };
            ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);
        
              if (response.didCancel) {
                console.log('User cancelled photo picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                let source =  response.uri
        
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                  this.setState({
                    photo:source
                  })
    }});
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
     
    }



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
                        <TouchableOpacity
                        onPress={()=>this._camara()}>
                            <Image
                                source={this.state.photo == '' ? this.state.image : {uri:this.state.photo}}
                                style={styles.thumb}
                            />
                        </TouchableOpacity>
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
                            this._editprofil()
                            this.setState(
                                {
                                    loading: true,
                                    
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
