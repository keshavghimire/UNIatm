import React, { Component } from "react";
import { FlatList, RefreshControl, View, TextInput } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import {
  Header,
  SafeAreaView,
  Icon,
  CategoryFull,
  CategoryIcon
} from "@components";
import * as Utils from "@utils";
import styles from "./styles";

export default class Category extends Component {
  constructor(props) {
    super(props);

    // Define list Category screens
    this.state = {
      refreshing: false,
      search: "",
      college:this.props.navigation.state.params.college,
      address:this.props.navigation.state.params.address,
      category: []
    };
  } componentDidMount(){
    this.category();
    
 
   }
   category(){
     fetch('https://crm.uniatm.org/api/v1/courses').then((response) =>response.json())
     .then((responsejson) => {
       this.setState({
         isloading:false,
         category:responsejson
        
       })
 
     })
   }
   
     

  
  renderItem(item, index) {
    const { navigation } = this.props;
    const { modeView } = this.state;
        return (
          <CategoryIcon
            icon={item.icon}
            title={item.college}
            subtitle={item.address}
            // onPress={() => navigation.navigate("collegeByCategory",
            //       {  'image': {uri: item.colleges.path},
            //          'name':item.colleges.college,
            //          'CollegeAddresh':item.colleges.address,
            //          'contach':item.colleges.contact,
            //          'website':item.colleges.website,
            //          'openhour':item.colleges.openhour,
            //          'description':item.colleges.description,
            //         })}
            style={{
              marginBottom: 10,
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              paddingRight: 50,
              borderColor: BaseColor.textSecondaryColor
            }}
          />
        );
     
    }
  
  render() {
    const { navigation } = this.props;
    let { search, category, modeView } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="College list"
         
        />
        <View style={{ padding: 20 }}>
          <TextInput
            style={BaseStyle.textInput}
            onChangeText={text => this.setState({ search: text })}
            autoCorrect={false}
            placeholder="Search"
            placeholderTextColor={BaseColor.grayColor}
            value={search}
            selectionColor={BaseColor.primaryColor}
            onSubmitEditing={() => {}}
          />
        </View>
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 20
          }}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={this.state.refreshing}
              onRefresh={() => {}}
            />
          }
          data={category}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => this.renderItem(item, index)}
        />
      </SafeAreaView>
    );
  }
}
