import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Toaster } from "react-hot-toast";
import {  Route, Routes, } from "react-router-dom";
import { lazy } from "react";
const SuperAdmin = lazy(() => import("./Superadmin/App")); ;
const MenagerApp = lazy(() => import("./Manager/App"));
const MembersApp = lazy(() => import("./Members/App")); // Member qismi


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
      <Routes>
        <Route path="/admin/*" element={<SuperAdmin />} />
        <Route path="/manager/*" element={<MenagerApp />} />
        <Route path="/*" element={<MembersApp />} />
      </Routes>
    </QueryClientProvider>
  );
}
export default App;
