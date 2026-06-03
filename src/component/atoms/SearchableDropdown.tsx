import React, { useCallback, useEffect, useId, useRef, useState } from "react";

type SearchableDropdownProp = {
  name?: string;
  list: string[];
  onSelect: (key: string) => void;
};
const SearchableDropdown = ({
  name = "countries",
  list,
  onSelect,
}: SearchableDropdownProp) => {
  const id = useId();
  const [value, setValue] = useState<string>("");
  const [heighLightIndex, setHighLightIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
const listRef = useRef<HTMLDivElement>(null);
const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    if (!value) {
      setIsOpen(false);
    } else {
      setHighLightIndex(0);
    }
  }, [value]);

  useEffect(() => {
    itemRefs.current[heighLightIndex]?.scrollIntoView({
        block: "nearest",
    });
  }, [heighLightIndex]);

  const filtered = list.filter((key) =>
    key.toLowerCase().includes(value.toLowerCase()),
  );

  const handleSelect = (item: string) => {
    setValue(item);
    setIsOpen(false);
    onSelect(item);
  };
  const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighLightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighLightIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        handleSelect(filtered[heighLightIndex]);
        break;
    }
  };

  return (
   <section
  style={{
    width: "320px",
    margin: "20px auto",
    fontFamily: "sans-serif",
  }}
>
  <div
    style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}
  >
    <label
      htmlFor={id}
      style={{
        fontWeight: 600,
        fontSize: "12px",
        textAlign:'left'
      }}
    >
      Search {name}
    </label>

    <input
      type="search"
      id={id}
      value={value}
      placeholder={`Search ${name}...`}
      onChange={(e) => {
        setValue(e.target.value);
        setIsOpen(true);
      }}
      onKeyDown={handlekeyDown}
      style={{
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        outline: "none",
        fontSize: "14px",
      }}
    />

    {isOpen && (
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          marginTop: "4px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          background: "#fff",
          maxHeight: "220px",
          overflowY: "auto",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
         ref={listRef}
      >
        {filtered.length ? (
          filtered.map((item, i) => (
            <div
              key={item}
               ref={(el) => {
                itemRefs.current[i] = el;
                }}
              onClick={() => handleSelect(item)}
              style={{
                padding: "10px 12px",
                cursor: "pointer",
                background:
                  heighLightIndex === i
                    ? "#f3f4f6"
                    : "white",
                borderBottom:
                  i !== filtered.length - 1
                    ? "1px solid #f1f1f1"
                    : "none",
              }}
            >
              {item}
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "12px",
              color: "#6b7280",
            }}
          >
            No results found
          </div>
        )}
      </div>
    )}
  </div>
</section>
  );
};

export default SearchableDropdown;
