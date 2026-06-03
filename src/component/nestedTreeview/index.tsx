import { useState, type CSSProperties } from "react";
import { dummyData } from "./customData";
import type { ItemCheckbox } from "./customData";
import CustomInput from "../atoms/CustomInput";

type DynamicNestedCheckboxProp = {
  logo: string;
};

type TreeviewProp = {
  node: ItemCheckbox;
  handleChange: (id: number, status: boolean) => void;
};
const DynamicNestedCheckbox = ({ logo }: DynamicNestedCheckboxProp) => {
  const [data, setData] = useState<ItemCheckbox[]>(dummyData);

  const updateAllChildren = (
    nodes: ItemCheckbox[],
    status: boolean,
  ): ItemCheckbox[] => {
    return nodes.map((node) => ({
      ...node,
      checked: status,
      children: node.children ? updateAllChildren(node.children, status) : [],
    }));
  };

  const getAllSelected = (nodes: ItemCheckbox[]): ItemCheckbox[] => {
    return nodes.flatMap((node) => [
      ...(node.checked ? [node] : []),
      ...(node.children ? getAllSelected(node.children) : []),
    ]);
  };

  const selectedItems = getAllSelected(data);
  const updateNodes = (
    nodes: ItemCheckbox[],
    id: number,
    status: boolean,
  ): ItemCheckbox[] => {
    return nodes.map((node) => {
      // MATCH FOUND
      if (node.id === id) {
        return {
          ...node,
          checked: status,
          children: node.children
            ? updateAllChildren(node.children, status)
            : [],
        };
      }

      // SEARCH DEEPER
      if (node.children?.length) {
        const updatedChildren = updateNodes(node.children, id, status);

        // parent auto checked if all children checked
        const allChildrenChecked = updatedChildren.every(
          (child) => child.checked,
        );

        return {
          ...node,
          checked: allChildrenChecked,
          children: updatedChildren,
        };
      }

      return node;
    });
  };

  const handleChange = (id: number, status: boolean) => {
    setData((prev) => updateNodes(prev, id, status));
  };

  const handleAllSelected = () => {
    const allChecked = selectedItems.length > 0;
    setData((prev) => updateAllChildren(prev, !allChecked));
  };
  return (
    <section>
      <h3>Nested Checkbox</h3>
      <img src={logo} alt="Logo" style={logoStyle} />

      <section>
        <button onClick={handleAllSelected}>All Selected</button>
        {data.map((node) => (
          <TreeView key={node.id} node={node} handleChange={handleChange} />
        ))}
      </section>
      <section>
        <h4>Selected Keys : {selectedItems.length}</h4>

        {selectedItems.map((key) => (
          <button key={key.id} style={{ marginLeft: "8px" }}>
            {key.label}
          </button>
        ))}
      </section>
    </section>
  );
};

export default DynamicNestedCheckbox;

const logoStyle: CSSProperties = {
  width: 60,
  height: 60,
};

const TreeView = ({ node, handleChange }: TreeviewProp) => {
  return (
    <div
      style={{
        marginLeft: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
      }}
    >
      <label
        htmlFor={node.label}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <CustomInput
          type="checkbox"
          name={node.label}
          checked={node.checked}
          id="node"
          onChange={(e) => handleChange(node.id, e.target.checked)}
        />
        {node.label}
      </label>
      {node.children.length > 0 && (
        <div
          style={{
            paddingLeft: "20px",
            borderLeft: "1px solid #f9f4f4",
          }}
        >
          {node.children.map((item) => (
            <TreeView key={item.id} node={item} handleChange={handleChange} />
          ))}
        </div>
      )}
    </div>
  );
};
