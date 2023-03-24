import type { GetStaticPaths, GetStaticProps } from "next";

import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/utils/helper";

import Spinner from "~/components/Spinner";
import TweetView from "~/components/TweetView";

const PostPage = (props: { id: string }) => {
  const { data, isLoading } = api.posts.getById.useQuery({
    id: props.id,
  });

  if (isLoading) return <Spinner />;
  if (!data) return <p>404</p>;

  return (
    <ul className="flex w-full flex-col gap-4">
      <TweetView key={data.post.id} post={data.post} author={data.author} />
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default PostPage;
