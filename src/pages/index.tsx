import { type NextPage } from "next";
import { Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Feed from "~/components/Feed";
import PostForm from "~/components/PostForm";

// dayjs cofig
dayjs.extend(relativeTime);

const Home: NextPage = () => {
  return (
    <Fragment>
      <PostForm />
      <Feed />
    </Fragment>
  );
};

export default Home;
