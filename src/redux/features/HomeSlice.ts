import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PopularCurrencyData } from '../../API DATA/symbols'


export interface item{
    from:string,
    to:string,
    amount:number
}

interface HomeState{
    currencyData: item[],
    converting: boolean
}

const initialState: HomeState = {
    currencyData: [],
    converting: false,
}

export const convertTo9PopularCurrency = createAsyncThunk('home/convertTo9PopularCurrency', async (args,{getState}) => {
    try {
        const meta :any = getState() as any;
        const {formData} = meta
        const { baseCurr, amount } = formData;
        const {rates} = {...PopularCurrencyData} //data needs to come from api, for now hardCoded
        let key: string;
        let tempData:item[]=[];
        for (key in rates) {
            const rate = rates[key as keyof {}];
            const convertedAmount = rate*amount;
            const item = {
                "from":baseCurr,
                "to":key,
                "amount":convertedAmount
            }
            tempData.push(item)
        }
     
        return tempData;
    } 
    catch (error) {
        // console.log(error);
        return Promise.reject();
    }
})


const homeSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(convertTo9PopularCurrency.pending, state => {
            state.converting=true;
        })
        builder.addCase(convertTo9PopularCurrency.fulfilled, (state, action) => {
            state.currencyData=action.payload
            state.converting=false;
        })
        builder.addCase(convertTo9PopularCurrency.rejected, (state, action) => {
            // state.currencyData=null;
        })
    },
})

export default homeSlice.reducer;