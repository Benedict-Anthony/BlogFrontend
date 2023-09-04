"use client";
import React, { useState } from "react";
import { UserInstance } from "@/utils/axios";
import { PostProps } from "@/utils/types";
import AdminPost from "@/components/AdminPost";
import useSWR from "swr";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const [modal, setModal] = useState({
    title: "",
    message: "",
    show: false,
  });
  const fecthUser = async () => {
    const response = await UserInstance("GET", "users/create");
    return response.data;
  };
  const fecthPost = async () => {
    const response = await UserInstance("GET", "posts/mutate");
    return response.data;
  };

  const {
    data: author,
    error: noUser,
    isLoading: finding,
  } = useSWR("users/create", fecthUser);
  const { data, error, isLoading } = useSWR("posts/mutate", fecthPost);

  const handlePublish = async (slug: string) => {
    setModal({
      title: "Publishing",
      message:
        "Post have been published, please note this may take a while to reflect on the website",
      show: true,
    });
    const response = await UserInstance(
      "PATCH",
      `posts/mutate/${slug}`,
      {
        status: "published",
      },
      "multipart/form-data"
    );
    console.log(response.data);
  };

  const handleDelete = async (slug: string) => {
    setModal({
      title: "Deleting",
      message:
        "Post have been Deleted, please note this may take a while to reflect on the website",
      show: true,
    });
    const response = await UserInstance(
      "DELETE",
      `posts/mutate/${slug}`,
      {},
      "multipart/form-data"
    );
    console.log(response.data);
  };

  if (isLoading || finding) return <Loading />;
  if (error || noUser)
    return <Modal title="Error" message="Something went wrong!" />;
  return (
    <>
      {modal.show && (
        <Modal
          title={modal.title}
          message={modal.message}
          onClick={() => setModal({ ...modal, show: false })}
        />
      )}
      <section className="grid grid-cols-3 gap-2">
        <Suspense fallback={<Loading />}>
          {data.length > 0 ? (
            data.map((post: PostProps & { status: "draft" | "published" }) => (
              <AdminPost
                key={post.id}
                {...post}
                publisher={author.is_publisher}
                status={post.status}
                onDelete={() => handleDelete(post.id)}
                onPublish={() => handlePublish(post.slug)}
              />
            ))
          ) : (
            <Loading />
          )}
        </Suspense>
      </section>
    </>
  );
};

export default AdminPage;
