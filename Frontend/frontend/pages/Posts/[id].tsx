import React from 'react';
import { GetPostById, GetPostsIds } from '../../components/ApiUtls/posts';

export default function PostId() {
    return (
        <>

        </>
    );
}

export async function getServerSideProps(context: any) {
    // console.log(context.params.id);
    console.log("inHere")
    const res = await fetch(`https://localhost:5001/api/Post/${context.params.id}`);
    console.log(res);

    //console.log(res.data);
    if (!res) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            post: res.data,
        }, // will be passed to the page component as props
    }
}


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
