import Api from './index';

export async function getAllGames(type) {
  const response = await Api.post('app/build-pc/get-games', {
    resolution: type,
  });
  return response.data;
}

export async function packageListByGames(gameIds) {
  const response = await Api.post('app/build-pc/get-packages', {
    game_ids:gameIds,
  });
  return response.data;
}

export async function packageDetailsById(packageId){
  const response = await Api.post('app/build-pc/package-details',{
    package_id:packageId,
  });
  return response.data;
}

export async function getCategoriesItem(sub_category_id,item_id,sub_category_name){
  const response = await Api.post('app/build-pc/category-items',{
    sub_category_id:sub_category_id,
    item_id:item_id,
    sub_category_name:sub_category_name
  });
  return response.data;
}

export async function getItemDetails(itemId){
  const response = await Api.get('app/items/item-details?item_id='+itemId
  );
  return response.data;
}

export async function addToCart(packageId,items){
  const response = await Api.post('app/cart/add-to-cart',{
    items:items,
    package_id:packageId
  });
  return response.data;
}

export async function addToCartForStore(isUpdate,items){
  const response = await Api.post('app/cart/add-to-cart',{
    is_update:isUpdate,
    items:items
    
  });
  return response.data;
}

export async function showCartData(){
  const response = await Api.get('app/cart/cart-list');
  return response.data;
}

export async function orderPlace(){
  const response = await Api.post('app/order/place',{
    payment_type:1,
  });
  return response.data;
}

export async function profileUpdateApi(email,dob,gender){
  const response = await Api.post('app/user/update-profile',{
    email:email,
    date_of_birth:dob,
    gender:gender
  });
  return response.data;
}

export async function changePasswordApi(currPass,newPass,confPass){
  console.log(currPass + newPass + confPass)
  const response = await Api.post('app/user/change-password',{
    current_password:currPass,
    new_password:newPass,
    new_confirm_password:confPass
  });
  return response.data;
}

export async function changeNumberApi(number){
  const response = await Api.post('app/user/change-phone',{
    new_phone:number
  });
  return response.data;
}

export async function uploadImageApi(imageUri){
  const response = await Api.post('app/user/update-profile-image',{
    profile_image_url:"user/profile/"+imageUri
  });
  return response.data;
}

export async function cityApi(){
  const response = await Api.get('app/address/city-area-list');
  return response.data;
}

export async function addAddressApi(city,areas,addressType,email,name,block,street,building,floor,apartment,addressid){  
  const response = await Api.post('app/user/add-address',{
    address_id:addressid,
    city:city,
    area:areas,
    name:name,
    email:email,
    address_type:addressType,
    block:block,
    street:street,
    building:building,
    floor:floor,
    apartment:apartment,
    address:"",
  });
  return response.data;
}

export async function addressListApi(){
  const response = await Api.get('app/user/address-list');
  return response.data;
}

export async function defaultAddressApi(addId){
  const response = await Api.post('app/user/set-default-address',{
    address_id:addId
  });
  return response.data;
}

export async function getSpecificAddress(addressId){
  const response = await Api.post('app/user/get-address',{
    address_id:addressId
  });
  return response.data;
}

export async function pcPartSubcategoryApi(){
  const response = await Api.get('app/advance-builder/pc-part-subcategory');
  return response.data;
}

export async function advancedBuilderItems(id){
  const response = await Api.post('app/advance-builder/get-items',{
    "sub_category_id":id
  });
 // console.log(response)
  return response.data;
}

export async function getOrderList(listType){
  const response = await Api.post('app/order/list',{
    list_type:listType
  });
  return response.data;
}

export async function sendEmail(data){
  const response = await Api.post('app/order/list',{
    data
  });
  return response.data;
}


