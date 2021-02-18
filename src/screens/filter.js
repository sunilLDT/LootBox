import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,ActivityIndicator,Dimensions } from 'react-native';
import RangeSlider from 'rn-range-slider';
import SmallLGBtn from './smallLGBtn';
import { getFilterData } from '../api/buildYourPc';
import { ScrollView } from 'react-native-gesture-handler';
import { filter, flattenDeep, keys, values, without } from 'lodash';
const { width, height } = Dimensions.get('window');
const THUMB_RADIUS = 12;
const options = ['24 cm', '12 cm', '30 cm', '14 cm', '16 cm', '340 cm']
const Filter = (props) => {    
  
  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [filterOptions, setFilterOptions] = useState([])
  const [selectedSubCategory, setSelectedSubCategory] = useState({});

  const renderThumb = useCallback(() => <View style={styles.thumb} />, []);
  const renderRail = useCallback(() => <View style={styles.rail} />, []);
  const renderRailSelected = useCallback(() => <View style={styles.railselected} />, []);
  const renderLabel = useCallback(value => <View style={styles.label}>
    <Text style={styles.labeltext}>{value}</Text>
  </View>, []);
  const renderNotch = useCallback(() => <View style={styles.notch} {...props} />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  React.useEffect(() => {
    let allSubCategories;

    if (props.type === 'advanceBuilder') {
      allSubCategories = [props.allCategories[0].sub_category_id];
    } else {
      if(Object.keys(props.selectedSubCategory)[0]){
        allSubCategories = props.selectedSubCategory === 0 ? props.allCategories.map((a, k) => a.id):[Object.keys(props.selectedSubCategory)[0]];
      }
      else{
        allSubCategories = props.selectedSubCategory === 0 ? props.allCategories.map((a, k) => a.id):[props.allCategories[props.selectedSubCategory - 1].id];
      }
    }
     

    if (props.allCategories, props.initalValues) {
      // console.log(props.initalValues)
    }

    getFilterData(allSubCategories).then((response) => {
      setFilterOptions(response.data);
    }).catch((error) => {
      console.log("filter data" + error);
    });
  }, [])

  return (
    <View style={{ height: '100%', width: '100%', marginTop: 15, paddingBottom: 15 }}>
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          {/* <TouchableOpacity
            onPress={() => { }}>
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableOpacity> */}
        </View>

        <View>
          <TouchableOpacity
            onPress={() => props.filter1({ all:"all" , filter_custome_field_id: keys(selectedSubCategory), filter_custome_values: flattenDeep(values(selectedSubCategory)), minPrice: low, maxPrice:high })}>
            <Text style={styles.textStyle}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{
          height: '100%', width: '100%',
          overflow: 'hidden',
        }}>
        <Text style={styles.textStyle}>Price</Text>
        {filterOptions.length !== 0 && <RangeSlider
          style={styles.priceSeector}
          min={filterOptions.min_price}
          max={filterOptions.max_price}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />}

        {filterOptions.length !== 0 ? filterOptions.filter_data.map((i, k) =>
          <View key={k}>
            <View>
              <Text style={styles.textStyle}>{i.name}</Text>
            </View>

            <View style={styles.tab} >
              {i.filter_option.map((filterData, index) =>
              {
                return(
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    marginBottom: 10
                  }}
                  key={filterData.custom_field_id + index}
                  onPress={() => {
                    if (selectedSubCategory[filterData.custom_field_id] && selectedSubCategory[filterData.custom_field_id].includes(filterData.value)) {
                      const filterValues = flattenDeep(values(selectedSubCategory));
                      const filterReturn = filterValues.filter(item => item !== filterData.value)
                      
                      setSelectedSubCategory({ ...selectedSubCategory, [filterData.custom_field_id]: filterReturn })
                    } else if (selectedSubCategory[filterData.custom_field_id]) {
                      setSelectedSubCategory({ ...selectedSubCategory, ...selectedSubCategory[filterData.custom_field_id].push(filterData.value) });
                    } else {
                      setSelectedSubCategory({ ...selectedSubCategory, [filterData.custom_field_id]: [filterData.value] });
                    }
                  }}>
                  <SmallLGBtn
                    text={filterData.value}
                    selected={selectedSubCategory.length !== 0 && selectedSubCategory[filterData.custom_field_id] && selectedSubCategory[filterData.custom_field_id].includes(filterData.value)}
                  />
                </TouchableOpacity>
                )
              }
              )}
            </View>
          </View>
        ):<ActivityIndicator marginTop={height * 0.12} color="#ECDBFA" size="small" />}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  notch: {
    width: 8,
    height: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#4499ff',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#7f7f7f',
  },
  label: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#4499ff',
    borderRadius: 4,
  },
  labeltext: {
    fontSize: 16,
    color: '#fff',
  },
  thumb: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#7f7f7f',
    backgroundColor: '#ffffff',
  },
  railselected: {
    height: 4,
    backgroundColor: '#4499ff',
    borderRadius: 2,
  },
  priceSeector: {
    marginTop: 10,
    marginBottom: 10
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    letterSpacing: 1,
    marginBottom: 10
  }
});

export default Filter;