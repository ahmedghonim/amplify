import { Inter } from "next/font/google";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { ListTodosQuery } from "~/API";
import { listTodos } from "~/graphql/queries";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ todos }: { todos: ListTodosQuery }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Todos</h1>
      <ul className="flex flex-col space-y-4">
        {todos.listTodos?.items?.map((todo) => (
          <li key={todo?.id} className="flex items-center space-x-4">
            <span className="text-2xl">{todo?.name}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const todos = await API.graphql<GraphQLQuery<ListTodosQuery>>(
    graphqlOperation(listTodos)
  );
  console.log("todos >>>> ", todos);
  return {
    props: {
      todos: todos?.data,
    },
  };
}
