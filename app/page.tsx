import Post from "@/components/Post";
import Spinner from "@/components/Spinner";
import { AxiosInstance } from "@/utils/axios";
import { PostProps } from "@/utils/types";
import { Suspense } from "react";


const fecthPosts = async () => {
  const response = await AxiosInstance.get("posts/")
  return response.data
}
export const revalidate = 300;
const HomePage = async () => {
  const posts = await fecthPosts()
  return (

    <section className="justify-between items-center grid grid-cols-3 mb-10 space-y-2">
      <Suspense fallback={<Spinner />}>
        {posts.map((post: PostProps) => (
          <Post key={post.id} {...post} />
        ))}
      </Suspense>
    </section>

  )
}

export default HomePage
