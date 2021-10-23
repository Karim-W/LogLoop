import axios from "axios";
export async function getMyPosts(): Promise<any> {
  var data = JSON.stringify({
    token:
      "YKqcoxV3Ce17uM6VdoKMA1NYef4FJ+IPJnbwL+NretQi6JLBzlTd4ocj2pJDmV2y6G+r4C+7HLM0vwBeQfnEhOX7LP9Vrq+tw9LL0Wm50sAPiJwW9iDr4hS4L1zndpKDutLcBk30woI4U658LzEQAEnO7BTq1kXABz/9YqYIA+cQldc0USnP5q8fPsxCUMXIqTNdcN4Bt5RecHLm7GZ9LJo7MFCYQJVTNDL7fOWkdhtSBaEC4E5480UOI8niJ7ZdJTWeqAjrdKbXwP7TOl+16jNit1oZ4tTECgdr2PQSDVaKUYwMQ9l87CqkcLi7Ea9tkzpGKa1YRxmZUzhsBtWemGWFiCiqcsEqrbnAUWSQOI0eUjhVcK0N8sTQ16zlbr/QMer8j/eX1GTXfxOHAGUfvRY8vt65teX2kNp4NTG2sVU2dJ/2q5F18F/1jKtOEM6y1TQ3BiOyDVh3ei0e1vNetJQlQe8uqKsunZnTNPUHbvsnyg2T8nkZ08aH4p5rs7NENmp7WpvssnKpjWBZudfdB2t8xHRIr2TYTK233jF1/hwWS8e6C7W7gt6YMvaW81LToLCuyacxCVEc04UzSlNy6qjIr4FFnHBtH/ZITnVa7imyaSAZTND/3LfeW3w79JJXndvb5E9l6YbJR4LbKxaFrZhQchfoGe+dHgJgQjKEQVNS8HfbKG85ksy5U6cNQ0d95jMDjwG3MWMWMI3Wel93sP8j07j/i8ziBNLhX3wpMvXyDwl/Y6GQ3r2AYGAUprJi9hoKFSvnjSm9bNXk9D2vMxiado73omPMBJbYk5pYGy1MCpMwW8RBHWjmRc2UvkivI4G6TP93bV4p9QNJDegPFhuln6N/hiC1c29FOMMOpw2mGLdjj4vVIOgIywszHx7KOLHotl0PONS9Y4XV604EOWqmwecimlBYwRBt8B+W5BX8iQshnJriDHYwKc9KEU62",
  });

  var config = {
    method: "post",
    url: "https://localhost:5001/api/MyPosts",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  } as any;

  const res = await axios(config);
  return res.data;
}

export async function DeletePost(id: string): Promise<any> {
  var config = {
    method: "delete",
    url: `https://localhost:5001/api/Post/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("AccessToken"),
    },
  } as any;

  const res = await axios(config);
  return res.data;
}

export async function getMyPostsPageNumber(): Promise<any> {
  var config = {
    method: "GET",
    url: "https://localhost:5001/api/MyPosts/Pages",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("AccessToken"),
    },
  } as any;
  const res = await axios(config);
  return res.data;
}

export async function AddMyPosts(tit: string, cont: string): Promise<any> {
  var data = JSON.stringify({
    title: tit,
    content: cont,
  });
  var config = {
    method: "POST",
    url: "https://localhost:5001/api/AddMyPosts",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("AccessToken"),
    },
    data: data,
  } as any;
  const res = await axios(config);
  return res.data;
}

export async function GetPostById(id: string): Promise<any> {
  const options = {
    method: "GET",
    url: `https://localhost:5001/api/Post/${id}`,
  } as any;

  const res = axios.request(options);
  return res;
}
export async function GetPostsIds(): Promise<any> {
  const options = {
    method: "GET",
    url: `/api/Posts`,
  } as any;

  const res = axios.request(options);
  return res;
}
