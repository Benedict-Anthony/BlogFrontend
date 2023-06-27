"use client"
import Button from '@/components/Button'
import React from 'react'
import { useForm } from "react-hook-form"
import { AxiosInstance } from '@/utils/axios'
import { useRouter } from 'next/navigation'

type FormProps = {
    first_name: string
    last_name: string
    email: string
    password: string
    is_publisher: boolean
}

const SignUpPage = () => {
    const router = useRouter()
    const { register, handleSubmit, formState } = useForm<FormProps>()
    const { errors } = formState
    const onSubmit = async (data: FormProps) => {
        const response = await AxiosInstance.post("users/create/", {
            ...data
        })
        if (response.status === 201) {
            router.push("/login")
        } else {
            alert("User with the email already exists")
            return;
        }
    }
    return (
        <section className="w-full h-[30rem] flex justify-center items-center flex-col">
            <h2 className="text-left text-md">Sign up for an account</h2>
            <form className="w-[20rem] bg-blue-300 p-2 space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <label htmlFor="first_name" className='py-2 text-sm'>First Name</label>
                    <input type="text" className="input input-bordered w-full max-w-xs" {...register("first_name", {
                        required: {
                            value: true,
                            message: "This field is required"
                        }
                    })} />
                    <p className="text-red-400 text-sm text-left">{errors.first_name?.message}</p>
                </div>
                <div className="w-full">
                    <label htmlFor="first_name" className='py-2 text-sm'>Last Name</label>
                    <input type="text" className="input input-bordered w-full max-w-xs" {...register("last_name", {
                        required: {
                            value: true,
                            message: "This field is required"
                        }
                    })} />
                    <p className="text-red-400 text-sm text-left">{errors.last_name?.message}</p>
                </div>
                <div className="w-full">
                    <label htmlFor="first_name" className='py-2 text-sm'>Email</label>
                    <input type="email" className="input input-bordered w-full max-w-xs" {...register("email", {
                        required: {
                            value: true,
                            message: "This field is required"
                        }
                    })} />
                    <p className="text-red-400 text-sm text-left">{errors.email?.message}</p>

                </div>
                <div className="w-full">
                    <label htmlFor="first_name" className='py-2 text-sm'>Password</label>
                    <input type="password" className="input input-bordered w-full max-w-xs" {...register("password", {
                        required: {
                            value: true,
                            message: "This field is required"
                        },

                        validate: {
                            commonPassword: (value) => {
                                return value !== "1234" || "password is too common"
                            },
                            shortPassword: (value) => {
                                if (value.length <= 4) {
                                    return "password is too short"
                                }
                                return;
                            }
                        }
                    })} />
                    <p className="text-red-400 text-sm text-left">{errors.password?.message}</p>

                </div>
                <div className="form-control">
                    <label className="cursor-pointer label">
                        <span className="label-text">Pusblisher</span>
                        <input type="checkbox" {...register("is_publisher")} className="checkbox checkbox-info" />
                    </label>
                </div>
                <div className="mt-2">

                    <Button type="submit" title="Sign Up" />
                </div>
            </form>
        </section>
    )
}

export default SignUpPage
