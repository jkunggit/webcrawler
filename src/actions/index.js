// https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3

import { API_URL } from '../constants'; // we need to get our api url

// action creators
export function showModal(obj) {
  return {
    type: 'SHOW_MODAL', // action
    modalData: obj.modalData,  // payload,
    visible: obj.visible,
    modalType: obj.modalType,
    message: obj.message
  }
}

export function hideModal() {
  console.log('hideModal Action Creator!')
  return {
    type: 'HIDE_MODAL' // action
  }
}

export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items
  };
}

export function itemsFetchData(url) {
  return (dispatch) => {

    dispatch(itemsIsLoading(true));

    let requestUrl = API_URL + '?url=' + url;

    fetch(requestUrl)
      .then((response) => {
        dispatch(itemsHasErrored(false)); // reset it

        console.log('ok response!', response)
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((items) => {
        if (items.hasOwnProperty('error')) {
          dispatch(itemsHasErrored(true));
        }
        else {
          dispatch(itemsFetchDataSuccess(items))
        }
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}