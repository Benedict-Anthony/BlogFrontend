import React, { FormEvent } from 'react'
import { AxiosInstance } from '@/utils/axios'
import { PostDetailProps } from '@/utils/types'
import Image from "next/image"
import Button from '@/components/Button'
// import { useForm } from "react-hook-form"


type DetailProps = {
    params: {
        slug: string
    }
}

const getPost = async (slug: string) => {
    const response = await AxiosInstance.get(`posts/${slug}/`)
    return response.data

}
const DetailPage = async ({ params }: DetailProps) => {
    const post: PostDetailProps = await getPost(params.slug)

    return (
        <section>
            <main>

                <div className="w-[20rem] mb-3">
                    <Image src={post.image_url} alt={post.title} width={100} height={100} className="w-full" />
                </div>
                <div className="space-y-2">
                    <button className="bg-blue-300 px-2 py-1 rounded-md text-md border-">{post.category.name}</button>
                    <h2 className="text-sm py-2">By {post.author}</h2>
                    <p className="text-md"> {post.content} </p>
                </div>
            </main>

            <div className="mt-5 border-t-2 border-t-blue-300 bg-gray-200">
                {post.comments.length > 0 && <h3 className="text-md">Comments</h3>}

                {post.comments.map((comment, index) => (
                    <div key={index + 1} className=' drop-shadow rounded-md shadow-md py-2 px-3 '>
                        <h4 className="text-sm">{comment.name}</h4>
                        <p className="text-sm leading-5">{comment.content}</p>
                    </div>
                ))}
            </div>


        </section>
    )
}

export default DetailPage
