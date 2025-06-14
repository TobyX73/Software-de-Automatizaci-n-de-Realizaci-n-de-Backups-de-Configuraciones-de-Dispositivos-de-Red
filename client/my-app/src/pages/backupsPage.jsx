import { useState } from "react";
import SideBar from "../components/sideBar";
import BackupsTable from "../components/backupTable";
import BackupConfig from "../logic/backupConfig";

function BackupsPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <SideBar />
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <BackupsTable refresh={refresh} />
          </div>
          <div>
            <BackupConfig onConfigSaved={() => setRefresh((r) => !r)} />
          </div>
        </div>
      </main>
    </div>
  );
}
export default BackupsPage;
