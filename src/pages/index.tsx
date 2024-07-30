// UI
import { ListTodosQuery, useListTodosQuery } from "@/generated/request";
import React from "react";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";

export default function Home() {
  // 状態
  const [todos, setTodos] = React.useState<ListTodosQuery["listTodos"]>([]);

  // カスタムフック
  // TODO:なんでこのカスタムフックがクエリから生成されて、使おという思考になるのか理解できない
  const { loading, error, data, refetch } = useListTodosQuery();

  //
  React.useEffect(() => {
    setTodos(data?.listTodos ?? []);
  }),
    [data?.listTodos];

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data?.listTodos) return <div>data error...</div>;

  return (
    <div className="min-w-screen min-h-screen" data-theme="winter">
      <form className="flex p-10">
        <input
          type="text"
          placeholder="TODOを入力"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary">送信</button>
      </form>
      <div
        className="flex flex-col items-center gap-3 overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 150px)",
        }}
      >
        {todos.map((todo) => (
          <div
            className="p-3 bg-base-300 rounded-md w-2/3 flex items-center gap-3"
            key={todo.id}
          >
            <button>
              {todo.done ? (
                <AiFillCheckCircle
                  size={40}
                  className="text-primary hover:text-primary-focus"
                />
              ) : (
                <AiOutlineCheckCircle
                  size={40}
                  className="text-primary hover:text-primary-focus"
                />
              )}
            </button>
            <div className="text-lg font-bold flex-1">{todo.content}</div>
            <button>
              <BsFillTrash2Fill
                size={40}
                className="text-error hover:text-error-content"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
/**
  loading: Boolean => "データ取得中かどうか"
  error: Object =>  "エラーが発生した場合、オブジェクトが格納されます"
  data: Object => "取得したデータ"
  refetch: Function "再取得メソッド(後で登場します)"
 */
