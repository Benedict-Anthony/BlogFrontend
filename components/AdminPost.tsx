import { PostProps } from "@/utils/types";
import React from "react";
import Button from "./Button";
import Link from "next/link";

type AdminPostProps = {
  publisher: boolean;
  status: "published" | "draft";
  slug: string;
  onPublish: () => void;
  onDelete: () => void;
};

const AdminPost = ({
  title,
  excerpt,
  publisher,
  status,
  slug,
  onDelete,
  onPublish,
}: PostProps & AdminPostProps) => {
  return (
    <div className="card  bg-gray-600 text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{excerpt}</p>
        <div className="card-actions justify-between">
          <Link href={`/detail/${slug}`} className="btn btn-sm btn-success">
            View
          </Link>
          <Link href={`/admin/edit/${slug}`} className="btn btn-sm btn-warning">
            Edit
          </Link>
          {publisher && status === "draft" && (
            <Button
              type="button"
              title="Publish"
              color="success"
              onClick={onPublish}
            />
          )}
          <Button type="button" title="Del" color="error" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default AdminPost;
