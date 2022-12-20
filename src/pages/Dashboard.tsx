import CreateAuthor from 'components/Dashboard/CreateAuthor'
import CreateBook from 'components/Dashboard/CreateBook'
import AuthorTable from 'components/Dashboard/AuthorTable'
import BookTable from 'components/Dashboard/BookTable'
import Alert from 'components/Common/Alert'
import Message from 'components/Common/Message'

const Dashboard = () => {
  return (
    <div className="py-10">
      <Alert />
      <Message />
      <div className="flex px-10 py-4">
        <CreateBook />
        <CreateAuthor />
      </div>
      <AuthorTable />
      <BookTable />
    </div>
  )
}

export default Dashboard