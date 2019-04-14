export const redirectReducer = (state = '', action) => {
  switch(action.type) {

    case('SET_REDIRECT') :
      return action.redirect;

    default :
      return state;
  }
}