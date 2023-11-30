import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { DEFAULT_REVALIDATE_TIME, EAS_API_URL } from "../config";

import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: EAS_API_URL,
      fetchOptions: { next: { revalidate: DEFAULT_REVALIDATE_TIME } },
    }),
  });
});
