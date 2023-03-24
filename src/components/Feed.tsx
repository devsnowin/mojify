import { api } from "~/utils/api";
import Spinner from "./Spinner";
import TweetView from "./TweetView";

const Feed = () => {
  const { data: posts, isLoading: postLoading } = api.posts.getAll.useQuery();

  if (postLoading) return <Spinner />;
  if (!posts) return <p>Something went wrong</p>;
  if (posts.length <= 0) return <p>No posts :(</p>;

  return (
    <ul className="flex w-full flex-col gap-4">
      {posts?.map(({ post, author }) => (
        <TweetView key={post.id} post={post} author={author} />
      ))}
    </ul>
  );
};
export default Feed;
