export const setRestaurants = (restaurants) => ({
  type: 'SET_RESTAURANTS',
  restaurants
})

export const setLocation = (location) => ({
  type: 'SET_LOCATION',
  location
})

export const setRedirect = (redirect) => ({
  type: 'SET_REDIRECT',
  redirect
})

export const isLoading = (boolean) => ({
  type: 'IS_LOADING',
  boolean
})