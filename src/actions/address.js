import { AddressConstant } from './actionTypes';

export const AddressActions = {
    getAddressAction
};

function getAddressAction(){
    return{
        type:AddressConstant.ADD_ADDRESS,

    }
}