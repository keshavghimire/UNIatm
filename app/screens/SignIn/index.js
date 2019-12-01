import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "@actions";
import { bindActionCreators } from "redux";
import { View, ScrollView, TouchableOpacity, TextInput ,AsyncStorage} from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, Text, Button } from "@components";
import styles from "./styles";
import axios from 'axios';
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      password: "",
      loading: false,
      ids:"",
      name:"",
      type:"",
      email:'',
      success: {
        id: true,
        password: true
      }
    };
  }

//   onLogin(){
//     const { navigation } = this.props;
//     axios.post('https://crm.uniatm.org/api/v1/student/login', {
        
       
//         email:this.state.id,
//         password:this.state.password,
//   })
//   .then(function (response) {
//     console.log(response);
//     console.log("response aahyo hai dost")
//       // const token = response.data.data.token
//       // this.storeToken(token)
//       navigation.navigate("Profile");

//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }




onLogin() {
  const { id, password, success } = this.state;
  const { navigation } = this.props;
  if (id == "" || password == "") {
    this.setState({
      success: {
        ...success,
        id: false,
        password: false
      }
    });
  } else {
    this.setState(
      {
        loading: true
      },
      () => {
        this.props.actions.authentication(true, response => {
          axios.post('https://crm.uniatm.org/api/v1/student/login', {
            email:this.state.id,
            password:this.state.password,
      })
      .then(function (response) {
        console.log(response);
          const token = response.data.data.token
          AsyncStorage.setItem('token',token)
          if (response) {
            const productToBeSaved = { 
                'ids':response.data.data.user.id,
                'name':response.data.data.user.name,
                'type':response.data.data.user.type ,
                'email':response.data.data.user.email ,
              }
             // alert(productToBeSaved)
           AsyncStorage.setItem('userData',JSON.stringify(productToBeSaved))
           navigation.navigate("Profile");
          } else {
            this.setState({
              loading: false
            });
          }
    
      })
      .catch(function (error) {
        console.log(error);
      });
         
        });
      }
    );
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
          title="Sign In"
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
              onChangeText={text => this.setState({ id: text })}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    id: true
                  }
                });
              }}
              autoCorrect={false}
              placeholder="Email"
              placeholderTextColor={
                this.state.success.id
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.id}
              selectionColor={BaseColor.primaryColor}
            />
            <TextInput
              style={[BaseStyle.textInput, { marginTop: 10 }]}
              onChangeText={text => this.setState({ password: text })}
              onFocus={() => {
                this.setState({
                  success: {
                    ...this.state.success,
                    password: true
                  }
                });
              }}
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={
                this.state.success.password
                  ? BaseColor.grayColor
                  : BaseColor.primaryColor
              }
              value={this.state.password}
              selectionColor={BaseColor.primaryColor}
            />
            <View style={{ width: "100%" }}>
              <Button
                full
                loading={this.state.loading}
                style={{ marginTop: 20 }}
                onPress={() => {
                  this.onLogin();
                }}
              >
                Sign In
              </Button>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text body1 grayColor style={{ marginTop: 25 }}>
               Create New Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text body1 grayColor style={{ marginTop: 25 }}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
