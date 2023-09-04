export type PostProps = {
  id: string;
  title: string;
  image_url: string;
  excerpt: string;
  slug: string;
  category: {
    name: string;
  };
};
export type FormProps = {
  id?: number;
  title: string;
  content: string;
  category: number;
  slug: string;
};
export type UserProps = {
  email: string;
  author: string;
  is_publisher: string;
};

export type PostDetailProps = {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: { name: string };
  image_url: string;
  created_at: string;
  slug: string;
  comments: {
    name: string;
    content: string;
  }[];
};
