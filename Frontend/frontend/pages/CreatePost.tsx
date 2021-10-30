import React from 'react'
import { Flex, Text, Button, Input, Textarea, Center } from '@chakra-ui/react'
import { AddMyPosts } from "../components/ApiUtls/posts"
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function CreatePost() {
    const [title, setTitle] = React.useState("")
    const [content, setContent] = React.useState("")
    const router = useRouter()

    async function handleSubmit(e: any) {
        e.preventDefault()
        await AddMyPosts(title, content)
        router.push('/Home')
    }

    return (
        <form onSubmit={async (e) => { await handleSubmit(e) }}>
            <Center><Flex p="2rem" flexDirection="column" width="80%">
                <Flex flexDirection="column" >
                    <Text fontWeight="bold">Title</Text>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} required={true} type="text" placeholder="Title" />
                    <Text mt="1rem" fontWeight="bold">Content</Text>
                    <Textarea value={content} onChange={(e) => setContent(e.target.value)} required={true} placeholder="Content" />
                </Flex>
                <Center p="2rem" >
                    <Link href="/Home">
                        <Button bg="purple.50" ml="2rem" type="button">
                            cancel
                        </Button>
                    </Link>
                    <Button bg="purple.300" colorScheme="blue" ml="2rem" type="submit">
                        log
                    </Button>
                </Center></Flex></Center>
        </form>
    )
}
