import { useState, type CSSProperties } from "react";
import { formConfig, type FormElement } from "./customData";
import CustomInput from "../atoms/CustomInput";

type FormProp = {
  name: string;
  email: string;
  gender: string;
  age: number | null;
  skills: string[];
  id?: number;
};

type inputProps = {
  ele: FormElement;
  formData: FormProp;
  errors: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
};

const initData = {
  name: "",
  email: "",
  age: null,
  gender: "",
  skills: [],
};

const initErros = {
  name: "",
  email: "",
  age: "",
  gender: "",
  skills: "",
};

const DynamicForm = () => {
  const [formData, setFormData] = useState<FormProp>(initData);
  const [errors, setErrors] = useState<Record<string, string>>(initErros);
  const [users, setUsers] = useState<FormProp[]>(() => {
    return JSON.parse(localStorage.getItem("dataroom") || "[]");
  });

  const handleChange = (
    val: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = val.target;

    if (
      val.target instanceof HTMLInputElement &&
      val.target.type === "checkbox"
    ) {
      const checked = val.target.checked;

      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((key) => key !== value),
      }));

      return;
    }
    if (name === "email") {
      const emailVal = value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(emailVal)) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }

      setFormData((prev) => ({
        ...prev,
        email: emailVal,
      }));

      return;
    }
    if (name === "age") {
      const ageValue = Number(value);

      if (ageValue < 18 || ageValue > 60) {
        setErrors((prev) => ({
          ...prev,
          age: "Age must be between 18 and 60",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          age: "",
        }));
      }

      setFormData((prev) => ({
        ...prev,
        age: ageValue,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUsers = [...users, { ...formData, id: Date.now() }];
    localStorage.setItem("dataroom", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setFormData(initData);
    setErrors(initErros);
  };
  const handleDelete = (id: number | undefined) => {
    let update = users.filter((key) => key.id !== id);
    localStorage.setItem("dataroom", JSON.stringify(update));
    setUsers(update);
  };
  return (
    <section  style={styles.maincontainer}>
      <h3>User Profile</h3>
      <div>
        <form action="" onSubmit={handleSubmit} style={styles.container}>
          {formConfig.map((ele) => (
            <div key={ele.id}>
              {inputTypeComponent({ ele, handleChange, formData, errors })}
            </div>
          ))}
          <input
            type="submit"
            disabled={
              formData.name === "" ||
              formData.email === "" ||
              formData.skills.length === 0
            }
          />
        </form>
      </div>
      <br />
      <section style={styles.sectionCard}>
        {users.map((item) => (
          <div key={item.id} style={styles.card}>
            <p>Name: {item.name}</p>
            <p>Age: {item.age}</p>
            <p>Email: {item.email}</p>
            <p>Gender: {item.gender}</p>
            <p>Skills: {item.skills.map((key) => `${key}, `)}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </section>
    </section>
  );
};

export default DynamicForm;

const inputTypeComponent = ({
  ele,
  handleChange,
  formData,
  errors,
}: inputProps) => {
  switch (ele.type) {
    case "select":
      return (
        <select
          name={ele.id}
          id={ele.id}
          value={formData.gender}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {ele?.options?.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      );
    case "text":
      return (
        <CustomInput
          type={ele.type}
          name={ele.id}
          value={formData?.[ele.id] ?? ""}
          placeholder={ele.placeholder}
          id={ele.id}
          onChange={handleChange}
        />
      );
    case "checkbox":
      return (
        <div style={styles.checkboxContainer}>
          {ele?.options?.map((item) => (
            <label htmlFor={item} key={item}>
              <CustomInput
                type={"checkbox"}
                name={ele.id}
                value={item}
                id={item}
                checked={formData?.skills?.includes(item) || false}
                onChange={handleChange}
              />
              {item}
            </label>
          ))}
        </div>
      );
    default:
      return (
        <>
          <CustomInput
            type={ele.type}
            name={ele.id}
            value={formData?.[ele.id] ?? ""}
            placeholder={ele.placeholder}
            id={ele.id}
            onChange={handleChange}
          />
          {errors[ele.id] && <p style={{ color: "red" }}>{errors[ele.id]}</p>}
        </>
      );
  }
};

const styles: Record<string, CSSProperties> = {

  maincontainer: {
    padding: "0 1rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    maxWidth:'60%',
    margin: "0 auto",
  },
  checkboxContainer: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  sectionCard: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid grey",
    borderRadius: "8px",
    textAlign: "left",
    padding: "1rem",
  },
};
