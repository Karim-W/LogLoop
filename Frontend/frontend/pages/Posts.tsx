import React from 'react';
import { GetPostById, GetPostsIds } from '../components/ApiUtls/posts';
import { useRouter } from 'next/router';
import { Flex, Center, Box, Heading, Text } from '@chakra-ui/layout';
import { Avatar, AvatarBadge } from '@chakra-ui/avatar';
export default function PostId() {
    const router = useRouter();
    const [Post, setPost] = React.useState<any>();
    const fetchPost = async () => {
        const post = await GetPostById(router.query.id as string);
        setPost(post);
    }
    React.useEffect(() => {
        fetchPost();
    }, [])
    function getDate(date: string) {
        let d = new Date(date);
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    }
    //function to get the time difrence
    function getTime(date: string) {
        let d = new Date(date);
        let now = new Date();
        let diff = now.getTime() - d.getTime();
        let diffDays = Math.floor(diff / (1000 * 3600 * 24));
        let diffHours = Math.floor(diff / (1000 * 3600));
        let diffMinutes = Math.floor(diff / (1000 * 60));
        let diffSeconds = Math.floor(diff / (1000));
        if (diffDays > 0) {
            return diffDays + " days ago";
        }
        else if (diffHours > 0) {
            return diffHours + " hours ago";
        }
        else if (diffMinutes > 0) {
            return diffMinutes + " minutes ago";
        }
        else {
            return diffSeconds + " seconds ago";
        }
    }
    return (

        <><Flex flexDirection="column" p="2rem 2rem">
            <Box >
                <Flex>
                    <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" >
                        <AvatarBadge borderColor="papayawhip" bg="green" boxSize="1.22rem" />
                    </Avatar>
                    <Box ml="2rem" flexDirection="column">
                        <Heading size="lg">{Post?.title}</Heading>
                        <Text color="gray.500">by me</Text>
                        <Text fontSize="sm" color="gray.500">{getTime(Post?.createdAt)}</Text>
                    </Box>
                </Flex>
            </Box>
            <Box mt="1rem" >
                <Text>{Post?.content}</Text>
            </Box>
            {/* <Text textAlign="end" fontSize="sm" ml="6rem" color="gray.500">Created At: {getDate(Post?.createdAt)}</Text>
            <Text textAlign="end" fontSize="sm" ml="6rem" color="gray.500">Updated At: {getDate(Post?.updatedAt)}</Text> */}
            <Flex justifyContent="space-evenly">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="black" fill="currentColor" className="bi bi-reply" viewBox="0 0 16 16">
                    <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>

            </Flex>
        </Flex>
            <Box height="1px" width="100%" bg="gray.200" />
        </>

    );
}

// export async function getServerSideProps(context: any) {
//     // console.log(context.params.id);
//     console.log("inHere")
//     const res = await GetPostById(context.params.id);
//     console.log(res);

//     //console.log(res.data);
//     if (!res) {
//         return {
//             notFound: true,
//         }
//     }
//     return {
//         props: {
//             post: res
//         }, // will be passed to the page component as props
//     }
// }


// export async function getStaticPaths() {


//     // Get the paths we want to pre-render based on posts
//     const posts = await GetPostsIds();
//     console.log(posts);
//     debugger;
//     const paths = posts.map((post: any) => ({
//         params: { id: post.id },
//     }))

//     //     // We'll pre-render only these paths at build time.
//     //     // { fallback: blocking } will server-render pages
//     //     // on-demand if the path doesn't exist.
//     return { paths, fallback: 'blocking' }
// }

// export function getServerSideProps(ctx: any) {
//     console.log(ctx.params.id);
//     return {
//         props: {
//             id: ctx.params.id
//         }
//     }
// }
