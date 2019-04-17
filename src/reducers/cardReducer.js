export const cardReducer = (state = {}, action) => {
  switch(action.type) {

    case('SET_CARD') :
      return action.card;

    default :
      return state;
  }
}