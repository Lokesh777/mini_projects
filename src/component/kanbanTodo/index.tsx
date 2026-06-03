import { useEffect, useReducer, useState, type CSSProperties } from "react";
import CustomInput from "../atoms/CustomInput";

type TodoProp = {
  logo: string;
};

type Todos = {
  text: string;
  id: number;
  status: boolean;
};

type Action =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "DELETE"; id: number }
  | { type: "EDIT"; id: number; text: string };

const todoReducer = (state: Todos[], action: Action): Todos[] => {
  switch (action.type) {
    case "ADD":
      return [
        {
          id: Date.now(),
          text: action.text,
          status: false,
        },
        ...state,
      ];

    case "TOGGLE":
      return state.map((item) =>
        item.id === action.id ? { ...item, status: !item.status } : item,
      );

    case "EDIT":
      return state.map((item) =>
        item.id === action.id ? { ...item, text: action.text } : item,
      );

    case "DELETE":
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
};

const initialState: Todos[] = [];

type RenderTasks = {
  tasks: Todos[];
  title: string;
  editValue: string;
  editId: number | null;
  setEditValue: React.Dispatch<React.SetStateAction<string>>;
  handleEdit: (id: number) => void;
  openEdit: (item: Todos) => void;
  dispatch: React.Dispatch<Action>;
};
const RenderTasks = ({
  tasks,
  title,
  editValue,
  editId,
  setEditValue,
  handleEdit,
  dispatch,
  openEdit,
}: RenderTasks) => (
  <section style={columnStyle}>
    <div style={headerStyle}>
      <h3>{title}</h3>
      <span>{tasks.length}</span>
    </div>

    {tasks.length === 0 && <p style={emptyText}>No tasks available</p>}

    {tasks.map((item) => (
      <div key={item.id} style={cardStyle}>
        {editId === item.id ? (
          <>
            <input
              style={editInput}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEdit(item.id)}
            />

            <button style={primaryBtn} onClick={() => handleEdit(item.id)}>
              Save
            </button>
          </>
        ) : (
          <>
            <p
              style={{
                ...taskText,
                textDecoration: item.status ? "line-through" : "none",
                opacity: item.status ? 0.6 : 1,
              }}
            >
              {item.text}
            </p>

            <div style={actionRow}>
              <button
                style={successBtn}
                onClick={() =>
                  dispatch({
                    type: "TOGGLE",
                    id: item.id,
                  })
                }
              >
                {item.status ? "Undo" : "Complete"}
              </button>

              <button style={secondaryBtn} onClick={() => openEdit(item)}>
                Edit
              </button>

              <button
                style={dangerBtn}
                onClick={() =>
                  dispatch({
                    type: "DELETE",
                    id: item.id,
                  })
                }
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </section>
);


const TodoApp = ({ logo }: TodoProp) => {
  const [todos, dispatch] = useReducer(
    todoReducer,
    initialState,
    (): Todos[] => {
      const data = localStorage.getItem("todos");
      return data ? JSON.parse(data) : [];
    },
  );

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    dispatch({
      type: "ADD",
      text: trimmed,
    });

    setInput("");
  };

  const handleEdit = (id: number) => {
    if (!editValue.trim()) return;

    dispatch({
      type: "EDIT",
      id,
      text: editValue,
    });

    setEditId(null);
    setEditValue("");
  };

  const openEdit = (item: Todos) => {
    setEditId(item.id);
    setEditValue(item.text);
  };

  return (
    <section style={container}>
      <img src={logo} alt="logo" width={60} />

      <h1 style={titleStyle}>Todo Manager</h1>

      <div style={inputWrapper}>
        <CustomInput
          style={inputStyle}
          value={input}
          placeholder="Add a new task..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />

        <button style={primaryBtn} onClick={handleAdd}>
          Add Task
        </button>
      </div>

      <div className="board">
        <RenderTasks
          tasks={todos}
          title={"All Tasks"}
          editValue={editValue}
          editId={editId}
          setEditValue={setEditValue}
          handleEdit={handleEdit}
          dispatch={dispatch}
          openEdit={openEdit}
        />

        <RenderTasks
          tasks={todos.filter((item) => !item.status)}
          title={"In Progress"}
          editValue={editValue}
          editId={editId}
          setEditValue={setEditValue}
          handleEdit={handleEdit}
          dispatch={dispatch}
          openEdit={openEdit}
        />
        <RenderTasks
          tasks={todos.filter((item) => item.status)}
          title={"Completed"}
          editValue={editValue}
          editId={editId}
          setEditValue={setEditValue}
          handleEdit={handleEdit}
          dispatch={dispatch}
          openEdit={openEdit}
        />
      </div>
    </section>
  );
};

export default TodoApp;
const container: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "2rem",
  fontFamily: "sans-serif",
};

const titleStyle: CSSProperties = {
  marginBottom: "1.5rem",
};

const inputWrapper: CSSProperties = {
  display: "flex",
  gap: "1rem",
  marginBottom: "2rem",
};

const inputStyle: CSSProperties = {
  flex: 1,
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const boardStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "1rem",
};

const columnStyle: CSSProperties = {
  background: "#f8f9fb",
  padding: "1rem",
  borderRadius: "12px",
  minHeight: "400px",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
};

const cardStyle: CSSProperties = {
  background: "#fff",
  borderRadius: "10px",
  padding: "1rem",
  marginBottom: "1rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const actionRow: CSSProperties = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "1rem",
};

const taskText: CSSProperties = {
  margin: 0,
  wordBreak: "break-word",
};

const emptyText: CSSProperties = {
  opacity: 0.6,
};

const editInput: CSSProperties = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
};

const primaryBtn: CSSProperties = {
  padding: "10px 14px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryBtn: CSSProperties = {
  ...primaryBtn,
};

const successBtn: CSSProperties = {
  ...primaryBtn,
};

const dangerBtn: CSSProperties = {
  ...primaryBtn,
};
