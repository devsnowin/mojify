import { useUser } from "@clerk/nextjs";
import { type FormEvent } from "react";
import { api } from "~/utils/api";

const PostForm = () => {
  const { user, isSignedIn } = useUser();
  if (!isSignedIn) return <p>Please sign in to post your tweet!</p>;

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      void ctx.posts.getAll.invalidate();
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const form = new FormData(formElement);
    const formData = Object.fromEntries(form);
    mutate({ content: (formData["emoji"] as string) || "😑" });
    formElement.reset();
  };

  return (
    <form
      className="flex w-full flex-col gap-4 justify-self-start"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">Welcome, {user?.fullName}</h1>
      <input
        type="text"
        name="emoji"
        placeholder="Type some emojis..."
        disabled={isPosting}
        className="w-full appearance-none border-b-2 border-gray-500 bg-transparent outline-none transition-all ease-in-out"
      />
    </form>
  );
};
export default PostForm;
