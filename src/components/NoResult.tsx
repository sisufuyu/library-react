const NoResult = () => {
  return (
    <div className="mt-56 flex flex-col items-center">
      <h1 className="text-faded-red text-3xl font-bold">No Books Found</h1>
      <p className="mt-6">We couldn't found the books you searched for. Try search again!</p>
    </div>
  )
}

export default NoResult