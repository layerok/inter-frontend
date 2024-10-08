import { RouterProvider } from "react-router-dom";
import { router } from "src/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // We don't want to retry queries by default, because in most cases we
      // want to fail early and show a response to the user. There are
      // exceptions, and those can be made on a per-query basis. For others, we
      // should give users controls to retry.
      retry: false,
      refetchOnMount: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools buttonPosition={"bottom-left"} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
