import { Inter } from "next/font/google";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLQuery, GraphQLSubscription } from "@aws-amplify/api";
import { ListTodosQuery, OnCreateTodoSubscription } from "~/API";
import { listTodos } from "~/graphql/queries";
import Link from "next/link";
import { Auth } from "aws-amplify";
import { Hub } from "aws-amplify";
import { useEffect } from "react";
import { onCreateTodo } from "~/graphql/subscriptions";
import AddTodo from "./add";

export default function Home({ todos }: { todos: ListTodosQuery }) {
  async function listenToAutoSignInEvent() {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      console.log("A new auth event has happened: ", data);
      if (payload.event === "signIn") {
        console.log("a user has signed in!");
      }
      if (payload.event === "signOut") {
        console.log("a user has signed out!");
      }
    });
    // const todos = await API.graphql<
    //   GraphQLSubscription<OnCreateTodoSubscription>
    // >(graphqlOperation(onCreateTodo)).subscribe({
    //   next: ({ provider, value }) => console.log({ provider, value }),
    //   error: (error) => console.warn(error),
    // });
    console.log("todos >>>> ", todos);
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser().then((user) => {
        console.log("user >>>> ", user);
      });
      console.log("amplifyUser >>>> ", amplifyUser);
    } catch (error) {
      console.log("error >>>> ", error);
    }
  }
  useEffect(() => {
    listenToAutoSignInEvent();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Todos</h1>
      {/* routing button to add page */}
      <AddTodo />
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/add"
      >
        Add Todo
      </Link>
      {/* singout aws auth */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => Auth.signOut()}
      >
        Sign Out
      </button>
      {/* list todos */}

      <ul className="flex flex-col space-y-4">
        {todos.listTodos?.items?.map((todo) => (
          <li key={todo?.id} className="flex items-center space-x-4">
            <span className="text-2xl">{todo?.name}</span> :=
            <span className="text-2xl">{todo?.description}</span>
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
  return {
    props: {
      todos: todos?.data,
    },
    revalidate: 10,
  };
}
