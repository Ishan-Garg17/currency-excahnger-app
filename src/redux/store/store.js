import { configureStore } from "@reduxjs/toolkit"
import formReducer from '../features/FormSlice'

const store = configureStore({
    reducer: {
        formData: formReducer,
    },
})

export default store;