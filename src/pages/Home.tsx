import AddModal from "../components/modal/AddModal";

const Home = () => {
    return (
        <div className="">
          
            <div className=" absolute right-0 p-3">
            <AddModal/>
            </div>
          
            <div className="absolute bottom-11 left-5 flex justify-center gap-3 p-3 w-[70%] overflow-x-scroll scrollbar-hide">
                <img
                    alt="HeroUI Fruit Image with Zoom"
                    src="https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_640.jpg"
                    width={200}
                    className="rounded-lg"
                    style={{objectFit:'cover',height:'250px'}}
                />
                <img
                    
                    alt="HeroUI Fruit Image with Zoom"
                    src="https://i.pinimg.com/originals/c2/c6/4b/c2c64b930af48a341c3adef7c659d36e.png"
                    width={200}
                    className="rounded-lg"
                    style={{objectFit:'cover',height:'250px'}}
                    
                />
                <img
                    
                    alt="HeroUI Fruit Image with Zoom"
                    src="https://watermark.lovepik.com/photo/20211208/large/lovepik-hotel-restaurant-environment-picture_501623026.jpg"
                    width={200}
                    className="rounded-lg"
                    style={{objectFit:'cover',height:'250px'}}
                />
                <img
                    alt="HeroUI Fruit Image with Zoom"
                    src="https://i.pinimg.com/originals/c2/c6/4b/c2c64b930af48a341c3adef7c659d36e.png"
                    width={200}
                    className="rounded-lg"
                    style={{objectFit:'cover',height:'250px'}}
                />
            </div>
            <div className=" p-1 absolute bottom-0 left-10 pagination-controls flex gap-4 ">
                <button
                    className={`px-4 py-2 font-semibold text-xl bg-opacity-50 backdrop-blur-lg text-white rounded-full hover:bg-gray-400 focus:outline-none 
              `}
                >
                    {'<'}
                </button>

                <button

                    className={`px-4 py-2 font-semibold text-xl bg-opacity-50 backdrop-blur-lg text-white rounded-full hover:bg-gray-400 focus:outline-none 
              `}
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}

export default Home
