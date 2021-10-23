import React from 'react'
import {
    Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody, Box, Text, Input, Textarea,
    ModalCloseButton, useDisclosure,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons";
import { AddMyPosts } from "../components/ApiUtls/posts"
interface AddNewPostProps {
    relaoder: any
}

export default function AddNewPost(props: AddNewPostProps) {

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
                    <ModalHeader>Log New Post</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={async (e) => await handleSubmit(e)}>
                        <ModalBody>
                            <Text fontWeight="bold">Title</Text>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} required={true} type="text" placeholder="Title" />
                            <Text fontWeight="bold">Content</Text>
                            <Textarea value={content} onChange={(e) => setContent(e.target.value)} required={true} placeholder="Content" />
                        </ModalBody>
                        <ModalFooter p="2rem">
                            <Button onClick={onClose} type="button" variant="ghost">nvm</Button>
                            <Button colorScheme="blue" ml="2rem" type="submit">
                                log
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}
