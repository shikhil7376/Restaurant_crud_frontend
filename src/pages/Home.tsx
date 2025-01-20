import { Image } from "@heroui/react";

const Home = () => {
    return (
        <div className="">
            <div className=" absolute right-0 p-3">
                <button
                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400 text-white text-2xl font-bold rounded-full shadow-lg hover:scale-110 hover:opacity-90 transition-transform duration-300 ease-in-outhover:ring-4 hover:ring-gray-500 animate-pulse"                    title="Add"
                >
                    +
                </button>
            </div>
            <div className="absolute bottom-11 left-5 flex justify-center gap-3 p-3 w-[70%] overflow-x-scroll scrollbar-hide">
                <Image
                    isZoomed
                    alt="HeroUI Fruit Image with Zoom"
                    src="https://cdn.pixabay.com/photo/2020/08/27/07/31/restaurant-5521372_640.jpg"
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
                <Image
                    isZoomed
                    alt="HeroUI Fruit Image with Zoom"
                    src="https://i.pinimg.com/originals/c2/c6/4b/c2c64b930af48a341c3adef7c659d36e.png"
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
                <Image
                    isZoomed
                    alt="HeroUI Fruit Image with Zoom"
                    src="https://i.pinimg.com/originals/c2/c6/4b/c2c64b930af48a341c3adef7c659d36e.png"
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
                <Image
                    isZoomed
                    alt="HeroUI Fruit Image with Zoom"
                    src="https://i.pinimg.com/originals/c2/c6/4b/c2c64b930af48a341c3adef7c659d36e.png"
                    width={200}
                    height={200}
                    className="rounded-lg"
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
