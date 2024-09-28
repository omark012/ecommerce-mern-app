import React, { useEffect } from "react";
import { Container, Text, SimpleGrid, Box, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useProductStore from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  return (
    <Container maxW={"1180px"} p={5} marginTop={10}>
      <VStack>
        <Text
          bgGradient="linear(to-r, cyan.400, blue.500)"
          textAlign={"center"}
          fontWeight="bold"
          textTransform={"uppercase"}
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
          marginY={10}
        >
          Current Products 🚀
        </Text>
        {products.length === 0 && (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No Products Found 😒
            <Link to={"/create"} color="blue">
              <Text
                as={"span"}
                _hover={{ textDecoration: "underline" }}
                color={"blue.500"}
              >
                {" "}
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
