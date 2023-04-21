import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { useState } from "react";
import { CreateTodoInput, CreateTodoMutation } from "~/API";
import { createTodo } from "~/graphql/mutations";
import { GraphQLQuery } from "@aws-amplify/api";
const AddTodo = () => {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const todo: CreateTodoInput = { name, description };
      await API.graphql<GraphQLQuery<CreateTodoMutation>>({
        query: createTodo,
        variables: { input: todo },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      console.log("todo >>>> ", todo);
      setName("");
      setDescription("");
      push("/");
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Add Todo</h1>

        <form
          className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center gap-8"
          onSubmit={handleSubmit}
        >
          <input
            className="border border-gray-400 p-2 rounded w-full"
            type="text"
            placeholder="Todo name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <textarea
            className="border border-gray-400 p-2 rounded w-full"
            placeholder="Todo description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create Todo
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddTodo;
