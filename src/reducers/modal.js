const initialState = {
  visible: false,
  modalType: null,
  modalData: {
    id: '',
    title: '',
    data: []
  },
  message: '',
  modalSize: 'xl'
}

export function modal(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      if (action.modalType != 'table') {
        return {
          ...state,
          visible: true,
          modalType: action.modalType,
          message: action.message,
          modalSize: 'lg'
        }
      }
      else
        return {
          ...state,
          visible: true,
          modalType: action.modalType,
          modalData: action.modalData,
          modalSize: 'xl'
        }
    case 'HIDE_MODAL':
      return {
        ...state,
        visible: false
      }
    default:
      return state;
  }
}