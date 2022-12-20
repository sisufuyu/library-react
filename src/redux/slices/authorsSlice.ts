import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { Author, AuthorWithoutId } from 'type'
import { fetchAuthors, createAuthor, editAuthorById, deleteAuthorById } from 'services/authorService'

export interface AuthorState {
  authorList: Author[]
  error: string
  message: string
}

const initialState: AuthorState = {
  authorList: [],
  error: '',
  message: ''
}

export const fetchAuthorsThunk = createAsyncThunk(
  'authors/fetchAuthors',
  async () => {
    const res = await fetchAuthors()
    return res.data
  }
)

export const createAuthorThunk = createAsyncThunk(
  'authors/createAuthor',
  async (author: AuthorWithoutId, { rejectWithValue }) => {
    try {
      const res = await createAuthor(author)
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const editAuthorByIdThunk = createAsyncThunk(
  'authors/editAuthor',
  async ({_id, author}: {_id: string, author: Partial<Author>}, { rejectWithValue }) => {
    try {
      const res = await editAuthorById(_id, author)
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const deleteAuthorThunk = createAsyncThunk(
  'authors/deleteAuthor',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteAuthorById(id)
      return res.data
    } catch (err) {
      console.log(err)
      return rejectWithValue(err)  
    }
  }
)

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    clearAuthorMessage: (state) => {
      state.message = ''
    },
    clearAuthorError: (state) => {
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAuthorsThunk.pending, (state) => {
      state.error = ''
      state.message = ''
    })
    .addCase(fetchAuthorsThunk.fulfilled, (state, action: PayloadAction<Author[]>) => {
      state.authorList = [...action.payload]
    })
    .addCase(fetchAuthorsThunk.rejected, (state) => {
      state.error = 'Fetch authors failed!'
    })
    .addCase(createAuthorThunk.pending, (state) => {
      state.error = '' 
      state.message = ''
    })
    .addCase(createAuthorThunk.fulfilled, (state, action: PayloadAction<Author>) => {
      state.authorList = [...state.authorList, action.payload]

      state.message = 'Author created!'
    })
    .addCase(createAuthorThunk.rejected, (state, action) => {
      const err = action.payload

      if(err instanceof AxiosError) {
        const errData = err.response?.data
        if(errData.statusCode === 401) {
        state.error = 'Authorization fail'
        }
      } else state.error = 'Create author failed!'
    })
    .addCase(editAuthorByIdThunk.pending, (state) => {
      state.error = '' 
      state.message = ''
    })
    .addCase(editAuthorByIdThunk.fulfilled, (state, action: PayloadAction<Author>) => {
      const newAuthor = action.payload

      state.authorList = state.authorList.map(author => {
        if (author._id === newAuthor._id ) return newAuthor
        return author
      })

      state.message = 'Author updated!'
    })
    .addCase(editAuthorByIdThunk.rejected, (state, action) => {
      const err = action.payload
  
      if (err instanceof AxiosError) {
        const errData = err.response?.data
        if (errData.statusCode === 401) {
          state.error = 'Authorization fail'
        }
      } else state.error = 'Create author failed!'
    })
    .addCase(deleteAuthorThunk.pending, (state) => {
      state.error = ''
      state.message = ''
    })
    .addCase(deleteAuthorThunk.fulfilled, (state, action: PayloadAction<Author>) => {
      const deleted = action.payload
      state.authorList = state.authorList.filter(author => author._id !== deleted._id)

      state.message = 'Author deleted!'
    })
    .addCase(deleteAuthorThunk.rejected, (state, action) => {
      const err = action.payload
      console.log(err)
      if (err instanceof AxiosError) {
        const errData = err.response?.data
        if (errData.statusCode === 405) {
          state.error = 'This author has a book, not allow to delete'
        } else if (errData.statusCode === 401) {
          state.error = 'Authorization fail'
        } else state.error = 'Delete author failed!'
      } else state.error = 'Delete author failed!'
    })
  }
})

export const { clearAuthorMessage, clearAuthorError } = authorsSlice.actions

export default authorsSlice.reducer