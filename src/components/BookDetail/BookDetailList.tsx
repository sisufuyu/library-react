import { Book } from "type"
import { getYear } from 'utils/helper'

const BookDetailList = ({ book }: { book: Book }) => {
  return (
    <ul className="book-detail-list flex flex-col">
      <li className="book-detail-item" key="book-authors">
        <p className="book-detail-text">Authors:</p>
        <ul className="flex">
            {book.authors.map((author) => (
            <li key={author._id} className="book-detail-content whitespace-nowrap">
            {author.fullName}
            </li>
            ))}
        </ul>
      </li>
      <li className="book-detail-item" key="book-publisher">
        <p className="book-detail-text">Publisher:</p>
        <p className="book-detail-content whitespace-nowrap">{book.publisher}</p>
      </li>
      <li className="book-detail-item" key="book-publish-date">
        <p className="book-detail-text">Year of Publish:</p>
        <p className="book-detail-content">
        {getYear(book.publishedDate)}
        </p>
      </li>
      <li className="book-detail-item" key="book-ISBN13">
        <p className="book-detail-text">ISBN13:</p>
        <p className="book-detail-content whitespace-nowrap">{book.ISBN13}</p>
      </li>
      <li className="book-detail-item" key="book-genres">
        <p className="book-detail-text">Genres:</p>
        <ul className="flex">
        {book.genres.map((genre) => (
            <li key={genre} className="book-detail-content whitespace-nowrap">
            {genre}
            </li>
        ))}
        </ul>
      </li>
    </ul>
  )
}

export default BookDetailList