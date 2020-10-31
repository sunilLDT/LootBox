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
