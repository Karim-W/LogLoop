import React from "react";
import { user } from "./GraphQL/classes/user";
import { Box, Center, Flex, Spacer, StackDivider, VStack } from "@chakra-ui/layout";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
    Avatar, AvatarBadge, Text, Heading, Drawer, Input, Button,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from "@chakra-ui/react"


// interface NavBarProps {
//     userData: "resr"
// }

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}

            >
                <DrawerOverlay />
                <DrawerContent bg="gray.50">
                    <DrawerCloseButton />
                    <DrawerHeader>Log Loop</DrawerHeader>

                    <DrawerBody>
                        <Box p="2rem" borderRadius="2xl" boxShadow="2xl" mt="2rem" mb="9rem">
                            <Center flexDirection="column" gap="1rem">
                                <Avatar size="xl" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" >
                                    <AvatarBadge borderColor="purple.50" bg="green" boxSize="2.5rem" />
                                </Avatar>
                                <Text mt="1rem" fontSize="2xl" >Karim Hassan</Text>
                            </Center>
                        </Box>
                        <VStack
                            textAlign="left"
                            divider={<StackDivider color="gray.300" />}
                            spacing={4}>
                            <Text>Profile Settings</Text>
                            <Text>Bio</Text>
                            <Text>About</Text>

                        </VStack>
                    </DrawerBody>

                    <DrawerFooter>
                        © 2021 LogLoop.com. All rights reserved.
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Box bg="purple.50" p={"1rem 2rem"}>
                <Flex justify="space-between" alignItems="center">
                    <Button bg="transparent" onClick={onOpen}>
                        <HamburgerIcon w={6} h={6} />
                    </Button>
                    <Heading as="h4" size="lg" fontWeight="bold">Home</Heading>
                    <Flex row alignItems="center">
                        <Text size="1xl">Hi Karim</Text>
                        <Spacer w={4} />
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" >
                            <AvatarBadge borderColor="papayawhip" bg="green" boxSize="1.1rem" />
                        </Avatar>
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}