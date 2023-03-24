import { useUser } from "@clerk/nextjs";

const PostForm = () => {
  const session = useUser();

  console.log("userID: ", session.user?.id);

  return (
    <form className="flex w-full flex-col gap-4 justify-self-start">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.fullName}</h1>
      <input
        type="text"
        placeholder="Type some emojis..."
        className="w-full appearance-none border-b-2 border-gray-500 bg-transparent outline-none transition-all ease-in-out"
      />
    </form>
  );
};
export default PostForm;
