import {
  Box,
  Heading,
  HStack,
  Image,
  Text,
  IconButton,
  useColorModeValue,
  useToast,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  Modal,
  ModalHeader,
  ModalCloseButton,
  VStack,
  Input,
  Button,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useProductStore from "../store/product";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDelete = async (id) => {
    const response = await deleteProduct(id);
    if (!response.success) {
      toast({
        title: "Error",
        description: response.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: response.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleUpdateForm = async (id) => {
    const response = await updateProduct(id, updatedProduct);
    onClose();
    if (!response.success) {
      toast({
        title: "Error",
        description: response.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: response.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  return (
    <Box
      rounded={"lg"}
      overflow={"hidden"}
      shadow={"lg"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      backgroundColor={bg}
      borderWidth={1} // Add border width
      borderColor={borderColor} // Set border color
      borderStyle="solid" // Set border style
    >
      <Image
        src={product.image}
        alt={product.name}
        w={"full"}
        h={48}
        objectFit={"cover"}
        transition="0.3s"
        _hover={{ transform: "scale(1.05)" }} // Hover effect
      />{" "}
      <Box p={5}>
        <Heading textTransform={"capitalize"} as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"lg"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={4}>
          <IconButton colorScheme="blue" icon={<FaEdit />} onClick={onOpen} />
          <IconButton
            colorScheme="red"
            icon={<FaTrashAlt />}
            onClick={() => handleDelete(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} p={4}>
              <Input
                type="text"
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) => handleChange(e)}
                name="name"
              />
              <Input
                type="number"
                placeholder="Product Price"
                value={updatedProduct.price}
                onChange={(e) => handleChange(e)}
                name="price"
              />
              <Input
                type="text"
                placeholder="Product Image Url"
                value={updatedProduct.image}
                onChange={(e) => handleChange(e)}
                name="image"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleUpdateForm(product._id)}
              colorScheme="blue"
              mr={3}
            >
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
