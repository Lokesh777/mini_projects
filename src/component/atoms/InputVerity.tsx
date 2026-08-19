import React, { useState } from "react";
import CustomInput from "./CustomInput";

type FormDataType = {
  date: string;
  time: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  color: string;
  range: number;
  search: string;
  month: string;
  week: string;
  file: File | null;
  checkbox: boolean;
  gender: string;
};

const InputVerity = () => {
  const [formData, setFormData] = useState<FormDataType>({
    date: "",
    time: "",
    phone: "",
    email: "",
    password: "",
    url: "",
    color: "#000000",
    range: 50,
    search: "",
    month: "",
    week: "",
    file: null,
    checkbox: false,
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files?.[0] || null
          : type === "range"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("Submitted Data:");
    console.log(formData);

    if (formData.file) {
      console.log("File Name:", formData.file.name);
      console.log("File Size:", formData.file.size);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Basic Inputs</h3>
<CustomInput
  type="date"
  name="date"
  value={formData.date}
  placeholder="Select your birth date"
  onChange={handleChange}
/>

<CustomInput
  type="time"
  name="time"
  value={formData.time}
  placeholder="Choose a time"
  onChange={handleChange}
/>

<CustomInput
  type="tel"
  name="phone"
  value={formData.phone}
  placeholder="Enter phone number"
  onChange={handleChange}
/>

<CustomInput
  type="email"
  name="email"
  value={formData.email}
  placeholder="Enter email address"
  onChange={handleChange}
/>

<CustomInput
  type="password"
  name="password"
  value={formData.password}
  placeholder="Enter password"
  onChange={handleChange}
/>

<CustomInput
  type="url"
  name="url"
  value={formData.url}
  placeholder="https://example.com"
  onChange={handleChange}
/>

      <br />

      <h3>Other Inputs</h3>

      <input
        type="search"
        name="search"
        value={formData.search}
        onChange={handleChange}
      />

      <input
        type="month"
        name="month"
        value={formData.month}
        onChange={handleChange}
      />

      <input
        type="week"
        name="week"
        value={formData.week}
        onChange={handleChange}
      />

      <input
        type="color"
        name="color"
        value={formData.color}
        onChange={handleChange}
      />

      <input
        type="range"
        name="range"
        value={formData.range}
        onChange={handleChange}
        min={0}
        max={100}
      />

      <p>Range Value: {formData.range}</p>

      <input
        type="file"
        name="file"
        onChange={handleChange}
      />

      <br />

      <label>
        <input
          type="checkbox"
          name="checkbox"
          checked={formData.checkbox}
          onChange={handleChange}
        />
        Accept Terms
      </label>

      <br />

      <h3>Gender</h3>

      <label>
        Male
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
        />
      </label>

      <label>
        Female
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
        />
      </label>

      <br />

      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default InputVerity;