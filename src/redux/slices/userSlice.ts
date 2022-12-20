import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { User, UserName } from 'type'
import { updateUser, fetchUserById } from 'services/userService'

export type UserState = {
  userInfo: User 
  loginStatus: boolean
  error: string
  token: string
}

const initialUser = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  borrowedBooks: [],
  role: 'USER',
}

const initialState: UserState = {
  userInfo: {...initialUser},
  loginStatus: false,
  error: '',
  token: ''
}

export const updateUserInfoThunk = createAsyncThunk(
  'user/updateUser',
  async ({ _id, firstName, lastName }: UserName, { rejectWithValue }) => {
    try {
      const response = await updateUser(_id, { firstName, lastName })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const fetchUserThunk = createAsyncThunk(
  'user/fetchUser',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetchUserById(id)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginStatus: (state, action: PayloadAction<boolean>) => {
      state.loginStatus = action.payload
    },
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = { ...action.payload }
    },
    setLogout: (state) => {
      state.loginStatus = false
      state.token = ''
      state.error = ''
      state.userInfo = {...initialUser}
    },
    addBorrowedBooks: (state, action: PayloadAction<string>) => {
      const bookId = action.payload
      state.userInfo.borrowedBooks = [ ...state.userInfo.borrowedBooks, bookId]
    },
    removeBorrowedBooks: (state, action: PayloadAction<string>) => {
      const bookId = action.payload
      state.userInfo.borrowedBooks = state.userInfo.borrowedBooks.filter(id => id !== bookId)
    },
    clearUserError: (state) => {
      state.error = ''
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    clearToken: (state) => {
      state.token = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(updateUserInfoThunk.pending, (state) => {
      state.error = ''
    })
    .addCase(updateUserInfoThunk.fulfilled, (state, action: PayloadAction<User>) => {
      state.userInfo = { ...state.userInfo, ...action.payload }
    })
    .addCase(updateUserInfoThunk.rejected, (state, action) => {
      const err = action.payload
        
      if(err instanceof AxiosError) {
        const errData = err.response?.data
        if(errData.statusCode === 401) {
          state.error = 'Authorization fail'
        }
      } else state.error = 'Update user info failed!'
    })
    .addCase(fetchUserThunk.pending, (state) => {
      state.error = ''
    })
    .addCase(fetchUserThunk.fulfilled, (state, action: PayloadAction<User>) => { 
      state.userInfo = { ...state.userInfo, ...action.payload }
    })
    .addCase(fetchUserThunk.rejected, (state, action) => {
      const err = action.payload
        
      if(err instanceof AxiosError) {
        const errData = err.response?.data
        if(errData.statusCode === 401) {
          state.error = 'Authorization fail'
        }
      } else state.error = 'Fetch user info failed!'
    })
  }
})

export const { 
  setLoginStatus, 
  setUserInfo, 
  setLogout, 
  addBorrowedBooks, 
  removeBorrowedBooks, 
  clearUserError,
  setToken,
  clearToken
} = userSlice.actions
export default userSlice.reducer