import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity ,StyleSheet,Image

} from 'react-native';
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Initiate="https://khalti.com/api/payment/initiate/";
const confirm="https://khalti.com/api/payment/confirm/";
const Verification="https://khalti.com/api/v2/payment/verify/";
 
  export default class index extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        mobile:9860111702,
        amount:10000,
        token:'',
        code:'',
        pin:1828,
        step:0,
        res:'',
        VerificationResponse:'',
        publickey:"live_public_key_4cb9e7052d0b454c92a42d81db4a1ec1"
      };
    }
    Initiate(){
    
      const data1={
        
        public_key:this.state.publickey,
        mobile:this.state.mobile,
        amount:this.state.amount,
        product_identity: "book/id-120",
        product_name: "A Song of Ice and Fire"
          
      }
      fetch(Initiate, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
      })
     
      .then((response) => response.json())
      .then((responseText) => {
        const responseData = JSON.parse(JSON.stringify(responseText))
        console.log(responseData)
        try{
          
          const restoken = responseData.token
          if(restoken){
            this.setState({
               token:restoken,
                  step:1
                 })
           }
        } catch(err){
           alert(responseData.detail || responseData.mobile[0] || "Please Try Again")
        }
      })
      .catch((error) => {
          console.error(error);
      });  
  
  
}
  
    Confirm=()=>{
      
      const data1={
          public_key:this.state.publickey,
          token: this.state.token,
          confirmation_code:this.state.code,
          transaction_pin:this.state.pin 
      } 
      fetch(confirm, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data1),
      })
     
      .then((response) => response.json())
      .then((responseText) => {
        const responseData = JSON.parse(JSON.stringify(responseText))
        console.log(responseData)
        try{
          
          const retoken = responseData.token
          if(retoken){
                 this.Verification();  
          }
          else{
            alert(responseData.detail || "Please Try Again")
          }
        } catch(err){
          console.log(err)
           
        }
      })
      .catch((error) => {
        alert("not found")
          console.error(error);
      });  
  
    }
    Verification =()=>{
      
        let data = {
          token: this.state.token,
          amount: this.state.amount
      };
    
      axios.defaults.headers.common['Authorization'] = `Key live_secret_key_df5a902a744a415993c152f4520b67ab`
      axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
  
      axios.post(Verification, data)
          .then(response => {
            // ==========data posting to backed==========//
            // const data={
            //     1:response.amount,
            //     2:response.user.mobile,
            //     3:response.user.name

            // }
            //       axios .post(Verification, data)
            //       .then(response => {
            //           console.log(response.data);
        
            //       })
            //       .catch(error => {
            //        console.log("Store in database")
            //       });

          })
          .catch(error => {
            alert("Payment unsucessful")
            this.setState({
              step:0
            })
          });
    
    }
  
  
    render() {
       
      if(this.state.step == 0){
      return (
        <View style={styles.container}>
          <Text style={{fontSize:30,color:"white",padding:10,width:'100%',backgroundColor:"black"}}>
            khalti Payment
              </Text>
              <View style={styles.body}>
                <Text
                  style={styles.text}>Phone Number:
                </Text>
           
              <TextInput
              keyboardType="number-pad"
              style={styles.inputText}
              placeholder="Enter Number"
              onChangeText={text => this.setState({ mobile: text })}
              value={this.state.mobile}   
                />
      <TouchableOpacity 
      onPress={()=>this.Initiate()}
      style={styles.submit}>
        <Text >
          Submit
        </Text>
      </TouchableOpacity>
        </View>
      </View>
      );
    }
  
  else if(this.state.step == 1){
    return (
      <View style={styles.container}>
      <Text style={{fontSize:30,color:"white",padding:10 ,width:'100%',backgroundColor:"black"}}>
        khalti Payment
          </Text>
          <View style={styles.body}>
            <Text
                  style={styles.text}>Confirmation Code:
                </Text>
          <TextInput
          keyboardType="number-pad"
          style={styles.inputText}
          placeholder="Enter Confirmation Code: "
          onChangeText={text => this.setState({ code: text })}
          value={this.state.code}   
            />
         <Text
       style={styles.text}>Confirmation pin:
       </Text>
       
          <TextInput
          keyboardType="number-pad"
          style={styles.inputText}
          placeholder="Enter Confirmation Pin: "
          onChangeText={text => this.setState({ pin: text })}
          value={this.state.pin}  
            />
  <TouchableOpacity 
  onPress={()=>this.Confirm()}
  style={styles.submit}>
    <Text >
      Submit
    </Text>
  </TouchableOpacity>
    </View>
  </View>
  );
}
  else{
    return(
      alert("Please Try Again Later")
    )
  }
}
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#5d2e8e'

  },
  body:{
    flex:1,
    marginTop:10,
    alignItems:"center"
  },
  text:{
    left:'-19%',
    fontSize:20,
    color:"white"
    
  },
  inputText:{
     height: 45,
     width:'80%',
     borderRadius:10,
     borderColor: 'black',
     borderWidth: 2,
     backgroundColor:'white'
     },
     submit:{
       marginTop:20,
       left:-10,
       height:40,
       width:100,
       borderRadius:10,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:"orange"
     },
     header:{
       height:"10%",
       width:"100%",
       backgroundColor:"white",
       flexDirection:"row",
       padding: 15,

     }
})
  

