import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/layout";

// extend the relative time in dayjs module
dayjs.extend(relativeTime);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
