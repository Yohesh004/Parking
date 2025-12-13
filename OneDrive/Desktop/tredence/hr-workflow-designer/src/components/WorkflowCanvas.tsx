import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

import type {
  Connection,
  Edge,
  Node,
  OnConnect,
  NodeChange,
  EdgeChange,
} from "reactflow";

import { useWorkflowStore } from "../hooks/useWorkflowStore";
import { nodeTypes } from "../nodes/nodeTypes";
import type { WorkflowNodeData } from "../nodes/types";

export default function WorkflowCanvas() {
  const { nodes, edges, setNodes, setEdges, selectNode } = useWorkflowStore(
    (s) => ({
      nodes: s.nodes,
      edges: s.edges,
      setNodes: s.setNodes,
      setEdges: s.setEdges,
      selectNode: s.selectNode,
    })
  );

  // ✅ SAFE React Flow handlers (NO INFINITE LOOP)
  const onNodesChange = (changes: NodeChange[]) => {
    setNodes(applyNodeChanges(changes, nodes));
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges(applyEdgeChanges(changes, edges));
  };

  const onConnect: OnConnect = (conn: Connection) => {
    setEdges(
      addEdge(
        { ...conn, id: `${conn.source}-${conn.target}` },
        edges
      )
    );
  };

  const onNodeClick = (_: any, node: Node<WorkflowNodeData>) => {
    selectNode(node.id);
  };

  const onPaneClick = () => selectNode(null);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
      >
        <Background gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
