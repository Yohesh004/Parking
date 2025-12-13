import type { StartNodeData } from "../types";

type Props = {
  data: StartNodeData;
  onChange: (data: Partial<StartNodeData>) => void;
};

export default function StartNodeForm({ data, onChange }: Props) {
  const updateMeta = (idx: number, key: "key" | "value", value: string) => {
    const copy = [...data.metadata];
    copy[idx] = { ...copy[idx], [key]: value };
    onChange({ metadata: copy });
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Start Node</h3>
      <label className="block text-xs mb-1">Title</label>
      <input
        className="border w-full px-2 py-1 mb-2 text-sm"
        value={data.label}
        onChange={(e) => onChange({ label: e.target.value })}
      />
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold">Metadata</span>
        <button
          className="text-xs underline"
          onClick={() =>
            onChange({ metadata: [...data.metadata, { key: "", value: "" }] })
          }
          type="button"
        >
          + Add
        </button>
      </div>
      {data.metadata.map((m, i) => (
        <div className="flex gap-1 mb-1" key={i}>
          <input
            className="border px-1 py-0.5 text-xs flex-1"
            placeholder="Key"
            value={m.key}
            onChange={(e) => updateMeta(i, "key", e.target.value)}
          />
          <input
            className="border px-1 py-0.5 text-xs flex-1"
            placeholder="Value"
            value={m.value}
            onChange={(e) => updateMeta(i, "value", e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
