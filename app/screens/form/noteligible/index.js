import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { 
   Image,
  View,
  Text
   } from 'react-native';

 class HelloWorldApp extends Component {
   
 

 
   
  render() {
    const { navigation } = this.props;
    return (
        <View style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
        }}>

            <Image 
            
            source={{uri:'https://cdn11.bigcommerce.com/s-5wx3mh9/images/stencil/1280x1280/products/443/941/NOT_ELIGIBLE_Rubber_Stamp__84371.1471911696.gif?c=2'}}
                style={{resizeMode:'cover',
                height:80,
                width:200}} />
                <Text>
                  You are not eligible to ...........{"\n\n"}
                  you can go to......
                  
                </Text>

        </View>

      
      )
 }};
export default HelloWorldApp

