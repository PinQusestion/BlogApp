import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/configAp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false)

  const submit = async (data) => {
    setLoading(true)
    if (post) {
      const file = data.image[0]
        ? appwriteService.uploadFile(data.image[0])
        : appwriteService.uploadFile(post.featuredImg);

      if (file) {
        appwriteService.deleteFile(post.image);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImg,
      });

      if (dbPost) {
        setLoading(false)
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImg = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-gA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  const renderImagePreview = (featuredImg) => {
    try {
      if (featuredImg) {
        const previewUrl = appwriteService.getFilePreview(featuredImg).href;
        return <img src={previewUrl} alt="Featured" className="rounded-lg" />;
      }
    } catch (error) {
      console.error("Error loading featured image:", featuredImg);
    }
    return (
      <div className="w-full h-40 bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-sm">
        No Image Available
      </div>
    );
  };

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return !loading ? (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap text-white">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content (Max 255 words) :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post?.featuredImg && (
          <div className="w-full mb-4">
            {renderImagePreview(post.featuredImg)}
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  ): (
    <div className="w-full h-min-screen flex justify-center items-center">
      <div className="loader_2"></div>
    </div>
  );
}

export default PostForm;
