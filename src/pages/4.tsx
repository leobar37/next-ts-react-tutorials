import React, {
  ReactNode,
  ReactChild,
  PropsWithChildren,
  FC,
  Children,
  useCallback,
  useState,
} from "react";
import {} from "react-dom";
import { Box, Text, Flex, VStack, HStack, Button } from "@chakra-ui/react";
import Layout from "../components/Layout";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type PropsController = {
  children: (api: {
    todos: Todo[];
    loading: boolean;
    fetchTodos: () => void;
  }) => ReactNode;
};

const TodoController = ({ children }: PropsController) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const fetchTodos = useCallback(async () => {
    const _todos = await fetch(
      "https://jsonplaceholder.typicode.com/todos/"
    ).then((response) => response.json());
    setTodos(_todos);
    setLoading(false);
  }, [todos]);

  const actionTodos = () => {
    setLoading(true);
    setTimeout(() => {
      fetchTodos();
    }, 3000);
  };

  return <>{children({ todos, loading, fetchTodos: actionTodos })}</>;
};

function Page() {
  return (
    <Layout>
      <TodoController>
        {({ todos, fetchTodos, loading }) => (
          <>
            <Flex
              justifyContent="center"
              bg="white"
              width="500px"
              direction="column"
            >
              {loading && (
                <Box>
                  <h1>cargando...</h1>
                </Box>
              )}
              {!loading && (
                <Box maxHeight="350px" overflowY="scroll">
                  {todos.map((todo) => (
                    <Box key={todo.id}>{todo.title}</Box>
                  ))}
                </Box>
              )}
              <Button onClick={() => fetchTodos()}>fetch</Button>
            </Flex>
          </>
        )}
      </TodoController>
    </Layout>
  );
}

export default Page;
