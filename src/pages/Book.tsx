import { useParams } from 'react-router-dom'

import BookDetail from 'components/BookDetail'
import Alert from 'components/Common/Alert'
import Message from 'components/Common/Message'

const Book = () => {
  const { bookId } = useParams()

  return (
    <div>
      <Alert />
      <Message />
      <BookDetail bookId={bookId} />
    </div>
  )
}

export default Book
