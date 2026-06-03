# Dynamic Form Builder — Machine Round Problem

## Overview

Build a **Dynamic Form Renderer** using **React + TypeScript**.

The form should be generated completely from a JSON configuration.

This problem tests:

* React fundamentals
* TypeScript understanding
* Dynamic rendering
* State management
* Form validation
* Reusable component architecture
* Clean code practices

---

# Problem Statement

You are given a JSON configuration like this:

```ts
const formConfig = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter your name"
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter your email"
  },
  {
    id: "age",
    label: "Age",
    type: "number",
    required: false
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    required: true,
    options: ["Male", "Female", "Other"]
  },
  {
    id: "skills",
    label: "Skills",
    type: "checkbox",
    options: ["React", "TypeScript", "Node"]
  }
]
```

---

# Your Task

Render the complete form dynamically based on the configuration.

You must avoid hardcoding fields manually.

The application should be scalable and reusable.

---

# Functional Requirements

## 1. Dynamic Field Rendering

Render fields dynamically using the `type` property.

Supported field types:

* text
* email
* number
* select
* checkbox

---

## 2. Controlled Components

All form fields must be controlled using React state.

---

## 3. Validation

Implement validation for:

* Required fields
* Valid email format

Example errors:

* “Name is required”
* “Invalid email”

---

## 4. Form Submission

On submit:

* Validate all fields
* Print final form data in console
* Show submitted JSON on UI

---

## 5. Checkbox Handling

The `skills` field should support multiple selections.

Expected format:

```ts
skills: ["React", "Node"]
```

---

## 6. TypeScript Requirements

Create proper TypeScript types/interfaces for:

* Form fields
* Form values
* Component props
* Validation state

Avoid using `any`.

---

## 7. Reusable Component Architecture

Suggested reusable components:

```txt
components/
  InputField
  SelectField
  CheckboxGroup
  DynamicField
```

---

# Bonus Requirements (Optional)

## Bonus 1 — Conditional Fields

If age is less than 18, show a parent consent checkbox.

Example:

```ts
{
  id: "parentConsent",
  label: "Parent Consent",
  type: "checkbox",
  showWhen: {
    field: "age",
    value: 18
  }
}
```

---

## Bonus 2 — Real-Time Validation

Validate fields while typing.

---

## Bonus 3 — Dynamic Field Addition

Allow users to dynamically add new fields.

---

## Bonus 4 — Persist Form State

Store form data in localStorage.

---

# Expected UI

Simple clean UI is enough.

Example:

```txt
----------------------------
Dynamic Registration Form
----------------------------

Full Name: [________]

Email: [________]

Gender: [Dropdown]

Skills:
[x] React
[ ] TypeScript
[x] Node

[Submit]
```

---

# Technical Expectations

## React Concepts

* Controlled components
* Conditional rendering
* Rendering lists dynamically
* Component reusability
* State management

---

## TypeScript Concepts

* Union types
* Generic types
* Prop typing
* State typing
* Type-safe form handling

---

# Suggested Type Structure

```ts
type FieldType =
  | "text"
  | "email"
  | "number"
  | "select"
  | "checkbox"
```

---

# Suggested State Shape

```ts
type FormValues = {
  [key: string]: string | number | string[]
}
```

---

# Suggested Folder Structure

```txt
src/
 ├── components/
 ├── types/
 ├── utils/
 ├── data/
 └── App.tsx
```

---

# Follow-Up Questions Interviewers May Ask

* How would you optimize re-renders?
* How would you support nested forms?
* How would you integrate React Hook Form?
* How would you fetch schema from API?
* How would you support async validation?
* How would you make the form extensible?

---

# Important Notes

* Do not hardcode form fields.
* Focus on scalability and clean architecture.
* Keep components reusable.
* Prioritize type safety.
* Manual implementation is preferred over form libraries for this round.

Avoid using:

* Formik
* React Hook Form

unless explicitly asked.

---

# Evaluation Criteria

You will be evaluated on:

* Code quality
* TypeScript usage
* Component architecture
* Reusability
* Validation handling
* Scalability
* Clean UI and UX
* Problem-solving approach

---

# Goal

Build a scalable and reusable dynamic form system using React and TypeScript with proper validation and clean architecture.
