import React from 'react'
import {
    Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody, Box, Text, Input, Textarea,
    ModalCloseButton, useDisclosure, Flex, Heading
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons";
import { AddMyPosts } from "../components/ApiUtls/posts"
import { Router, useRouter } from "next/router"
interface AddNewPostProps {
    relaoder: any
}

export default function AddNewPost(props: AddNewPostProps) {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef()
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")

    async function handleSubmit(e: any) {
        e.preventDefault()
        await AddMyPosts(title, content)
        await props.relaoder()
        onClose()
    }
    return (
        <>
            <Button bg="purple.200" mt={4} onClick={onOpen}>
                <AddIcon mr="1rem" /> Log Post
            </Button>
            <Modal finalFocusRef={finalRef as any} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex>
                            <Heading size="lg">
                                Log New Post
                            </Heading>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={async (e) => await handleSubmit(e)}>
                        <ModalBody>
                            <Text fontWeight="bold">Title</Text>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} required={true} type="text" placeholder="Title" />
                            <Text mt="1rem" fontWeight="bold">Content</Text>
                            <Textarea value={content} onChange={(e) => setContent(e.target.value)} required={true} placeholder="Content" />
                        </ModalBody>
                        <ModalFooter p="2rem">
                            <Button onClick={() => { router.push("/CreatePost") }} bg="purple.50" ml="2rem" type="button">
                                expand
                            </Button>
                            <Button bg="purple.300" colorScheme="blue" ml="2rem" type="submit">
                                log
                            </Button>
                            {/* <Button onClick={onClose} ml="2rem" type="button" variant="ghost">nvm</Button> */}
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
