import React from "react";
import { Stack, Text, Flex, Center, VStack, StackDivider, Box, SimpleGrid } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";
import AddNewPost from "../components/AddNewPost";
import { getMyPosts, getMyPostsPageNumber } from "../components/ApiUtls/posts"
import axios from "axios"
import { json } from "stream/consumers";
import Paginator from "../components/Paginator";
class postsModel {
    title!: string
    content!: string
    id!: string
    createdAt!: string
    updatedAt!: string
}
import PostComponent from "../components/postComponent";
export default function Home() {
    const [postList, setPostList] = React.useState<postsModel[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [pageNumber, setPageNumber] = React.useState(1)
    const [totalPages, setTotalPages] = React.useState(1)
    const [listMode, setListMode] = React.useState(true)
    const [postWidth, setPostWidth] = React.useState("60%")
    const getTotalPages = async () => {
        const res = await getMyPostsPageNumber()
        setTotalPages(res)
    }
    const loadInPosts = async () => {
        const temp = await getMyPosts() as postsModel[]
        setPostList(temp)
    };
    React.useEffect(() => {
        console.log("use effect")
        loadInPosts()
        getTotalPages()
    }, []);
    function invertListOptions() {
        setListMode(!listMode)
        if (!listMode) {
            setPostWidth("60%")
        } else {
            setPostWidth("100%%")
        }
    }

    if (listMode) {


        return (
            <Flex direction="column">
                <Flex direction="row" justify="space-between" m="1rem" alignItems="center">
                    <Stack direction="row" spacing={4} ml="2rem">
                        <svg onClick={invertListOptions} xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16" style={{ color: listMode ? "black" : "#ab66f7" }}>
                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                        </svg>
                        <svg onClick={invertListOptions} xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" style={{ color: listMode ? "#ab66f7" : "black" }}>
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </Stack>
                    <Stack direction="row" mr="1rem" spacing={4}>
                        <AddNewPost relaoder={loadInPosts} />
                    </Stack>

                </Flex>


                <Flex flexDirection="column" m="2rem 0 4rem" pb="4rem">{postList !== [] ? postList.map((p, idx) => {
                    return <Center m="1rem"><PostComponent reloader={loadInPosts} key={idx} post={p} width={postWidth} /></Center>
                }) : <Text>No Posts</Text>}</Flex>
                <Paginator pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber} />
            </Flex>
        );
    } else {
        return (
            <Flex direction="column">
                <Flex direction="row" justify="space-between" m="1rem" alignItems="center">
                    <Stack direction="row" spacing={4} ml="2rem">
                        <svg onClick={invertListOptions} xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16" style={{ color: listMode ? "black" : "#ab66f7" }}>
                            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                        </svg>
                        <svg onClick={invertListOptions} xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" style={{ color: listMode ? "#ab66f7" : "black" }}>
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </Stack>
                    <Stack direction="row" mr="1rem" spacing={4}>
                        <AddNewPost relaoder={loadInPosts} />
                    </Stack>

                </Flex>

                <Center>
                    <SimpleGrid columns={4} spacing={"2rem"} m="2rem" >
                        {postList !== [] ? postList.map((p, idx) => {
                            return (<PostComponent reloader={loadInPosts} key={idx} post={p} width={postWidth} />)
                        }) : <Text>No Posts</Text>}
                    </SimpleGrid></Center>
                <Paginator pageNumber={pageNumber} totalPages={totalPages} setPageNumber={setPageNumber} />
            </Flex>
        )
    }
}

export async function getStaticProps(params: any) {
    return {
        props: {
            posts: null
        }
    };
}