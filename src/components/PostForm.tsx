import { useUser } from "@clerk/nextjs";
import { useState, type FormEvent } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const PostForm = () => {
  const [emoji, setEmoji] = useState<string>("");
  const { user, isSignedIn } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      void (async () => {
        await ctx.posts.getAll.invalidate();
        toast.success("Tweeted!!");
        setEmoji("");
      })();
    },
    onError: (e) => {
      const errorMsg = e.data?.zodError?.fieldErrors.content;
      if (errorMsg && errorMsg[0]) toast.error(errorMsg[0]);
      else toast.error("Failed to post! please try again later.");
    },
  });

  if (!isSignedIn) return <p>Please sign in to post your tweet!</p>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (emoji === "") return toast.error("Emoji cannot be empty");
    mutate({ content: emoji });
  };

  return (
    <form
      className="relative flex w-full flex-col gap-4 justify-self-start"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">Welcome, {user?.fullName}</h1>
      <input
        type="text"
        name="emoji"
        value={emoji}
        disabled={isPosting}
        autoComplete="off"
        onChange={(e) => setEmoji(e.target.value)}
        placeholder={`${isPosting ? "Posting..." : "Type some emojis..."}`}
        className="w-full appearance-none border-b-2 border-gray-500 bg-transparent p-2 outline-none transition-all ease-in-out"
      />
      <button type="submit" className="absolute bottom-2 right-0">
        Post
      </button>
    </form>
  );
};
export default PostForm;
