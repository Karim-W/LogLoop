import React from "react";
import { Center, Text, Box, Input, VStack, Button, Square, Circle } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { loginUserbyEmail } from "../components/GraphQL/userModel";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";


export default function Login() {
    const [identifier, setidentifier] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();
    async function handleSubmit() {
        const data = await loginUserbyEmail(identifier, password);
        console.log(data);
        if (data.code === 200) {
            router.push("/Home");
        }
        console.log("Submitted");
    }
    return (
        <Center>
            <Box boxShadow="2xl" w="25rem" height="-moz-max-content" p="2rem 4rem" mt="16rem" bgGradient="linear(to-l, #ECEBE9, #F6F5F4)" borderRadius="20px" >
                <Text fontSize="2xl" textAlign="center" mb="3rem" color="black.500" isTruncated style={{ fontWeight: "bold" }}>Deary</Text>

                <form >
                    <VStack spacing={"1rem"}>
                        <Input value={identifier} type="email" onChange={(e) => setidentifier(e.target.value)} borderColor="gray.500" variant="outline" placeholder="E-mail" borderRadius="4px" />
                        <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)} borderColor="gray.500" variant="outline" placeholder="Password" borderRadius="4px" />
                        <Button onClick={async () => handleSubmit()} bg="whiteAlpha.600" variant="outline" marginTop="3rem" borderRadius="4px" >Login</Button>
                    </VStack>
                </form>
                <Center>
                    <Text mt="2rem" textAlign="center">Don't Have an Account Click <span style={{ color: "blue", textDecoration: "underline" }}><a>here</a></span> to be invited!</Text>
                </Center>
            </Box>
        </Center>
    );
}
