import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestOptions } from './APIConfig';

interface FormState{
     converting: boolean,
    calculating: boolean,
    baseCurr: string,
    toCurr: string,
    amount: number,
    convertedAmount: number|null|string ,
    // convertedAmount: number | string,
    conversionData: null | number | string,
}
const initialState: FormState = {
    converting: false,
    calculating: false,
    baseCurr: 'EUR',
    toCurr: 'USD',
    amount: 0,
    convertedAmount: 0,
    conversionData: 1.06
}
export const convertCurrency = createAsyncThunk('form/convertCurrency', async (args, {getState}) => {
    try {
         const meta:any  = getState() as any;
         let formData = meta.formData
        const { baseCurr, toCurr, amount }: FormState = { ...formData }
        

        // const res = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurr}&from=${baseCurr}&amount=${amount}`, requestOptions)
        // const response = await res.json()
        // const value = response['result']
        // const result :string  = Number(value.toFixed(2)).toLocaleString('en', {
        //     minimumFractionDigits: 2
        // });
        // console.log('====================================');
        // console.log(result,response,value);
        // console.log('====================================');

        // return result;
        return 1.06;
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
})

export const getConversionData = createAsyncThunk('form/getConversionData', async (args, {getState}) => {
    try {
        const meta : any  = getState() as any;
        let formData = meta.formData
        const { baseCurr, toCurr }: FormState = { ...formData }
        // const res = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurr}&base=${baseCurr}`, requestOptions)
        // const response = await res.json()
        // const rates = response.rates
        // const rate = rates[toCurr]
        // return rate;
        return 'XXXX';
    } catch (error) {
        console.log(error);
        return Promise.reject();
    }
})


const formSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeBaseandToCurr: (state, action) => {
            const [from, to] = [...action.payload]
            state.baseCurr = from
            state.toCurr = to
        },
        setAmount: (state, action) => {
            state.amount = action.payload
        },
        setToCurr: (state, action) => {
            state.toCurr = action.payload
        },
        setBaseCurr: (state, action) => {
            state.baseCurr = action.payload
        },
        swapBaseAndTo: (state)=>{
            const temp = state.baseCurr;
            state.baseCurr = state.toCurr;
            state.toCurr = temp;
        },
        setConvertedAmount: (state)=>{
            state.convertedAmount=null;
        },
       
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
        })

        builder.addCase(getConversionData.pending, state => {
            state.conversionData=null;
        })
        builder.addCase(getConversionData.fulfilled, (state, action) => {
            state.conversionData = action.payload
        })
        builder.addCase(getConversionData.rejected, (state, action) => {
        })
    }
})

export const { setAmount,  setToCurr, setBaseCurr, changeBaseandToCurr, swapBaseAndTo, setConvertedAmount } = formSlice.actions
export default formSlice.reducer;