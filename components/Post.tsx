import React from 'react'
import Image from 'next/image'
import Link from "next/link"
import { PostProps } from '@/utils/types'


const Post = ({ title, image_url, excerpt, slug, category }: PostProps) => {
    return (
        <Link href={`/detail/${slug}`}>
            <article className="shadow-md mx-3 rounded-md card bg-base-100 ">
                <div className="card-image">
                    <figure className="image h-[10rem]">
                        <Image src={image_url} alt="" width={100} height={100} className="w-full h-full" />
                    </figure>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <div className="badge badge-info">{category.name}</div>
                    <p className="text-md leading-7 text-gray-700">{excerpt}</p>
                </div>

            </article>
        </Link>
    )
}

export default Post
