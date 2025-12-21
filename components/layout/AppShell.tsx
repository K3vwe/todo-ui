import Sidebar from "./Sidebar";
import MainWorkspace from "@/components/main/MainWorkspace";

export default function AppShell() {
  return (
    <div className="h-screen w-screen bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-12 h-full">
        <Sidebar />
        <MainWorkspace />
      </div>
    </div>
  );
}
