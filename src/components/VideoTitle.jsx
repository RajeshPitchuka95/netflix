
function VideoTitle({title,overview}) {
  return (
    <div className=" w-screen aspect-video pt-36 px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg  w-1/3">{overview}</p>
      <div className="">
        <button className="bg-white text-black p-4  px-8  text-xl bg-opacity-50 rounded-lg hover:bg-white" >▶️ Play</button>
        <button className="bg-gray-500 text-white p-4  px-8 mx-2  text-xl bg-opacity-50 rounded-lg">ℹ️ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle