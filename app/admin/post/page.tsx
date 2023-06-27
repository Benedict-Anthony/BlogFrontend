"use client"
import Button from '@/components/Button'
import React from 'react'
import { useForm } from "react-hook-form"
import { UserInstance } from '@/utils/axios'
import { useRouter } from 'next/navigation'
import Dropzone from 'react-dropzone'
import { useState } from "react"
import useSWR from "swr"
import { toast } from 'react-toastify'
import Spinner from '@/components/Spinner'
import { FormProps } from '@/utils/types'



const NewPostPage = () => {
    const fetcher = async () => {
        const response = await UserInstance("GET", "posts/categories")
        return response.data
    }


    const { data, error, isLoading } = useSWR("posts/categories", fetcher)
    const router = useRouter()
    const [file, setFile] = useState<any>()
    const { register, handleSubmit, formState } = useForm<FormProps>()
    const { errors } = formState

    const SubmitPost = async (data: FormProps) => {
        console.log(data, file)
        const response = await UserInstance("POST", "posts/mutate", { ...data, image: file }, "multipart/form-data")
        console.log(response)
        if (response.status === 201) {
            router.push("/")
        } else {
            alert("User with the email already exists")
            return;
        }
    }
    const onSubmit = async (data: FormProps) => {
        toast.promise(
            SubmitPost(data),
            {
                pending: "Posting...",
                success: "Posted",
                error: "Error posting"
            }
        )
    }
    return (
        <section className="w-full h-[30rem] flex justify-center items-center flex-col">
            <h2 className="text-left text-md">Make a new Post</h2>
            <form className="w-[20rem] bg-blue-300 p-2 space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <label htmlFor="title" className='py-2 text-sm'>Title</label>
                    <input type="text" className="input input-bordered w-full max-w-xs" {...register("title", {
                        required: {
                            value: true,
                            message: "This field is required"
                        }
                    })} />
                    <p className="text-red-400 text-sm text-left">{errors.title?.message}</p>
                </div>

                <div className="w-full">
                    <label htmlFor="title" className='py-2 text-sm'>Content</label>
                    <textarea className="input input-bordered w-full max-w-xs" {...register("content", {
                        required: {
                            value: true,
                            message: "This field is required"
                        }
                    })} ></textarea>
                    <p className="text-red-400 text-sm text-left">{errors.content?.message}</p>

                </div>
                <div className="form-control w-full max-w-xs">

                    {isLoading ? <Spinner /> : <select {...register("category", {
                        required: {
                            value: true,
                            message: "This field is required"
                        }
                    })} className="select select-bordered">
                        {data?.map((category: any) => (
                            <option key={parseInt(category.id)} value={parseInt(category.id)}>{category.name}</option>
                        ))}
                    </select>}

                </div>
                <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                            <input {...getInputProps()} />
                        </div>
                    )}
                </Dropzone>
                <div className="mt-2">

                    <Button type="submit" title="Post" />
                </div>
            </form>
        </section>
    )
}

export default NewPostPage
