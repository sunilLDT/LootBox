import React , {useState,useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import BackgroundImage from '../../assets/buildYourPc/triangleBg.png';
import IcCardImage from '../../assets/ic_card_a0.png';
import Input from '../../components/input';


const {width, height} = Dimensions.get('window');
const SearchListing = ({navigation,route}) => {
    const {items} = route.params;
    const {id} = route.params;
    const [search,setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(items)
        .then(response => response.json())
        .then(results => {
            setData(results);
            setIsLoading(false);
            console.log(data);
        })
        .catch(error => {
            setIsLoading(false);
            setError(error);
        });
    },[]);

    

    return(
        <ImageBackground source={BackgroundImage} style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                navigation.goBack();
                }}>
                <View style={styles.backButtonContentConatiner}>
                    <Image
                        source={require('../../assets/back.png')}
                        resizeMode="contain"
                        style={styles.backImage}
                    />
                </View>
            </TouchableOpacity>
            <Input
                placeholder="search"
                onChangeText={setSearch}
             />
            <FlatList
                keyExtractor={id}
                data={items || []}
                renderItem={({item}, index) => {
                return (
                    <ImageBackground
                    source={IcCardImage}
                    style={styles.cardConatiner}
                    key={index}>
                    <View
                        style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',
                        // marginTop: 30,
                        }}>
                        <Image
                        source={item.image}
                        style={{width: 48, height: 40, marginBottom: 10, alignSelf: 'center'}}
                        />
                        <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '700',
                            color: '#FFFFFF',
                            marginBottom: 10,
                        }}>
                        {item.brandName}
                        </Text>
                        <Text
                        style={{
                            fontSize: 10,
                            fontWeight: '700',
                            color: '#FFFFFF',
                            marginBottom: 10,
                            opacity: 0.5,
                            fontStyle: 'italic',
                            textAlign: 'center',
                        }}>
                        {item.name}
                        </Text>
                        <Text
                        style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#FFFFFF',
                            marginBottom: 10,
                            fontStyle: 'italic',
                            textAlign: 'center',
                        }}>
                        +KD {item.price}
                        </Text>
                    </View>
                    </ImageBackground>
                );
                }}
                numColumns={3}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: '#2A2D39',
      },
    backButtonContentConatiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: width * 0.09,
      },
      backImage: {
        width: 48,
      },
      backTitle: {
        paddingHorizontal: 20,
        fontSize: 12,
        opacity: 0.5,
        color: '#FFFFFF',
        fontStyle: 'italic',
      },
      cardConatiner: {
        width: 108,
        height: 131,
        margin: 10,
      },
});

export default SearchListing;