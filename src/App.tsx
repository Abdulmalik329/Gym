import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import SuperAdmin from "./Superadmin/App";


// Lazy imports
const Login = lazy(() => import("./Members/src/pages/login"));
const MembersApp = lazy(() => import("./Members/App")); // Member qismi
const AdminApp = lazy(() => import("./Superadmin/App")); // Admin qismi

// Loader komponenti
const PageLoader = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#101922",
      color: "white",
    }}
  >
    Yuklanmoqda...
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persister,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/admin/*" element={<SuperAdmin />} />
            <Route path="/*" element={<MembersApp />} />

          </Routes>
        </Suspense>
    </QueryClientProvider>
  );
}
export default App;
