---
name: issue テンプレート
title: ''
about: issueを作成する際のテンプレートです。
labels: ''
assignees: ''

---

## 概要
Qiitaに掲載されていたNext.js + GraphQLでTodoアプリを構築するの実装をやってみた

https://qiita.com/maaaashi/items/fe52db19759ea8a0be31


## 目的
下記、技術のキャッチアップ
**Next.js**
**GraphQL**
**GraphQL Code Generator**
**Prisma**

### メモ
1.pj 立ち上げ
2.graphql server構築
    API疎通確認
3.postgreSQLを構築
4.prisma設定(DBとprismaを紐付けmodel生成)
5.GraphQL schema、Contextを書く
6.5をcodegen.yml経由でコードにパースする



**GraphQL Code Generatorとは**
GraphQLスキーマからコードを生成するツール



##  サーバーの立ち上げ方　　

```bash
pnpm dev

GraphQLサーバーも立ち上がる。

localhost:3000/api/graphql

```


<!-- 細かいタスクがある場合は書き出すこと。
- [] xxxx
- [] xxxx
- [] xxxx -->