import { type NextPage } from "next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Feed from "~/components/Feed";
import PostForm from "~/components/PostForm";

// dayjs cofig
dayjs.extend(relativeTime);

const Home: NextPage = () => {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-col items-center gap-14">
      <PostForm />
      <Feed />
    </main>
  );
};

export default Home;
