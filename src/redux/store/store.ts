import { configureStore } from "@reduxjs/toolkit"
import formReducer from '../features/FormSlice'
import homeReducer from '../features/HomeSlice'

const store = configureStore({
    reducer: {
        formData: formReducer,
        home: homeReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;