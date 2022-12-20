import { useEffect, useState } from 'react'
import { z } from 'zod'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatePicker from 'react-datepicker'

import { BookModelProps } from 'type'
import PopUpModel from 'components/Common/PopUpModel'
import { categoryList, capitalizeName } from 'utils/helper'
import { useAppDispatch } from 'redux/hooks'
import { updateBookThunk } from 'redux/slices/booksSlice'
import 'react-datepicker/dist/react-datepicker.css'

export const validationSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  ISBN13: z.string().min(1, { message: 'ISBN13 is required' }),
  publisher: z.string().min(1, { message: 'Publisher is required' }),
  publishedDate: z.preprocess(
    (arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({
      required_error: 'Book published date is required',
      invalid_type_error: 'Book published date is not valid',
    })
  ),
  author: z.string().optional(),
  genres: z.string({ required_error: 'Book genre is required' }).array(),
})

export type ValidationSchema = z.infer<typeof validationSchema>

const EditBookFom = ({ open, setOpen, book }: BookModelProps) => {
  const dispatch = useAppDispatch()

  const { register, handleSubmit, formState: { errors }, setValue, getValues, setError, control } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const [authors, setAuthors] = useState<string[]>([])

  useEffect(() => {
    setValue("title", book?.title as string)
    setValue("ISBN13", book?.ISBN13 as string)
    setValue("publisher", book?.publisher as string)
    setValue("genres", book?.genres as string[])
    setValue("description", book?.description as string)

    const defaultDate = book?.publishedDate ? new Date(book?.publishedDate) : new Date()
    setValue("publishedDate", defaultDate)

    const initialAuthors = book?.authors.map(au => au.fullName)
    setAuthors(initialAuthors || [])
  }, [book, setValue])

  const addAuthor = () => {
    const author = getValues('author')
    if (!author || authors.includes(author)) return
    else {
      setAuthors([...authors, capitalizeName(author.trim())])
      setValue('author', '')
    }
  }

  const handleDeleteAuthor = (author: string) => {
    setAuthors(authors.filter(au => au !== author))
  } 

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    if(authors.length === 0) {
      setError('author', { type: 'custom', message: 'author is required' })
      return
    }
    const update = {...data, authors, _id: book?._id as string}
    delete update.author

    dispatch(updateBookThunk(update))

    setOpen(false)
  }

  const handleCancel = () => setOpen(false)
  return (
    <PopUpModel open={open}>
      <form className="popupmodel__container book-model" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="popupmodel__title">Edit Book</h3>
        <div className="flex flex-col py-1">
          <label htmlFor="book-title" className="book-model__label">Book Title</label>
          <input 
              type="text" 
              id="book-title" 
              className="text-input"
              {...register("title")}
          />
          <p className="book-model__error">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="isbn13" className="book-model__label">ISBN13</label>
          <input 
              type="text"
              id="isbn13" 
              className="text-input"
              {...register("ISBN13")}
          />
          <p className="book-model__error">{errors.ISBN13?.message}</p>
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="publisher" className="book-model__label">Publisher</label>
          <input 
            type="text" 
            id="publisher" 
            className="text-input"
            {...register("publisher")}
          />
          <p className="book-model__error">{errors.publisher?.message}</p>
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="published-date" className="book-model__label">Published date</label>
          <Controller 
            control={control}
            name="publishedDate"
            render={({ field: {onChange, value} }) =>
              <DatePicker
                selected={value}
                onChange={onChange}
              />
            }
          />
          <p className="book-model__error">{errors.publishedDate?.message}</p>
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="author-name" className="book-model__label mr-3">Author</label>
          <div className="flex items-center">
          <input
            id="author-name" 
            className="text-input flex-1"
            {...register("author")} 
          />
          <button 
            className="bg-faded-red h-10 py-2.5 px-4 text-white rounded-lg ml-4 text-sm" 
            onClick={addAuthor}
            type="button"
          >
            Add
          </button>
          </div>
          <p className="book-model__error">{errors.author?.message}</p>
          <ul className="flex-1 flex items-center justify-start">
            {authors.map(author => 
              <li key={author} className="mr-3 bg-stone-50 p-2 flex justify-between rounded-md text-dune">
                <span>{author}</span>
                <button onClick={() => handleDeleteAuthor(author)}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6 stroke-red-600"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className="flex flex-wrap py-1 items-center">
          <label htmlFor="genres" className="book-model__label">Select genres</label>
          <select 
            multiple 
            id="genres" 
            className="bg-stone-50 text-dune text-sm border rounded-lg focus:ring focus:ring-amber-400 focus:ring-offset-2 focus:outline-none w-full h-52 p-2.5 mt-2"
            {...register("genres")}
          >
            {categoryList.map(category => 
            <option value={category} key={category}>{category}</option>
            )} 
          </select>
        </div>
        <div className="flex flex-col py-1">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            rows={10}
            className="outline-faded-red p-2 my-2 border rounded-md w-full h-48"
            {...register("description")}
          />
          <p className="book-model__error">{errors.description?.message}</p>
        </div>
        <div className="mt-2 flex justify-center">
          <button className="bg-faded-red p-2 text-white rounded-lg ml-10 text-sm" type="submit">
            Confirm
          </button>
          <button className="bg-white border p-2 text-gray-500 rounded-lg ml-10 text-sm" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>    
    </PopUpModel>
  )
}

export default EditBookFom
