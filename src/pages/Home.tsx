import { useState,useEffect } from "react";
import AddModal from "../components/modal/AddModal";
import { getDetails } from "../interface/datatypes";
import { getData } from "../api/project";
import errorHandle from "../api/error";


const Home = () => {
    const [data,setData] = useState<getDetails[]>([])
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
    });

    useEffect(() => {
        fetchUserData(pagination.currentPage);
    }, [pagination.currentPage]);


  const fetchUserData = async(page:number)=>{

      try {
       const response = await getData(page,4)  
       console.log('response',response);
       
       if (response && response.data) {
        setData(response.data);
        setPagination({
            currentPage: response.pagination.currentPage,
            totalPages: response.pagination.totalPages,
            totalCount: response.pagination.totalCount,
        });
    } 
      } catch (error) {
        if (error instanceof Error) {
            errorHandle(error);
        } else {
            errorHandle(new Error("An unexpected error occurred."));
        }
      }
  }

  
  const handlePageChange = (newPage: number) => {
    console.log('herer');
    
    if (newPage >= 1 && newPage <= pagination.totalPages) {
        setPagination((prev) => ({ ...prev, currentPage: newPage }));
    }
};

    return (
        <div className="">
          
            <div className=" absolute right-0 p-3">
            <AddModal/>
            </div>
          
            <div className="absolute bottom-11 left-5 flex  gap-3 p-3 w-[70%] overflow-x-scroll scrollbar-hide">
                {
                    data.map((item)=>(
                        <img
                    key={item.id}
                    alt="HeroUI Fruit Image with Zoom"
                    src={item.image}
                    width={200}
                    className="rounded-lg"
                    style={{objectFit:'cover',height:'250px'}}
                     />
                    ))
                }
              
              
              
            </div>
            {data.length > 0 && (
                <>
            <div className=" p-1 absolute bottom-0 left-10 pagination-controls flex gap-4 ">
                <button
                 onClick={() => handlePageChange(pagination.currentPage - 1)}
                 disabled={pagination.currentPage === 1}
                    className={`px-4 py-2 font-semibold text-xl bg-opacity-50 backdrop-blur-lg text-white rounded-full hover:bg-gray-400 focus:outline-none 
             ${ pagination.currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''} `}
                >
                    {'<'}
                </button>

                <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                    className={`px-4 py-2 font-semibold text-xl bg-opacity-50 backdrop-blur-lg text-white rounded-full hover:bg-gray-400 focus:outline-none 
                        ${ pagination.currentPage === pagination.totalPages ? 'cursor-not-allowed opacity-50' : ''}
              `}
                >
                    {'>'}
                </button>
            </div>
            </>
      )}
        </div>
    )
}

export default Home
