import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
    container:{
        flex:1
      }, 
      heading:{
        marginTop:30,
        height:30,
        width:"100%",
        justifyContent:'center',
        alignItems:'center'
      },
      description:{
        height:100,
        width:'100%',
        padding:20,
        
      },
      uploadview:{
        height:70,
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:"grey"
        
      },
      upload:{
        flexDirection:'row'
      },
      itemtxt:{
        fontSize:16,
        height:40,
        width:100,
        justifyContent:'center',
        alignItems:'center',
      padding:10,
      },
      itemtext:{
        fontSize:16,
        height:40,
        width:80,
        borderRadius:5,
        backgroundColor:'#c7c7c7',
        justifyContent:'center',
        alignItems:'center',
      padding:10,
      marginLeft:20
        
        
      },
      user:{
       fontSize: 35,
       margin:20
      },
      submit:{
        height:40,
        width:100,
        backgroundColor:'#929291',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
              },
      botton:{
          margin:10,
          flexDirection:"row",
          justifyContent:'space-between'

      }
      
    
});
