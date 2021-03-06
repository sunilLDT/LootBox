import Api from './index';
import AsyncStorage from '@react-native-community/async-storage';
export async function getAllGames(type) {
  const response = await Api.post('app/build-pc/get-games', {
    resolution: type,
  });
  return response.data;
}

export async function packageListByGames(gameIds) {
  const response = await Api.post('app/build-pc/get-packages', {
    game_ids: gameIds,
  });
  return response.data;
}

export async function packageDetailsById(packageId, cartPackageId) {
  const response = await Api.post('app/build-pc/package-details', {
    package_id: packageId,
    cart_package_id:cartPackageId
  });
  return response.data;
}

export async function getCategoriesItem(sub_category_id,item_id){
  const response = await Api.post('app/build-pc/category-items',{
    sub_category_id:sub_category_id,
    item_id:item_id,
    // sub_category_name:sub_category_name
  });
  return response.data;
}

export async function getItemDetails(itemId) {
  const response = await Api.get('app/items/item-details?item_id=' + itemId
  );
  return response.data;
}

export async function addToCart(packageId, data, is_package) {
  const sendingData = {
    is_package: is_package,
    package: {
      package_id: packageId,
      quantity: 1,
      items: data
    }
  }

  const response = await Api.post('app/cart/add-to-cart', sendingData);
  return response.data;
}

export async function addToCartAdvance(data) {
  const response = await Api.post('app/cart/add-to-cart', {
    is_update: true,
    is_package: false,
    items: data

  });
  return response.data;
}

export async function addPackage(id, qty) {
  const response = await Api.post('app/cart/update-package-qty', {
    cart_package_id: id,
    quantity: qty

  });
  return response.data;
}


export async function addToCartForStore(isUpdate, items) {
  const response = await Api.post('app/cart/add-to-cart', {
    is_update: isUpdate,
    items: items

  });
  return response.data;
}

export async function showCartData() {
  try{
    const response = await Api.get('app/cart/cart-list');
    return response.data;
  }
  catch(e){
    return e.response.data
  }
  
}

export async function orderPlace(paymentType) {
  try{
    const response = await Api.post('app/order/place', {
      payment_type: paymentType
    });
    return response.data;
  }
  catch(e){
    return e.response.data;
  }
}

export async function profileUpdateApi(email, dob, gender, first_Name,
  last_name) {
    console.log("email "+email)
    console.log("dob "+dob);
    console.log("gender "+gender)
    console.log("name "+first_Name)
    console.log("last "+last_name)

  const response = await Api.post('app/user/update-profile', {
    email: email,
    date_of_birth: dob,
    gender: gender,
    first_name: first_Name,
    last_name: last_name
  });
  return response.data;
}

export async function changePasswordApi(current_password, new_password, new_confirm_password) {
  try{
  const response = await Api.post('app/user/change-password', {
    current_password,
    new_password,
    new_confirm_password
  });
  return response.data;
  }catch(e){
    return e.response.data;
  }
}

export async function changeNumberApi(number) {
  try{
    const response = await Api.post('app/user/change-phone', {
      new_phone: number
    });
    return response.data;
  }catch(e){
    return e.response.data;
  }
}

export async function uploadImageApi(imageUri) {
  const response = await Api.post('app/user/update-profile-image', {
    profile_image_url: "user/profile/" + imageUri
  });
  return response.data;
}

export async function cityApi() {
  const response = await Api.get('app/address/city-area-list');
  return response.data;
}

export async function addAddressApi(city, areas, addressType, name, block, street, building, floor, apartment,avenue, addressid) {
  const addressData = {
    address_id: addressid,
    city: city,
    area: areas,
    name: name,
    address_type: addressType,
    block: block,
    street: street,
    building: building,
    avenue: avenue,
    apartment: apartment,
    floor:floor,
    address: "",
  }
  try{
    const response = await Api.post('app/user/add-address', addressData);
    return response.data;
  }catch(e){
    return e.response.data;
  }
  
}

export async function addressListApi() {
  const response = await Api.get('app/user/address-list');
  return response.data;
}

export async function defaultAddressApi(addId) {
  const response = await Api.post('app/user/set-default-address', {
    address_id: addId
  });
  return response.data;
}

export async function deliveryAddressApi(addId) {
  const response = await Api.post('app/cart/set-address-cart', {
    address_id: addId
  });
  return response.data;
}

export async function getSpecificAddress(addressId) {
  const response = await Api.post('app/user/get-address', {
    address_id: addressId
  });
  return response.data;
}

export async function pcPartSubcategoryApi() {
  const response = await Api.get('app/advance-builder/pc-part-subcategory');
  return response.data;
}

export async function advancedBuilderItems(id, filterId, filterValues) {
  let data = {
    "sub_category_id": id
  }
  if (filterId) {
    data = {
      ...data,
      "filter_custome_field_id": filterId,
      "filter_custome_values": filterValues
    }
  }
  const response = await Api.post('app/advance-builder/get-items', {...data});
  return response.data;
}

export async function getFilterData(id) {
  const response = await Api.post(`app/items/filter-data`, {
    'sub_category_id': id
  });
  return response.data;
}

export async function getOrderList(listType) {
  const response = await Api.post('app/order/list', {
    list_type: listType
  });
  return response.data;
}

export async function getOrderDetails(id) {
  const response = await Api.get('app/order/details?order_id=' + id);
  return response.data;
}

export async function sendEmail(data) {
  const response = await Api.post('app/order/list', {
    data
  });
  return response.data;
}


export async function getProfilApi() {
  const response = await Api.get('app/user/profile');
  return response.data;
}

export async function getBannerApi() {
  try{
    const response = await Api.get('app/banner/list');
    return response.data;
  }catch(e){
    return e.response.data
  }
  
}

export async function removeItemAPI(id) {
  const response = await Api.post('app/cart/remove-item-cart', {
    "cart_item_id": id,
  });
  return response.data;
}

export async function removePackageApi(id) {
  const response = await Api.post('app/cart/remove-package-cart', {
    "cart_package_id": id,
  });
  return response.data;
}

export async function getNotification() {
  const response = await Api.get('app/user/notification-list');
  return response.data;
}

export async function itemsAddedInCartApi() {
  const response = await Api.get('app/advance-builder/cart-added-item');
  return response.data;
}
export async function getLabelsApi(){
  const lang = await AsyncStorage.getItem('language');
  const response = await Api.get('app/label/list',{ headers: { 'X-Localization': lang }});
  return response.data;
}
