import { cartConstants } from './actionTypes';
import { packageDetailsById } from '../api/buildYourPc'
import { getCategoriesItem, advancedBuilderItems, pcPartSubcategoryApi } from '../api/buildYourPc';

export const packageActions = {
    getPackages,
    updatePackages,
    getPackagesList,
    getAdvanceCatList,
    getAdvanceSubCatList,
    updateCat
};

function getPackages(id) {
    return (dispatch) => {
        dispatch(request(id));
        packageDetailsById(id).then((response) => {
            console.log('============><===========')
            console.log(response.data)
            console.log('============><===========')
            dispatch(success({
                items: response.data.items,
                packageData: response.data,
                coverImage: response.data.cover_image,
                totalPrice: response.data.items.reduce(function (cnt, o) { return cnt + parseInt(o.price); }, 0)
            }));
        }).catch((error) => {
            console.log("PackageDetails" + error);
        });

    };

    function request(packages) {
        return { type: cartConstants.PACKGE_DETAILS_REQUEST, packages };
    }

    function success(packages) {
        return { type: cartConstants.PACKGE_DETAILS_SUCCESS, packages };
    }

    function failure(error) {
        return { type: cartConstants.PACKGE_DETAILS_FAILED };
    }
}


function getPackagesList(name) {
    return (dispatch) => {
        dispatch(request(id));
        getCategoriesItem(id.sub_category_id, id.item_id, id.sub_category_name).then((response) => {

            dispatch(success({
                items: response.data,
            }));
        }).catch((error) => {
            console.log("getCategoriesItems" + error);
        });
    };

    function request(packages) {
        return { type: cartConstants.PACKGE_LIST_REQUEST, packages };
    }

    function success(packages) {
        return { type: cartConstants.PACKGE_LIST_SUCCESS, packages };
    }

    function failure(error) {
        return { type: cartConstants.PACKGE_LIST_FAILED };
    }
}


function updatePackages(id) {
    return (dispatch) => {
        console.log(id);
        dispatch(success({
            items: id,
            totalPrice: id.reduce(function (cnt, o) { return cnt + parseInt(o.price); }, 0)
        }));
    };

    function request(packages) {
        return { type: cartConstants.PACKGE_UPDATE_REQUEST, packages };
    }

    function success(packages) {
        return { type: cartConstants.PACKGE_UPDATE_SUCCESS, packages };
    }

    function failure(error) {
        return { type: cartConstants.PACKGE_UPDATE_FAILED };
    }
}


function getAdvanceCatList() {
    return (dispatch) => {
        dispatch(request());
        pcPartSubcategoryApi().then((response) => {
            console.log('++++++++++++++++++++++++++++++++++++++++')
            console.log(response.data);
            console.log('++++++++++++++++++++++++++++++++++++++++')
            dispatch(success({
                items: response.data,
            }));
        }).catch((error) => {
            console.log("pcPartSubcategory list" + error)
            setLoading(false)
        });
    };

    function request(cat) {
        return { type: cartConstants.CAT_REQUEST, cat };
    }

    function success(cat) {
        return { type: cartConstants.CAT_SUCCESS, cat };
    }

    function failure(error) {
        return { type: cartConstants.CAT_FAILED };
    }
}


function getAdvanceSubCatList(id) {
    return (dispatch) => {
        dispatch(request(id));

        advancedBuilderItems(id).then((response) => {
            console.log(response.data);
            console.log('response.data');
            dispatch(success({
                items: response.data,
            }));

        }).catch((error) => {
            console.log(" +++ +kkk== +++ " + error)
        });
    };

    function request(subcat) {
        return { type: cartConstants.SUBCAT_REQUEST, subcat };
    }

    function success(subcat) {
        return { type: cartConstants.SUBCAT_SUCCESS, subcat };
    }

    function failure(error) {
        return { type: cartConstants.SUBCAT_FAILED };
    }
}

function updateCat(item,index) {
    return (dispatch) => {
        dispatch(success({
            data:item,
            ind:index
        }));
    };

    function success(subcat) {
        return { type: cartConstants.CAT_UPDATE, subcat };
    }

}
