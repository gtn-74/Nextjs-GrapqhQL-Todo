// リゾルバ関数がアクセスできる共有オブジェクト。
  // データベース接続、認証情報など
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// graphqlで利用できるようにprismaをラップ ---configで設定してる
export type Context = {
  prisma: typeof prisma;
};

// Operation database
// どこで使うか
// GraphQLサーバーとprismaを接続してる
export const createContext = () => {
  return {
    prisma: prisma,
  };
};

// Resolver:スキーマ定義でクライアントが操作できるクエリ、型の定義
// スキーマ：パースする前のクエリ言語のこと
// リゾルバ：データ操作
