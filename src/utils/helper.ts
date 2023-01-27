import { Author } from 'type'

export const categoryList = [
  'Action & Adventure',
  'Fantasy',
  'Science Fiction',
  'Classic',
  'Suspense & Thriller',
  'Horror',
  'Detective & Mystery',
  'Romance',
  'Young Adult',
  'Poetry',
  'Comic Book & Graphic Novel',
  'Historical Fiction',
  'Literary Fiction',
  'Comedy',
  'Self-Help',
  'Biography & Autobiography',
  'History',
  'Cookbook',
  'True Crime'
]

export const concatAuthors = (authors: Author[]) => {
  let str = ''
  if (authors.length > 0) {
    authors.forEach((author, index) => {
    if (index === 0) str = author.fullName
    else str = str + ', ' + author.fullName
    })
  }
  return str
}

export const capitalizeName = (name: string): string => {
  name = name.toLocaleLowerCase()
  let arr = name.split(' ')
  arr = arr.map(str => str[0].toUpperCase() + str.slice(1))
  return arr.join(' ')
}

export const getYear = (date: string | Date): string => {
  let time
  if(date instanceof Date) {
    time = date
  } else time = new Date(date)
  return time.getFullYear().toString() || ''
}

//form date in yyyy-mm-dd format
export const formDate = (date: Date | string | number | undefined) => {
  if (!date) return ''
  if (typeof date === 'string' || typeof date === 'number') date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

//get 30days later date from now
export const getMaxDate = (date: Date) => {
  const oneMonthLater = date.getTime() + 30*24*60*60*1000
  return new Date(oneMonthLater)
}

export function sliceData<T>(data: T[], page: number, rowsPerPage: number) {
  const start = (page - 1) * rowsPerPage
  const end = Math.min(page * rowsPerPage, data.length)
  return data.slice(start, end)
}

export const REACT_APP_SERVER_URL= 'https://yu-library-rest-api.up.railway.app'