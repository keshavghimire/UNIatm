import React, { Component } from "react";
import { View, ScrollView, TextInput,Text,AsyncStorage } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Button } from "@components";
import styles from "./styles";
import axios from 'axios';
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            password:"",
            ConfirmPassword:"",
            loading: false,
            success: {
                name: true,
                email: true,
                address: true,
                password:true,
                ConfirmPassword:true,

            }
        };
    }
    // posting
    onSignUp(){
        const { navigation } = this.props;
        axios.post('https://crm.uniatm.org/api/v1/student/register', {
            
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password_confirmation:this.state.ConfirmPassword
      })
      .then(function (response) {
        console.log(response);
        const token = response.data.data.token
          AsyncStorage.setItem('tokenSignup',token)
        navigation.navigate("SignIn");

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  
    
     storeToken=async(token)=> {
        try {
           await AsyncStorage.setItem("token",token);
        } catch (error) {
          console.log("Something went wrong", error);
        }
    }
    // onSignUp() {
    //    // this.post();
    //     const { navigation } = this.props;
    //     let { name, email, address , password, ConfirmPassword, success} = this.state;

    //     if (name == "" || email == "" || address == "" || password == "" || ConfirmPassword== "" ) {
    //         this.setState({
    //             success: {
    //                 ...success,
    //                 name: name != "" ? true : false,
    //                 password: password != "" ? true : false,
    //                 ConfirmPassword: ConfirmPassword != "" ? true : false,
    //                 email: email != "" ? true : false,
    //                 address: address != "" ? true : false
    //             }
    //         });
    //     } else {
    //         if(password===ConfirmPassword){
    //         this.setState(
    //             {
    //                 loading: true
    //             },
    //             () => {
    //                 setTimeout(() => {
    //                     this.setState({
    //                         loading: false
    //                     });
    //                     navigation.navigate("SignIn");
    //                 }, 500);
    //             }
    //         );
    //     }}
    // }

    render() {
        const { navigation } = this.props;
        let { loading, name, email, address, success,password,ConfirmPassword } = this.state;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <Header
                    title="Sign Up"
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
                />
                <ScrollView>
                    <View style={styles.contain}>
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 65 }]}
                            onChangeText={text => this.setState({ name: text })}
                            autoCorrect={false}
                            placeholder="Name"
                            placeholderTextColor={
                                success.name
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={name}
                        />
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text =>
                                this.setState({ email: text })
                            }
                            autoCorrect={false}
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor={
                                success.email
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={email}
                        />
                         <TextInput
                            style={[BaseStyle.textInput,{ marginTop: 10 }]}
                            onChangeText={text => this.setState({ password: text })}
                            autoCorrect={false}
                            placeholder="Password"
                            placeholderTextColor={
                                success.password
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={password}
                        />
                         <TextInput
                            style={[BaseStyle.textInput,{ marginTop: 10 } ]}
                            onChangeText={text => this.setState({ ConfirmPassword: text })}
                            autoCorrect={false}
                            placeholder="Confirm password"
                            placeholderTextColor={
                                success.ConfirmPassword
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={ConfirmPassword}
                        />
                       
                        <TextInput
                            style={[BaseStyle.textInput, { marginTop: 10 }]}
                            onChangeText={text =>
                                this.setState({ address: text })
                            }
                            autoCorrect={false}
                            placeholder="Address"
                            placeholderTextColor={
                                success.address
                                    ? BaseColor.grayColor
                                    : BaseColor.primaryColor
                            }
                            value={address}
                        />
                       

                        <View style={{ width: "100%" }}>
                            <Button
                                full
                                style={{ marginTop: 20 }}
                                loading={loading}
                                onPress={() => this.onSignUp()}
                            >
                                Sign Up
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
