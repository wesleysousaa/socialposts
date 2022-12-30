import { FetchPosts } from "./FetchPosts";

export async function GetPost(postId){
    let data = await FetchPosts()

    const post = data.filter(post => post.id === postId)
    return post[0]
}