import { Center, Text } from "@chakra-ui/layout";
import React from "react";

/**
 *
 * @see  https://medium.com/@martin_hotell/react-children-composition-patterns-with-typescript-56dfc8923c64
 */

function index() {
  return (
    <Center bg="blue.600" width="100vw" height="100vh">
      <Text color="white" fontStyle="italic" fontWeight="bold" fontSize="8xl">
        React children
      </Text>
    </Center>
  );
}

export default index;

/**
 * import React, { ReactNode, useCallback, useState } from "react";
import { Button } from "@chakra-ui/react";
type PropsController = {
  onTodos: (todos: any) => void;
};

type ChildrenController = {
  children: (api: { todos: any; fetchTodos: () => void }) => ReactNode;
};

const TodosController: React.FunctionComponent<ChildrenController> = ({
  children,
}) => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = useCallback(async () => {
    const todos = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    ).then((response) => response.json());
    setTodos(todos);
  }, [todos]);

  const actionTodo = () => {
    fetchTodos();
  };

  return <>{children({ todos, fetchTodos: actionTodo })}</>;
};

function Page() {
  return (
    <div>
      <TodosController>
        {({ todos, fetchTodos }) => {
          return (
            <div>
              <Button onClick={() => fetchTodos()}> fetch todos </Button>
              <pre>{JSON.stringify(todos, null, 4)}</pre>
            </div>
          );
        }}
      </TodosController>
    </div>
  );
}

export default Page;

 */
