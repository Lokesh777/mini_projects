import { useState, type CSSProperties } from "react";
import { dummyData } from "./customData";

type DynamicSelectionProp = {
  logo: string;
};
const DynamicSelection = ({ logo }: DynamicSelectionProp) => {
  const [items, setItems] = useState(dummyData);

  const selectedItems = items.filter((item) => item.checked);
  const unSelectedItems = items.filter((item) => !item.checked);

  const handleCheckbox = (status: boolean, id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: status } : item,
      ),
    );
  };

  const handleSelectAll = () => {
    const allChecked = items.every((item) => item.checked);
    setItems((prev) => prev.map((item) => ({ ...item, checked: !allChecked })));
  };
  const handleUnSelectAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, checked: false })));
  };
  return (
    <section>
      <h3>Dynamic Checkbox with All Selector</h3>
      <img src={logo} alt="Logo" style={imgStyle} />
      <section style={checkboxContainer}>
        <button
          disabled={unSelectedItems.length === items.length}
          onClick={handleUnSelectAll}
        >
          Reset
        </button>
        <button
          disabled={selectedItems.length === items.length}
          onClick={handleSelectAll}
        >
          selectAll
        </button>
        {items.map((item) => (
          <label htmlFor={item.label} key={item.id}>
            <input
              type="checkbox"
              checked={item.checked}
              name={item.label}
              id={item.label}
              onChange={(e) => handleCheckbox(e.target.checked, item.id)}
            />
            {item.label}
          </label>
        ))}
      </section>
      <section>
        <h5>total number of selected items : {selectedItems.length}</h5>
        <h5>
          list of selected items :{" "}
          {selectedItems.map((item) => item.label).join(", ")}
        </h5>
      </section>
    </section>
  );
};

export default DynamicSelection;

const imgStyle: CSSProperties = {
  width: 60,
  height: 60,
};
const checkboxContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "self-start",
  padding: "2rem 4rem 1rem 4rem ",
  gap: ".51rem",
};
