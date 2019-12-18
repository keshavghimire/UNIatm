import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ActivityIndicator,
  PermissionsAndroid } from 'react-native';
  import DocumentPicker from 'react-native-document-picker';
  import ImagePicker from 'react-native-image-picker';
  import styles from "./styles";
  import axios from 'axios';


const AunthOne ='https://crm.uniatm.org/api/v1/apply/file'
const statusUrl ='http://crm.uniatm.org/api/v1/apply/file/status'

 class HelloWorldApp extends Component {
 
   state={
       name:[{name:"photo/File"}
      ],
       lastEdu:'',
       icon:"times-circle",
       data:'',
       checkStatus: false ,
       loadingStatus: true,
       stau:'',
       loading:false,
      
 

   }
   componentDidMount(){
    this._retrieveData();
   
    
    
}
stausCheck=(idValue)=>{
  
  const data={
    user_id:idValue
  }
  axios.post(statusUrl,data).then((response) => {
  
   const responseData = JSON.parse(JSON.stringify(response))
   AsyncStorage.setItem('status',responseData.data.status)
   
    this.setState({
      loadingStatus:false,
      checkStatus:responseData.data.status
    })

   

  })
  .catch((error) => {
    console.log(error);
  });
}
_retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
       const jsonValue = JSON.parse(value);
       const id = jsonValue.ids;
       this.stausCheck(id);
       this.setState({
            data:JSON.parse(value)})
      }
    } catch (error) {
     console.log(error)
     
    }
  };
 
   onSignUp(){
    const { navigation } = this.props;
    if(this.state.lastEdu.length != 0){
      alert("Your Document Is Being Verified,Plsease Check After Sometimes")
      this.setState({loading:true})
        const data = new FormData();
          data.append('user_id',this.state.data.ids); // you can append anyone.
          data.append('other_one', {
            uri: this.state.lastEdu,
            type: 'image/jpeg', // or photo.type
            name: 'slc'
            });

            // console.log("pass valur",data)
      axios.post(AunthOne,data).then(function (response) {
      console.log("file text",response);
        const token = response.data.data.token
        AsyncStorage.setItem('tokenSignup',token)
      

    })
    .catch(function (error) {
      console.log(error);
    });
}
else{
  alert("Plsease Submit your Document.")
}

}



async selectOneFile(value,index) {
  //Opening Document Picker for selection of one file
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      //There can me more options as well
      // DocumentPicker.types.allFiles
      // DocumentPicker.types.images
      // DocumentPicker.types.plainText
      // DocumentPicker.types.audio
      // DocumentPicker.types.pdf
    });
    let data = res.uri
    
    //Printing the log realted to the file
    console.log('res : ' + JSON.stringify(res));
    console.log('URI : ' + res.uri);
    console.log('Type : ' + res.type);
    console.log('File Name : ' + res.name);
    console.log('File Size : ' + res.size);
    //Setting the state to show single file attributes
    // 
    
    let array = this.state.name[index] ;
    array.status = "true"
    this.state.name = Object.assign([],this.state.name)     
 
        console.log("array index",array)
        this.setState({
          lastEdu:data
        })

   
  } catch (err) {
    //Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      //If user canceled the document selection
      // alert('Canceled from single doc picker');
    } else {
      //For Unknown Error
      // alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }
}
//////========= image picker=======>>>>>

 async _openGallery(value,index) {
   

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
            
           
             let array = this.state.name[index] ;
             array.status = "true"
             this.state.name = Object.assign([],this.state.name)     
          
          console.log("array index",array)
              this.setState({
                lastEdu:source
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
    // console.log("data",this.state.data)
    const { navigation } = this.props;
    if(this.state.loadingStatus){
      return(
        <ActivityIndicator size="large" style={{flex:1}}></ActivityIndicator>
      )
    }
    else if(this.state.checkStatus== true){
      // {this.setState({
      //   disable:false
      // })}
      return(
      
            
          this.props.navigation.navigate("Form") 
          
         
      )
    }else{
    return (
      
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={{
            fontSize:30,fontWeight:'bold'
          }
          }>verification 1 </Text>
        </View>
        <View style={styles.description}>
          <Text>Lorem Ipsum is simply dummy text 
            of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard
             dummy text ever since the 1500s, when an unknown
            
           </Text>
         
        </View>
        {/* {console.log("hshs",this.state.name)} */}
        {this.state.name.map((item,index)=>{
             return(
              <View style={styles.uploadview}>
                 <Text style={styles.itemtxt}>{item.name+":"}</Text>
                 <TouchableOpacity 
                 onPress={()=> this._openGallery(item.name,index)}
                 style={styles.upload}>
                   <Icon name='camera' style={styles.user} />
                 </TouchableOpacity>
                 <TouchableOpacity 
                onPress={()=> this.selectOneFile(item.name,index)}
                 style={styles.upload}>
                   <Icon name='file-pdf' style={styles.user} />
                 </TouchableOpacity>
                {item.status ?
                <Icon name="check-circle" color="green"  style={styles.user} />
                :
                 <Icon name={this.state.icon} color='red' style={styles.user} />
                }
              </View>
            )    
         }) 
         }  

        <TouchableOpacity
         disabled={this.state.loading}
          onPress={()=> this.onSignUp()   }
          style={styles.submit}>
                    <Text style={{color:'white'}}>
                    {this.state.loading?'Loading..':'Upload'}
                    </Text>
        </TouchableOpacity> 
        
      </View>
    )
  }
 }};
export default HelloWorldApp

