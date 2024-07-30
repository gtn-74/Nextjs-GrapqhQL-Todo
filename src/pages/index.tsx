// UI
import {
  ListTodosQuery,
  useAddTodoMutation,
  useListTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/generated/request";
import React, { FormEvent } from "react";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { BsFillTrash2Fill } from "react-icons/bs";

export default function Home() {
  // add状態
  const [todoContent, setTodoContent] = React.useState("");

  // query状態
  const [todos, setTodos] = React.useState<ListTodosQuery["listTodos"]>([]);

  // カスタムフック
  // TODO:なんでこのカスタムフックがクエリから生成されて、使おという思考になるのか理解できない
  const { loading, error, data, refetch } = useListTodosQuery();

  // カスタムフック
  // add
  const [addTodoMutation] = useAddTodoMutation();
  // update
  const [updateTodoMutation] = useUpdateTodoMutation();
  // delete
  const [deleteTodoMutation] = useDeleteTodoMutation();

  //　空配列 or data有かチェックしてる
  React.useEffect(() => {
    setTodos(data?.listTodos ?? []);
  }),
    [data?.listTodos];

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data?.listTodos) return <div>data error...</div>;

  // addButton
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    await addTodoMutation({
      variables: {
        content: todoContent,
      },
    });
    // inputリセット
    setTodoContent("");
    // 画面リフレッシュ
    refetch();
  };

  // update
  const updateHandler = async (id: string, current: boolean) => {
    await updateTodoMutation({
      variables: { id, done: !current },
    });
    console.log(current);

    refetch();
  };

  // delete
  const deleteHandler = async (id: string) => {
    await deleteTodoMutation({
      variables: { id },
    });
    refetch();
  };

  return (
    <div className="min-w-screen min-h-screen" data-theme="winter">
      <form className="flex p-10" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="TODOを入力"
          className="input input-bordered w-full"
          value={todoContent}
          onChange={(e) => {
            setTodoContent(e.target.value);
          }}
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
            <button
              onClick={() => {
                updateHandler(todo.id, todo.done);
              }}
            >
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
                onClick={() => {
                  deleteHandler(todo.id);
                }}
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

/*
  [0]: MutationFunction => "Mutationの実行関数"
[1]: MutationResult => {
  data: TData => "Mutationから返されたデータ"
  loading: Boolean => "取得中かどうか"
  error: Object => "エラーが発生した場合、オブジェクトが格納されます"
  called: Boolean => "trueの場合、呼び出されています"
  client: ApolloClient => "Mutationを実行したApollo Client情報"
  reset: Function => "Mutationの状態を初期の呼び出される前に戻す処理"
}]
*/
