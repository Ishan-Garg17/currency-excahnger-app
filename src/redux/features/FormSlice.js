import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    converting: false,
    calculating: false,
    baseCurr: 'EUR',
    toCurr: 'USD',
    amount: 0,
    convertedAmount: 0,
    conversionData: null
}
export const convertCurrency = createAsyncThunk('form/convertCurrency', async (args, thunkAPI) => {
    try {
        const { formData } = thunkAPI.getState()
        const { baseCurr, toCurr, amount } = { ...formData }

        // const res = await fetch("http://localhost:3001/user/login", {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(),
        // })
        // const response = await res.json()
        return 'XXXX'
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
})

export const getConversionData = createAsyncThunk('form/getConversionData', async (args, thunkAPI) => {
    try {
        const { formData } = thunkAPI.getState()
        const { baseCurr, toCurr } = { ...formData }
        console.log(baseCurr, toCurr)
        // const res = await fetch("http://localhost:3001/user/login", {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(),
        // })
        // const response = await res.json()
        return 'xxxx'
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
})


const formSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload
        },
        setToCurr: (state, action) => {
            state.toCurr = action.payload
        },
        setBaseCurr: (state, action) => {
            state.baseCurr = action.payload
        },
        setConvertedAmount: (state, action) => {

            state.convertedAmount = action.payload
        },
        setConversionData: (state, action) => {
            state.conversionData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(convertCurrency.pending, state => {
            state.converting = true
        })
        builder.addCase(convertCurrency.fulfilled, (state, action) => {
            state.convertedAmount = action.payload
            state.converting = false
        })
        builder.addCase(convertCurrency.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = 'Wrong Email and Password '
        })

        builder.addCase(getConversionData.pending, state => {
            state.conversionData = null
        })
        builder.addCase(getConversionData.fulfilled, (state, action) => {
            state.conversionData = action.payload
        })
        builder.addCase(getConversionData.rejected, (state, action) => {
            state.loading = false
            state.user = null
            state.error = 'Wrong Email and Password '
        })
    }
})

export const { setAmount, setConversionData, setToCurr, setBaseCurr, setConvertedAmount } = formSlice.actions
export default formSlice.reducer;