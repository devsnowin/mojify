import { type NextPage } from "next";
import { Fragment } from "react";
import Feed from "~/components/Feed";
import PostForm from "~/components/PostForm";

const Home: NextPage = () => {
  return (
    <Fragment>
      <PostForm />
      <Feed />
    </Fragment>
  );
};

export default Home;
