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
import errorHandle from '../../api/error';

  interface DetailModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    item: getDetails;
    onDelete: (id: string) => void;
    onUpdate: (updatedItem: getDetails) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onOpenChange, item, onDelete ,onUpdate }) => {

    const [isEditing,setIsEditing] = useState(false)
    const [data,setData] = useState(item)
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

   
    useEffect(()=>{
        if(!isOpen){
            setSelectedFile(null)
            setIsEditing(false)
            setErrors({});
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
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
      };

      const validateFields = () => {
        const newErrors: Record<string, string> = {};
        if (!data.restaurantName || data.restaurantName.trim().length < 3) {
          newErrors.restaurantName = "Restaurant name must be at least 3 characters.";
        }
        if (!data.address || data.address.trim().length < 5) {
          newErrors.address = "Address must be at least 5 characters.";
        }
        if (!data.contactNo || !/^\d{10}$/.test(data.contactNo)) {
          newErrors.contactNo = "Contact number must be 10 digits.";
        }
        return newErrors;
      };

      const hasChanges = () => {
        return (
          JSON.stringify(item) !== JSON.stringify(data) ||
          !!selectedFile // Check if a new file is selected
        );
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
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        if (!hasChanges()) {
            onOpenChange(false); // Close the modal if no changes are detected
            return;
          }
          setIsUploading(true);
          try {
            if (selectedFile) {
                const uploadedImageUrl = await uploadToCloudinary(selectedFile);
                if (uploadedImageUrl) {
                  data.image = uploadedImageUrl;                  
                } else {
                  throw new Error("Image upload failed.");
                }
              }
             onUpdate(data)
             onOpenChange(false);
          } catch (error) {
            if (error instanceof Error) {
                errorHandle(error); // Handle standard Error objects
            } else {
                console.error("Unexpected error:", error); // Log non-standard errors
                errorHandle(new Error("An unexpected error occurred."));
            }
          }finally{
            setIsUploading(false)
          }
    }
    
  return (
    <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-[400px] h-[500px] bg-gray-300 overflow-y-scroll scrollbar-hide">
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
                  {errors.restaurantName && (
                    <p className="text-red-500 text-sm">
                      {errors.restaurantName}
                    </p>
                  )}
                  
                  <Input label="Address" type="text"  name="address" value={data.address} disabled ={!isEditing}  onChange={handleInputChange} />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                 
                  <Input label="contact no" type="text" name="contactNo" value={data.contactNo} disabled ={!isEditing}    onChange={handleInputChange}  />
                  {errors.contactNo && (
                    <p className="text-red-500 text-sm">{errors.contactNo}</p>
                  )}
                 
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
                  {isUploading ? 'Saving...' : 'Save'}
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
