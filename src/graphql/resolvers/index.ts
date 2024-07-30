import { Resolvers } from "@/generated/resolvers-types";

export const resolvers: Resolvers = {
  // 全てのlistTodoを取得
  Query: {
    // _args:引数ないから利用していない
    listTodos: async (_parent, _args, { prisma }) => {
      return await prisma.todo.findMany()
    },
  },
  Mutation: {
    // args:contentをビューから取得
    addTodo: async (_parent, { content }, { prisma }) => {
      console.log(content);
      return await prisma.todo.create({
        // 時間は、リゾルバからprisma側に送るこの時にインスタンス生成してる
        data: { content, createdAt: new Date().toISOString() },
      });
    },
    updateTodo: async (_parent, { id, done }, { prisma }) => {
      return await prisma.todo.update({
        // テーブルのidが一致するdoneに対してupdateを加える
        where: { id },
        data: { done },
      });
    },
    deleteTodo: async (_parent, { id }, { prisma }) => {
      return await prisma.todo.delete({
        where: { id },
      });
    },
  },
};
// parent:親オブジェクトのこと
// 親オブジェクトへのアクセス
// _  :文頭にアンダーバーがついていたら、使用されていない


// _args:gqlクエリ、ミューテーションに渡された引数のオブジェクトのこと
// クライアントから送信されたパラメータを取得

// { prisma }:リゾルバで必要な共通のデータ、機能にアクセスするために利用する
// prismaをインスタント化し、データベース操作をする
// schema.prismaで命名されたモデル名が小文字でプロパティに追加される。

/*
CRUDのdb操作命名
   prisma.todo.findMany()
   prisma.todo.create()
   prisma.todo.update()
   prisma.todo.delete()
*/

// フィールド：データの単位を指す


// code generatorを使うメリット
// https://qiita.com/maaaashi/items/722d75cf8bd25efded88#4-graphql-resolver