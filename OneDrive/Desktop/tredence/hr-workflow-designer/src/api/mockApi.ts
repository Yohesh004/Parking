import type { Edge, Node } from "reactflow";
import type { WorkflowNodeData } from "../nodes/types";

export type Automation = {
  id: string;
  label: string;
  params: string[];
};

export const getAutomations = async (): Promise<Automation[]> => {
  // mock GET /automations
  await new Promise((r) => setTimeout(r, 200));
  return [
    { id: "send_email", label: "Send Email", params: ["to", "subject"] },
    {
      id: "generate_doc",
      label: "Generate Document",
      params: ["template", "recipient"],
    },
  ];
};

export type SimulationRequest = {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
};

export type SimulationStep = {
  nodeId: string;
  message: string;
};

export type SimulationResult = {
  steps: SimulationStep[];
  errors: string[];
};

export const simulateWorkflow = async (
  payload: SimulationRequest
): Promise<SimulationResult> => {
  // mock POST /simulate
  await new Promise((r) => setTimeout(r, 300));

  const { nodes, edges } = payload;
  const errors: string[] = [];

  const startNodes = nodes.filter((n) => n.type === "start");
  if (startNodes.length !== 1) {
    errors.push("Workflow must have exactly one Start node.");
  }

  const endNodes = nodes.filter((n) => n.type === "end");
  if (endNodes.length === 0) {
    errors.push("Workflow must have at least one End node.");
  }

  // simple reachability: BFS from start
  const steps: SimulationStep[] = [];
  if (startNodes.length === 1) {
    const startId = startNodes[0].id;
    const visited = new Set<string>();
    const queue: string[] = [startId];

    while (queue.length) {
      const current = queue.shift()!;
      if (visited.has(current)) {
        errors.push(`Cycle detected at node ${current}`);
        continue;
      }
      visited.add(current);

      const node = nodes.find((n) => n.id === current);
      if (node) {
        steps.push({
          nodeId: node.id,
          message: `Executed ${node.data.type.toUpperCase()} "${node.data.label}"`,
        });
      }

      const outgoing = edges
        .filter((e) => e.source === current)
        .map((e) => e.target);
      queue.push(...outgoing);
    }

    const unreachable = nodes
      .filter((n) => !visited.has(n.id))
      .map((n) => n.id);
    if (unreachable.length) {
      errors.push(`Unreachable nodes: ${unreachable.join(", ")}`);
    }
  }

  return { steps, errors };
};
