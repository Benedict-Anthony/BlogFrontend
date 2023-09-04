"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormProps } from "@/utils/types";
import { UserInstance } from "@/utils/axios";
import Spinner from "@/components/Spinner";
import Dropzone from "react-dropzone";
import Button from "@/components/Button";
import useSWR from "swr";
import { toast } from "react-toastify";

type EditProps = {
  params: {
    slug: string;
  };
};
const EditPage = ({ params }: EditProps) => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [postID, setPostID] = useState<Number | null>();
  const [currentCategoty, setCurrentCategory] = useState<string | null>();
  const [err, setError] = useState<string | null>();
  const submitPost = async (data: FormProps) => {
    const response = await UserInstance(
      "PUT",
      `posts/mutate/${postID}`,
      { ...data },
      "multipart/form-data"
    );
    if (response.status === 403) {
      setError(
        "You are not allowed to change the post. Contact the author instead"
      );
    }
    if (response.status) {
      router.push("/");
    }
  };

  const onSubmit = async (data: FormProps) => {
    toast.promise(submitPost(data), {
      pending: "Updating your post....",
      success: "Post updated",
      error: err ? err : "Error updating post",
    });
  };
  const { register, formState, handleSubmit } = useForm<FormProps>({
    defaultValues: async () => {
      const response = await UserInstance("GET", `posts/${params.slug}`);
      const post = response.data;
      setPostID(post.id);
      setCurrentCategory(post.category.name);

      return {
        title: post.title,
        content: post.content,
        category: post.category,
        slug: post.slug,
      };
    },
  });
  const { errors } = formState;
  const fetcher = async () => {
    const response = await UserInstance("GET", "posts/categories");
    return response.data;
  };

  const { data, error, isLoading } = useSWR("posts/categories", fetcher);

  return (
    <section className="w-full  flex justify-center items-center flex-col">
      <h2 className="text-left text-md">Make a new Post</h2>
      <form
        className="w-[20rem] mt-4 rounded-sm bg-blue-300 p-2 space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <label htmlFor="title" className="py-2 text-sm">
            Title
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("title", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          />
          <p className="text-red-400 text-sm text-left">
            {errors.title?.message}
          </p>
        </div>

        <div className="w-full">
          <label htmlFor="title" className="py-2 text-sm">
            Content
          </label>
          <textarea
            className="input input-bordered w-full h-[200px] max-w-xs resize-none"
            {...register("content", {
              required: {
                value: true,
                message: "This field is required",
              },
            })}
          ></textarea>
          <p className="text-red-400 text-sm text-left">
            {errors.content?.message}
          </p>
        </div>
        <div className="form-control w-full max-w-xs">
          {isLoading ? (
            <Spinner />
          ) : (
            <select
              {...register("category", {
                required: {
                  value: true,
                  message: "This field is required",
                },
              })}
              className="select select-bordered"
            >
              {data?.map((category: any) => (
                <option
                  key={parseInt(category.id)}
                  value={parseInt(category.id)}
                >
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />
              <input {...getInputProps()} />
            </div>
          )}
        </Dropzone>
        <div className="mt-2">
          <Button type="submit" title="Update Post" />
        </div>
      </form>
    </section>
  );
};

export default EditPage;
