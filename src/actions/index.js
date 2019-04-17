export const setRestaurants = (restaurants) => ({
  type: 'SET_RESTAURANTS',
  restaurants
})

export const setLocation = (location) => ({
  type: 'SET_LOCATION',
  location
})

export const isLoading = (boolean) => ({
  type: 'IS_LOADING',
  boolean
})

export const setCard = (card) =>({
  type: 'SET_CARD',
  card
})