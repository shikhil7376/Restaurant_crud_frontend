import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@heroui/react";
  import { Input } from "@heroui/react";
  import { getDetails } from '../../interface/datatypes';
  import { FaEdit } from "react-icons/fa";
  import Spinner from '../ui/spinner';
  import { MdDelete } from "react-icons/md";
  import axios from 'axios';

  interface DetailModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    item: getDetails;
    onDelete: (id: string) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onOpenChange, item, onDelete }) => {

    const [isEditing,setIsEditing] = useState(false)
    const [data,setData] = useState(item)
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log(data);
    

    useEffect(()=>{
        if(!isOpen){
            setSelectedFile(null)
            setIsEditing(false)
        }
        setData(item)
    },[isOpen,item])

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            onDelete(item.id)
            onOpenChange(false)
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
      };

      const uploadToCloudinary = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "stock_pics");  // Replace with your preset    
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dororvabe/image/upload`,
                formData
              );
   
          if (response?.data.secure_url) {
            return response?.data.secure_url;
          }
        } catch (error) {
          console.error("Cloudinary upload failed:", error);
        }
        return null;
      };

    const handleSave = async()=>{

    }
    
  return (
    <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-[400px] h-[460px] bg-gray-300 overflow-y-scroll scrollbar-hide">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              {isLoading ? (
                <Spinner />
              ) : (
                <div className='flex gap-3'>
            <MdDelete color='red' size={25} onClick={handleDelete} className=' '  />
            <p>View Details</p>
                 </div>   
              )}
              </ModalHeader>
              <ModalBody>
                <div className=" w-full flex flex-col items-center gap-1">
                  <Input  label="Restaurant Name" type="text" name="restaurantName" value={data.restaurantName} disabled ={!isEditing} onChange={handleInputChange} />
                  
                  <Input label="Address" type="text"  name="address" value={data.address} disabled ={!isEditing}  onChange={handleInputChange} />
                 
                  <Input label="contact no" type="text" name="contactNo" value={data.contactNo} disabled ={!isEditing}    onChange={handleInputChange}  />
                 
                  {isUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                      <Spinner />
                    </div>
                  ) : selectedFile ? (
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      className="h-[150px] w-[150px]  object-cover rounded-md"
                      alt="Preview"
                    />
                  ) : (
                    <img
                      src={item.image}
                      className="h-[150px] w-[150px] object-cover rounded-md "
                      alt="Uploaded"
                    />
                  )}
                  {isEditing &&(
                        <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="mt-2  md:w-[300px] overflow-hide "
                      />
                  )}
                
                
                </div>
              </ModalBody>
              <ModalFooter>
              {isEditing ? (
                <Button onClick={handleSave} isDisabled={isUploading} className='bg-blue-400 text-white font-semibold'>
                  Save
                </Button>
              ) : (
                <FaEdit size={25} onClick={() => setIsEditing(true)} />
              )}
              
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  )
}

export default DetailModal
