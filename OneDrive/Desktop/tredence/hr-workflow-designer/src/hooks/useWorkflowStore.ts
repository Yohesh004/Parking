import { create } from "zustand";
import type { Edge, Node } from "reactflow";

import type { WorkflowNodeData, NodeType } from "../nodes/types";

type WorkflowState = {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  setNodes: (nodes: Node<WorkflowNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectNode: (id: string | null) => void;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
};

let idCounter = 1;
const genId = () => `node-${idCounter++}`;

const defaultDataForType = (type: NodeType): WorkflowNodeData => {
  switch (type) {
    case "start":
      return {
        type,
        label: "Start",
        metadata: [],
      };
    case "task":
      return {
        type,
        label: "Task",
        description: "",
        assignee: "",
        dueDate: "",
        customFields: [],
      };
    case "approval":
      return {
        type,
        label: "Approval",
        approverRole: "",
        autoApproveThreshold: 0,
      };
    case "automated":
      return {
        type,
        label: "Automated Step",
        actionId: "",
        params: {},
      };
    case "end":
      return {
        type,
        label: "End",
        message: "",
        showSummary: true,
      };
  }
};

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  selectNode: (id) => set({ selectedNodeId: id }),
  addNode: (type, position) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: genId(),
          type,
          position,
          data: defaultDataForType(type),
        },
      ],
    })),
  updateNodeData: (id, partial) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id
          ? { ...n, data: { ...n.data, ...partial } as WorkflowNodeData }
          : n
      ),
    })),
}));
