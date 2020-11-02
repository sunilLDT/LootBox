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
console.log(response.data)
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
    is_update:"true",
    items:[items],
    package_id:packageId
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
