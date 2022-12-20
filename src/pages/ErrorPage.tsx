import Header from "components/Header"
import NotFound from "components/NotFound"

//when router is not found, show this error page
const ErrorPage = () => {
  return (
    <div>
      <Header />
      <NotFound />
    </div>
  )
}

export default ErrorPage