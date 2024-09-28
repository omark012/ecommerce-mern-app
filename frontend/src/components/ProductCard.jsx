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
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useProductStore from "../store/product";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      rounded={"lg"}
      overflow={"hidden"}
      shadow={"lg"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      backgroundColor={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        w={"full"}
        h={48}
        objectFit={"cover"}
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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5} p={4}>
              <Input
                type="text"
                placeholder="Product Name"
                // value={newProduct.name}
                // onChange={(e) => handleChange(e)}
                // name="name"
              />
              <Input
                type="number"
                placeholder="Product Price"
                // value={newProduct.price}
                // onChange={(e) => handleChange(e)}
                // name="price"
              />
              <Input
                type="text"
                placeholder="Product Image Url"
                // value={newProduct.image}
                // onChange={(e) => handleChange(e)}
                // name="image"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
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
