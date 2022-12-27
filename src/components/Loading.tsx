const Loading = () => {
  return (
    <div className="mt-56 flex flex-col items-center justify-center">
      <div className="animate-spin w-16 h-16 rounded-full border-t-faded-red border-b-faded-red border-r-transparent border-l-transparent border-4"></div>
      <div className="animate-pulse mt-4 text-lg font-medium">Loading...</div>
    </div>
  )
}

export default Loading