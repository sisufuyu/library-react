export interface BookBorrowProps {
  borrowerID: string
  borrowDate: Date
  returnDate: Date
}

export interface BookBasicProps {
  _id: string
  title: string
  authors: Author[]
  description: string
  ISBN13: string
  publisher: string
  publishedDate: string | Date,
  genres: string[],
  status?: boolean,
  image?: string
}

export type Book = BookBasicProps & Partial<BookBorrowProps>

export type BookUpdateProps = Omit<BookBasicProps, 'authors' | 'status' | 'image'> & {authors: string[]}

export interface Author {
  _id: string
  fullName: string
  biography?: string
}

export type AuthorWithoutId = Omit<Author, '_id'>

export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  borrowedBooks: string[]
  role: string
}

export type UserName = Pick<User, '_id' | 'firstName' | 'lastName' >

export interface Decoded {
  user: User
  exp: number
}

export interface PopUpProps {
  open: boolean
  setOpen: (open: boolean) => void
}

// name for delete item name, type for delete model type: book or author
export type DeleteModelProps = PopUpProps & {
  name: string
  type: string
  handleDelete: () => void
}

export type BookModelProps = PopUpProps & {
  book?: Book 
}

export type BookImageProps = {
  _id: string
  image: FormData
}

export type SearchBookProps = {
  field: string
  keyword: string
}