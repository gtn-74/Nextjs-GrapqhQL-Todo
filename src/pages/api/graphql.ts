// graphqlサーバーを設定するソース

import { createYoga, createSchema } from "graphql-yoga";
import { readFileSync } from "fs";
import { join } from "path";
import { resolvers } from "@/graphql/resolvers";
import { createContext } from "@/graphql/context";

// cwd()を使ってルートディレクトリから、schema.graphqlファイルへのパスを生成している。
const path = join(process.cwd(), "src", "generated", "schema.graphql");
// 指定されたパスのファイルを読み取り、内容を文字コードutf-8として取得してる。
const typeDefs = readFileSync(path).toString("utf-8");

// スキーマ・リゾルバをもとにGraphQLスキーマを作成
const schema = createSchema({
  typeDefs,
  resolvers,
})

// エンドポイントを設定
const graphqlEndpoint = "/api/graphql";

// エンドポイント、スキーマ、
export default createYoga({
  graphqlEndpoint,
  schema,
  context: createContext,
});
