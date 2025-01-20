import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Input } from "@heroui/react";
import { useState ,ChangeEvent, FormEvent } from "react";
import { FormDetails,ValidationErrors } from "../../interface/datatypes";
import { uploadData } from "../../api/project";
import toast from "react-hot-toast";


const AddModal = () => {
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData,setFormData] = useState<FormDetails>({
    restaurantName: '',
    address: '',
    contactNo: '',
    image: null,
  })

  const [errors, setErrors] = useState<ValidationErrors>({
    restaurantName: '',
    address: '',
    contactNo: '',
    image: '',
  });

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {
      restaurantName: '',
      address: '',
      contactNo: '',
      image: '',
    };
    let isValid = true;

    // Validate restaurantName
    if (!formData.restaurantName) {
      newErrors.restaurantName = 'Restaurant name is required';
      isValid = false;
    }

    // Validate address
    if (!formData.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // Validate contactNo (basic validation for numbers)
    if (!formData.contactNo || !/^\d{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = 'Contact number is required and must be 10 digits';
      isValid = false;
    }

    // Validate image
    if (!formData.image) {
      newErrors.image = 'Image is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>)=>{
     const {name,value} = e.target
      setFormData(prev =>({
        ...prev,
        [name]:value
      }))
  }

  const handleImageChange = (e:ChangeEvent<HTMLInputElement>)=>{
    console.log('hereee');
    
     const file = e.target.files ? e.target.files[0]:null
     setFormData(prevState => ({
      ...prevState,
      image: file,
    }));
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();


    if (!validateForm()) {
      return; 
    }

   
    const formDataToUpload = new FormData();
    if (formData.image) {
      formDataToUpload.append('file', formData.image);
      formDataToUpload.append("upload_preset", "stock_pics");

      try {
        const cloudinaryResponse = await fetch(
          'https://api.cloudinary.com/v1_1/dororvabe/image/upload',
          {
            method: 'POST',
            body: formDataToUpload,
          }
        );
        const cloudinaryData = await cloudinaryResponse.json();
        console.log('cdata',cloudinaryData);
        

        if (cloudinaryData.secure_url) {
          const imageUrl = cloudinaryData.secure_url; 

          const backendData = {
            restaurantName: formData.restaurantName,
            address: formData.address,
            contactNo: formData.contactNo,
            image: imageUrl as string, // Pass the URL directly
          };
        
          if(backendData){
            const response = await uploadData(backendData)
            if(response){
               toast.success("data added sucesfully")
               setFormData({
                restaurantName: '',
                address: '',
                contactNo: '',
                image: null,
              });
              setErrors({
                restaurantName: '',
                address: '',
                contactNo: '',
                image: '',
              });
  
              // Close the modal
              onOpenChange();
            }
          }
        } else {
          throw new Error('Image upload failed');
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <>
      <Button onPress={onOpen}
        className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400 text-white text-2xl font-bold rounded-full shadow-lg hover:scale-110 hover:opacity-90 transition-transform duration-300 ease-in-outhover:ring-4 hover:ring-gray-500 animate-pulse" title="Add"
      >
        +
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="w-[400px] h-[460px] bg-gray-300 overflow-y-scroll scrollbar-hide">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Restaurant</ModalHeader>
              <ModalBody>
                <div className=" w-full flex flex-col gap-1">
                  <Input  label="Restaurant Name" type="text" name="restaurantName" value={formData.restaurantName} onChange={handleInputChange}/>
                  {errors.restaurantName && (
                    <p className="text-red-500 text-sm">{errors.restaurantName}</p>
                  )}
                  <Input label="Address" type="text"  name="address"   value={formData.address}  onChange={handleInputChange}  errorMessage={errors.address}/>
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                  <Input label="contact no" type="text" name="contactNo" value={formData.contactNo} onChange={handleInputChange} errorMessage={errors.contactNo}/>
                  {errors.contactNo && (
                    <p className="text-red-500 text-sm">{errors.contactNo}</p>
                  )}
                  <div>
                    <label htmlFor="image-upload" className="block text-gray-700 text-sm ">
                      Upload Image
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2 p-2 bg-gray-200 rounded-md w-full"
                    />
                     {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                  </div>
                  {formData.image && (
                    <div className="mt-4 flex justify-center ">
                      <img src={URL.createObjectURL(formData.image)} alt="Selected Preview" className="h-[150px] w-[150px]" />
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <button color="primary"  onClick={handleSubmit} className="bg-black text-white p-1 rounded-lg font-semibold">
                  submit
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </>
  )
}

export default AddModal
