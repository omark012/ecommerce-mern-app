import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useProductStore from "../store/product";

const CreatePage = () => {
  const toast = useToast();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: null,
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const { createProduct } = useProductStore();
  const handleForm = async () => {
    // in response we received {success, message}
    const response = await createProduct(newProduct);
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
        title: "Product created.",
        description: "We've created your product for you.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }

    // Reste our local state newProduct
    setNewProduct({
      name: "",
      price: null,
      image: "",
    });
  };

  const placeholderColor = useColorModeValue("", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Container maxW={"container.sm"} marginTop={20}>
      <VStack spacing={8}>
        <Heading mb={7}>Create a Product</Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
          borderWidth={1} // Add border width
          borderColor={borderColor} // Set border color
          borderStyle="solid" // Set border style
        >
          <VStack spacing={5}>
            <Input
              type="text"
              placeholder="Product Name"
              _placeholder={{ color: placeholderColor }}
              value={newProduct.name}
              onChange={(e) => handleChange(e)}
              name="name"
            />
            <Input
              type="number"
              placeholder="Product Price"
              _placeholder={{ color: placeholderColor }}
              value={newProduct.price}
              onChange={(e) => handleChange(e)}
              name="price"
            />
            <Input
              type="text"
              placeholder="Product Image Url"
              _placeholder={{ color: placeholderColor }}
              value={newProduct.image}
              onChange={(e) => handleChange(e)}
              name="image"
            />

            <Button bg={"blue.200"} w={"full"} onClick={handleForm}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
