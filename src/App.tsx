import { RouterProvider } from "react-router-dom";
import { router } from "src/router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "src/queryClient.ts";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools buttonPosition={"bottom-left"} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
