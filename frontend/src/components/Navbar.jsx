import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import {
  Container,
  Flex,
  HStack,
  Text,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdAddCircleOutline } from "react-icons/md";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} p={"8px"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} h={"40px"}>
        <Text
          bgGradient="linear(to-r, cyan.400, blue.500)"
          textAlign={"center"}
          fontWeight="bold"
          textTransform={"uppercase"}
          bgClip="text"
          fontSize={{ base: "22", sm: "28" }}
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>
        <HStack>
          <Link to="/create">
            <Button fontSize={"25px"}>
              <MdAddCircleOutline />
            </Button>
          </Link>
          <Button onClick={toggleColorMode} fontSize={"25px"}>
            {colorMode === "light" ? (
              <FaMoon color="grey" />
            ) : (
              <FaSun color="orange" />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
