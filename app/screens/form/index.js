
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,ScrollView,
  Image,
  PermissionsAndroid } from 'react-native';
  import DocumentPicker from 'react-native-document-picker';
  import ImagePicker from 'react-native-image-picker';
import styles from "./styles";




 class HelloWorldApp extends Component {
   state={
       name:[{name:"slc"},{name:"+2"},{name:"passport"},
       {name:"cv"},{name:"Bachelor"},{name:"master"},{name:"Photo"},{name:"other"}],
       slc:'',
       plustwo:'',
       cv:'',
       passport:'',
       Bachelor:'',
       master:'',
       Photo:'',
       other:'',
       icon:"times-circle"
 }
   onSignUp(){
    const { navigation } = this.props;
    axios.post('https://crm.uniatm.org/api/v1/apply/file', {
      user_id:this.state.user,
      slc_file:this.state.slc,	
      plus_two_file:this.state.plustwo,	
      cv:this.state.cv,
      other_one:this.state.other,	  
      other_two:this.state.Photo	

        
       
  })
  .then(function (response) {
    // console.log(response);
     const token = response.data.data.token
      AsyncStorage.setItem('tokenSignup',token)
    navigation.navigate("SignIn");

  })
  .catch(function (error) {
    console.log(error);
  });
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

                    switch(value){
                      case "slc":
                          this.setState({ slc:data });
                          
                          break;
                      case "+2":
                            this.setState({plustwo:data});
                            break;
                      case "cv":
                          this.setState({ cv:data });
                          break; 
                      case "passport":
                          this.setState({ passport:data });
                          
                          break;
                     case "Bachelor":
                          this.setState({ Bachelor:data });
                            
                          break; 
                     case "master":
                          this.setState({ master:data });
                          break; 
                      case "Photo":
                          this.setState({ Photo:data });
                          
                          break;
                     case "other":
                          this.setState({ other:data });
                            
                          break; 
                          
                      default:
                            break;  
                
                    }

   
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

              switch(value){
                case "slc":
                  this.setState({ slc:source });
                  
                  break;
              case "+2":
                    this.setState({plustwo:source});
                    break;
              case "cv":
                  this.setState({ cv:source });
                  break; 
              case "passport":
                  this.setState({ passport:source });
                  
                  break;
             case "Bachelor":
                  this.setState({ Bachelor:source });
                    
                  break; 
             case "master":
                  this.setState({ master:source });
                  break; 
              case "Photo":
                  this.setState({ Photo:source });
                  
                  break;
             case "other":
                  this.setState({ other:source });
                    
                  break; 
                  
              default:
                    break;  
        
            }

            }
        });
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
      
      <ScrollView style={styles.container}>
        <View style={styles.heading}>
          <Text style={{
            fontSize:30,fontWeight:'bold'
          }
          }>Heading </Text>
        </View>
        <View style={styles.description}>
          <Text>Lorem Ipsum is simply dummy text 
            of the printing and typesetting industry. 
           
             
           </Text>
        </View>
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
         <View style={styles.botton}>
            <TouchableOpacity 
             onPress={()=>  navigation.navigate("Apply")}
            style={styles.submit}>
                    <Text style={{color:'white'}}>
                        Back 
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>  navigation.navigate("Chat")}
            style={styles.submit}>
                    <Text style={{color:'white'}}>
                        Next Step 
                    </Text>
            </TouchableOpacity> 
        </View> 
      </ScrollView>
    )
 }};
export default HelloWorldApp
