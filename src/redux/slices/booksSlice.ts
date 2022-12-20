import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { 
  Book,
  BookBorrowProps, 
  BookUpdateProps, 
  BookImageProps, 
  SearchBookProps,
} from 'type'
import { 
  fetchBooks, 
  fetchBookById, 
  borrowBook, 
  returnBook, 
  createBook, 
  deleteBook, 
  updateBook, 
  uploadBookImage,
  searchBooks,
} from 'services/bookService'

export interface BookState {
  bookList: Book[]
  refList: Book[]
  currentBook: Book,
  searchType: string,
  searchKeyword: string,
  error: string,
  loading: false,
  message: string
}

export interface searchProps {
  searchType: string,
  searchKeyword: string
}

const emptyBook = {
  _id: '',
  title: '',
  authors: [
    {
      _id: '',
      fullName: '',
    },
  ],
  description: '',
  ISBN13: '',
  publisher: '',
  publishedDate: '',
  genres: [],
  image: ''
}

const initialState: BookState = {
  bookList: [],
  refList: [],
  currentBook: emptyBook,
  searchType: 'All Fields',
  searchKeyword: '',
  error: '',
  loading: false,
  message: ''
}

export const fetchBooksThunk = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const res = await fetchBooks()
    return res.data
  }
)

export const fetchBookByIdThunk = createAsyncThunk(
  'book/fetchBookById',
  async (bookId: string) => {
    const res = await fetchBookById(bookId)
    return res.data
  }
)

export const borrowBookThunk = createAsyncThunk(
  'books/borrowBook',
  async ({ bookId, borrowerID, borrowDate, returnDate}: BookBorrowProps & { bookId: string }, { rejectWithValue }) => {
    console.log('borrow book thunk')
    try {
      const res = await borrowBook(bookId, { borrowerID, borrowDate, returnDate })
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const returnBookThunk = createAsyncThunk(
  'books/returnBook',
  async (bookId: string, { rejectWithValue }) => {
    console.log('return book thunk')
    try {
      const res = await returnBook(bookId)
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const createBookThunk = createAsyncThunk(
  'books/createBook',
  async (book: FormData, { rejectWithValue }) => {
    try {
      const res = await createBook(book)
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const deleteBookThunk = createAsyncThunk(
  'books/deleteBook',
  async (bookId: string, { rejectWithValue }) => {
    try {
      const res = await deleteBook(bookId)
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const updateBookThunk = createAsyncThunk(
  'books/updateBook',
  async (book: BookUpdateProps, { rejectWithValue }) => {
    try {
      const res = await updateBook(book._id as string, book)
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const uploadBookImageThunk = createAsyncThunk(
  'books/uploadBookImage',
  async ({ _id, image }: BookImageProps, { rejectWithValue }) => {
    try {
      const res = await uploadBookImage(_id, image)
      return res.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const searchBooksThunk = createAsyncThunk(
  'books/searchBooks',
  async ({ field, keyword }: SearchBookProps) => {
    const res = await searchBooks(field, keyword)
    return res.data
  }
)

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload
    },
    setSearchType: (state, action: PayloadAction<string>) => {
      state.searchType = action.payload
    },  
    // filterBooks: (state, action) => {
    //   const keyword = state.searchKeyword.toLocaleLowerCase()
    //   const type = state.searchType
    //   let filterList: Book[] = []

    //   if (type === 'title') {
    //     filterList = state.bookList.filter(book => book.title.toLocaleLowerCase().includes(keyword))
    //   } else if (type === 'isbn') {
    //     filterList = state.bookList.filter(book => book.ISBN13 === keyword)
    //   } else if (type === 'author') {
    //     filterList = state.bookList.filter(book => book.authors.some(author => author.fullName.toLocaleLowerCase().includes(keyword)))
    //   } else {
    //     filterList = state.bookList.filter(book => 
    //       book.title.toLocaleLowerCase().includes(keyword) ||
    //       book.ISBN13 === keyword ||
    //       book.authors.some(author => author.fullName.toLocaleLowerCase().includes(keyword))
    //     )
    //   }

    //   state.refList = [...filterList]
    // },
    filterBooksByGenre: (state, action: PayloadAction<string>) => {
      let list = [...state.bookList]

      if (action.payload !== 'All') {
        list = state.bookList.filter(book => book.genres.some(genre => genre === action.payload))
      }

      state.refList = list
    },
    filterBooksByStatus: (state, action: PayloadAction<boolean>) => {
      let list = [...state.refList]

      if (action.payload) {
        list = state.refList.filter(book => book.status)
      }

      state.refList = [...list]
    },
    clearBookMessage: (state) => {
      state.message = ''
    },
    clearBookError: (state) => {
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.pending, (state) => {
        state.error = ''
        state.message = ''
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.bookList = action.payload 
        state.refList = action.payload
      })
      .addCase(fetchBooksThunk.rejected, (state) => {
        state.error = 'Fetch books failed!'
      })
      .addCase(fetchBookByIdThunk.pending, (state) => {
        state.error = ''
        state.message = ''
      })
      .addCase(fetchBookByIdThunk.fulfilled, (state, action: PayloadAction<Book>) => {
        state.currentBook = action.payload
      })
      .addCase(fetchBookByIdThunk.rejected, (state) => {
        state.error = 'Not Found!'
      })
      .addCase(borrowBookThunk.pending, (state) => {
        state.error = ''
        state.message = ''
      })
      .addCase(borrowBookThunk.fulfilled, (state, action: PayloadAction<Book>) => {
        const newBook = action.payload

        const list = state.bookList.map(book => {
          if (book._id === newBook._id) return newBook
          else return book
        })

        state.bookList = [...list]
        state.refList = [...list]
        state.message = 'Book borrowed! You can find it on your bookshelf.'
      })
      .addCase(borrowBookThunk.rejected, (state, action) => {
        const err = action.payload

        if (err instanceof AxiosError) {
          const errData = err.response?.data
          if (errData.statusCode === 401) {
            state.error = 'Authorization fail'
          }
        } else state.error = 'Borrow Book failed!'
      })
      .addCase(returnBookThunk.pending, (state) => {
        state.error = ''
        state.message = ''
      })
      .addCase(returnBookThunk.fulfilled, (state, action: PayloadAction<Book>) => {
        const returnBook = action.payload

        const list = state.bookList.map(book => {
          if (book._id === returnBook._id) return returnBook
          else return book
        })

        state.bookList = [...list]
        state.refList = [...list]
        state.message = 'Return Book successfully!'
      })
      .addCase(returnBookThunk.rejected, (state, action) => {
        const err = action.payload

        if (err instanceof AxiosError) {
          const errData = err.response?.data
          if (errData.statusCode === 401) {
            state.error = 'Authorization fail'
          }
        } else state.error = 'Return Book failed!'
      })
      .addCase(createBookThunk.pending, (state) => {
        state.error = ''
        state.message = ''
      })
      .addCase(createBookThunk.fulfilled, (state, action: PayloadAction<Book>) => {
        const newBook = action.payload
        state.bookList = [...state.bookList, newBook]
        state.message = 'Create book successfully!'
      })
      .addCase(createBookThunk.rejected, (state, action) => {
        const err = action.payload

        if (err instanceof AxiosError) {
          const errData = err.response?.data
          if (errData.statusCode === 401) {
            state.error = 'Authorization fail'
          }
        } else state.error = 'Create Book failed!'

      })
      .addCase(deleteBookThunk.pending, (state) => {
        state.error = ''
        state.message = ''
      })
      .addCase(deleteBookThunk.fulfilled, (state, action: PayloadAction<Book>) => {
        const deletedBook = action.payload
        state.bookList = state.bookList.filter(book => book._id !== deletedBook._id)
        state.message = 'Delete book successfully!'
      })
      .addCase(deleteBookThunk.rejected, (state, action) => {
        const err = action.payload

        if (err instanceof AxiosError) {
          const errData = err.response?.data
          if (errData.statusCode === 401) {
            state.error = 'Authorization fail'
          }
        } else state.error = 'Delete book failed!'
      })
      .addCase(updateBookThunk.pending, (state) => {
        state.error = ''
        state.message = ''
      })
      .addCase(updateBookThunk.fulfilled, (state, action: PayloadAction<Book>) => {
        const update = action.payload

        state.bookList = state.bookList.map(book => {
          if(book._id === update._id) return update
          else return book
        })

        state.message = 'Update book successfully!'
      })
      .addCase(updateBookThunk.rejected, (state, action) => {
        const err = action.payload

        if (err instanceof AxiosError) {
          const errData = err.response?.data
          if (errData.statusCode === 401) {
            state.error = 'Authorization fail'
          }
        } else state.error = 'Update book failed!'
      })
      .addCase(uploadBookImageThunk.pending, (state) => {
        state.error = ''
        state.message = ''
      })
      .addCase(uploadBookImageThunk.fulfilled, (state, action: PayloadAction<Book>) => {
        const update = action.payload

        state.bookList = state.bookList.map(book => {
          if(book._id === update._id) return update
          else return book
        })

        state.message = 'Upload image successfully!'
      })
      .addCase(uploadBookImageThunk.rejected, (state, action) => {
        const err = action.payload

        if (err instanceof AxiosError) {
          const errData = err.response?.data
          if (errData.statusCode === 401) {
            state.error = 'Authorization fail'
          }
        } else state.error = 'Upload book image failed!'
      })
      .addCase(searchBooksThunk.fulfilled, (state, action) => {
        const books = action.payload

        state.refList = books
      })
  },
})

export const { 
  setSearchKeyword, 
  setSearchType, 
  filterBooksByGenre, 
  filterBooksByStatus,
  clearBookMessage,
  clearBookError,
} = booksSlice.actions

export default booksSlice.reducer
