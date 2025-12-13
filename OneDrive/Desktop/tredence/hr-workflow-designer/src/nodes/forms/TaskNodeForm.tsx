import type{ TaskNodeData } from "../types";

type Props = {
  data: TaskNodeData;
  onChange: (data: Partial<TaskNodeData>) => void;
};

export default function TaskNodeForm({ data, onChange }: Props) {
  const updateCustom = (idx: number, key: "key" | "value", value: string) => {
    const copy = [...data.customFields];
    copy[idx] = { ...copy[idx], [key]: value };
    onChange({ customFields: copy });
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Task Node</h3>
      <label className="block text-xs mb-1">Title*</label>
      <input
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.label}
        onChange={(e) => onChange({ label: e.target.value })}
      />

      <label className="block text-xs mb-1">Description</label>
      <textarea
        className="border w-full px-2 py-1 mb-2 text-sm"
        rows={2}
        value={data.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />

      <label className="block text-xs mb-1">Assignee</label>
      <input
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.assignee}
        onChange={(e) => onChange({ assignee: e.target.value })}
      />

      <label className="block text-xs mb-1">Due date</label>
      <input
        type="date"
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.dueDate}
        onChange={(e) => onChange({ dueDate: e.target.value })}
      />

      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold">Custom fields</span>
        <button
          type="button"
          className="text-xs underline"
          onClick={() =>
            onChange({
              customFields: [...data.customFields, { key: "", value: "" }],
            })
          }
        >
          + Add
        </button>
      </div>
      {data.customFields.map((f, i) => (
        <div className="flex gap-1 mb-1" key={i}>
          <input
            className="border px-1 py-0.5 text-xs flex-1"
            placeholder="Key"
            value={f.key}
            onChange={(e) => updateCustom(i, "key", e.target.value)}
          />
          <input
            className="border px-1 py-0.5 text-xs flex-1"
            placeholder="Value"
            value={f.value}
            onChange={(e) => updateCustom(i, "value", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
