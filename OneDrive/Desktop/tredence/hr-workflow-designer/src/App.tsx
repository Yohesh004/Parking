import NodeSidebar from "./components/NodeSidebar";
import WorkflowCanvas from "./components/WorkflowCanvas";
import NodeDetailsPanel from "./components/NodeDetailsPanel";
import SandboxPanel from "./components/SandboxPanel";

function App() {
  return (
    <div className="h-screen flex flex-col text-sm">
      <header className="border-b px-4 py-2 flex items-center justify-between">
        <div className="font-semibold text-base">
          HR Workflow Designer (Prototype)
        </div>
        <div className="text-xs text-gray-500">
          Example: onboarding / leave approval / document verification flows
        </div>
      </header>

      <div className="flex flex-1">
        <NodeSidebar />
        <div className="flex flex-col flex-1">
          <WorkflowCanvas />
          <SandboxPanel />
        </div>
        <NodeDetailsPanel />
      </div>
    </div>
  );
}

export default App;
