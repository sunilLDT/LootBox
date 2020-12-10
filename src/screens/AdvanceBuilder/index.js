import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import backImage from '../../assets/back.png';
import searchImage from '../../assets/ic_search.png';
import filterImage from '../../assets/ic_filter.png';
import {pcPartSubcategoryApi} from '../../api/buildYourPc';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const AdvanceBuilder = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [pcPartSubcategory, setpcPartSubcategory] = useState([]);

  useEffect(() => {
    setLoading(true)
    pcPartSubcategoryApi().then((response) => {
      setpcPartSubcategory(response.data);
      console.log(response.data);
      setLoading(false)
    }).catch((error) => {
        console.log("pcPartSubcategory list" + error)
        setLoading(false)
    });
    return () => {
        console.log("willUnMount");
    }
  }, []);

  return (
      <ImageBackground
      source={require('../../assets/dottedBackground.png')}
      style={styles.background}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width, height, overflowX: 'hidden'}}
        >
          <View style={styles.topContainer}>
              <View>
                <TouchableOpacity>
                  <Image
                      resizeMode="contain"
                      source={backImage}
                      style={{
                      width: 48,
                      }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.searchFilter}>
                <TouchableOpacity>
                    <Image
                        resizeMode="contain"
                        source={searchImage}
                        style={{
                        width: 48,
                        }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                        resizeMode="contain"
                        source={filterImage}
                        style={{
                        width: 48,
                        }}
                    />
                  </TouchableOpacity>
              </View>
          </View>

          <View>
            <Text style={styles.advanceBuilderText}>Advance Builder</Text>
            <Text style={styles.lineText}>Select the configuration you like the most.</Text>
          </View>

          <View style={styles.mainContainer}>
            <View style={styles.subCategoriesView}>
              {pcPartSubcategory.map((part,index) => {
                if(part.status === 1){
                  return(
                    <TouchableOpacity key={index} onPress={() => {}}>
                      <View style={styles.box} >
                        <LinearGradient
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#C01C8A', '#865CF4']}
                            style={{
                              width: 16,
                              height: 16,
                              position: 'absolute',
                              right: -2,
                              top: -3,
                              zIndex: 100,
                              borderRadius:50,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                          </LinearGradient>
                          <Image style={styles.subImage}
                            resizeMode="contain"
                            source={filterImage}
                          />
                          <Text style={styles.subName}>{part.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </View>

            <View>
            </View>          
          </View>
        </ScrollView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background:{
    height:height,
    width:width,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topContainer:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.1,
  },
  searchFilter:{
    display: 'flex',
    flexDirection:'row',
  },
  advanceBuilderText:{
    fontSize:20,
    fontFamily:'Michroma-Regular',
    color:'#fff',
    paddingHorizontal: width * 0.1,
  },
  lineText:{
    fontSize:12,
    color:'#D2D7F9',
    marginVertical:10,
    fontFamily:'Montserrat-LightItalic',
    paddingHorizontal: width * 0.1,
  },
  mainContainer:{
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:"5%",
  },
  subCategoriesView:{
    width:width*0.4,
  },
  box:{
    width:width*0.3,
    height:height*0.2,
    borderBottomWidth:0.6,
    borderBottomColor:"#D2D7F9",
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  subImage:{
    width:50,
    height:50,
  },
  subName:{
    color:'#fff',
  }
});

export default AdvanceBuilder;
