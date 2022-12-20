import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="wrapper px-20 flex flex-column items-center h-[calc(100vh-5rem)]">
      <section className="flex-1 mr-20">
        <h1 className="text-4xl font-bold py-2">404</h1>
        <p className="text-2xl font-semi-bold py-0.5">Oops!</p>
        <p className="text-2xl font-semi-bold py-0.5">Page Not Found</p>
        <p className="text-md py-2 text-stone-500">This page doesn't exist or was removed! We suggest you go back to home</p>
        <Link to="/"><button className="py-3 px-5 mt-3 rounded-full bg-faded-red text-white">Back to Home</button></Link>
      </section>
      <img src="/images/404Page.png" alt="not found" className="flex-1 w-2/5 opacity-90"/>
    </div>
  )
}

export default NotFound