import "@/styles/globals.css";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";

// アポロクライアント
export const client = new ApolloClient({
  // uri:エンドポイントを指定するGraphQLのプロパティ
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  // apollo clientがデータキャッシュを管理する方法を指定する。
  // InMemoryCache；apollo clientに組み込まれたキャッシュの実装の一つ。
  // クライアント側で取得したデータをメモリ内にキャッシュする
  // 以後、メモリキャッシュから同じキャッシュを取得できるから同じデータのリクエストをする必要がなくなる。
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// Apollo Clientは、状態管理ライブラリ
// apollo clientとは、データベースも含めて、データのCRUD操作ができる状態管理がライブラリ