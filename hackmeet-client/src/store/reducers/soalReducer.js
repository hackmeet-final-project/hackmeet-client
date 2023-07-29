const initialState = {
  data: [],
  isLoading: true,
};

const soalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "soal/fetchAll":
      return { ...state, data: action.payload };
    case "soal/isLoading":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default soalReducer;
