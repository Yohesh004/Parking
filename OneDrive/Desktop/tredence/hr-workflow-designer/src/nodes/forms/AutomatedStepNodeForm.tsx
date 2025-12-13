import { useEffect, useState } from "react";
import { getAutomations } from "../../api/mockApi";
import type { Automation } from "../../api/mockApi";

import type { AutomatedNodeData } from "../types";

type Props = {
  data: AutomatedNodeData;
  onChange: (data: Partial<AutomatedNodeData>) => void;
};

export default function AutomatedStepNodeForm({ data, onChange }: Props) {
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => {
    getAutomations().then(setAutomations);
  }, []);

  const selected = automations.find((a) => a.id === data.actionId);

  const handleParamChange = (name: string, value: string) => {
    onChange({ params: { ...data.params, [name]: value } });
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Automated Step Node</h3>

      <label className="block text-xs mb-1">Title</label>
      <input
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.label}
        onChange={(e) => onChange({ label: e.target.value })}
      />

      <label className="block text-xs mb-1">Action</label>
      <select
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.actionId}
        onChange={(e) => onChange({ actionId: e.target.value, params: {} })}
      >
        <option value="">Select action…</option>
        {automations.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>

      {selected && (
        <div className="mt-2">
          <div className="text-xs font-semibold mb-1">Parameters</div>
          {selected.params.map((p) => (
            <div key={p} className="mb-1">
              <label className="block text-[11px] mb-0.5">{p}</label>
              <input
                className="border w-full px-2 py-1 text-sm"
                value={data.params[p] || ""}
                onChange={(e) => handleParamChange(p, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
