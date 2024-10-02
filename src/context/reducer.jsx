export const initialState = {
  loading: false,
  formData: {
    budget: "",
    companion: "",
    destination: "",
    days: "",
  },
  tripPackage: null,
  error: null, // Optional: Can be used for handling errors
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "UPDATE_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };

    case "RESET_FORM_DATA":
      return {
        ...state,
        loading: false,
        formData: { ...initialState.formData },
        tripPackage: null, // Reset tripPackage when form is reset
      };

    case "SET_TRIPS":
      return {
        ...state,
        tripPackage: action.payload, // Store generated trip data
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload, // Handle error state if needed
      };

    default:
      return state;
  }
};
