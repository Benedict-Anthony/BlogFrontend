# Setting Up a Next.js Frontend Application with Django Backend

This README provides a step-by-step guide to clone and set up a Next.js frontend application that connects to a Django backend server. This setup allows you to build a web application using Next.js for the frontend and Django for the backend.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- **Node.js:**
- **npm (Node Package Manager):**
- **Git:**

## Clone the Repository

```bash

# install the dependences
npm install

# run the dev server
npm run dev
```

Navigate to [localhost:3000](http://localhost:3000/)

# User Roles and Permissions

In this application, users have different roles and permissions:

## User

Regular users have the following permissions:

- View only published blog posts.

## Author

Authors have the following abilities:

- Create new blog posts.
- Edit and update their own posts.
- Delete their own posts.

## Publisher

Publishers have the highest privileges and can perform the following actions:

- Publish or unpublish any blog post, even those created by authors.
- Edit or delete any blog post.
- Manage user roles, including promoting users to authors or publishers.

# Blog Post Management

Implement the following functionalities based on user roles:

## User

Regular users have the following blog post management permissions:

- View published posts.

## Author

Authors have the following blog post management abilities:

- Create new blog posts.
- Edit and update their own posts.
- Delete their own posts.

## Publisher

Publishers have extensive control over blog post management:

- Publish or unpublish any blog post, including those created by authors.

Happy hacking!!!
