# Frontend Coding Assignment — Dynamic Checkbox Selection

Build a dynamic checkbox selection component using React and TypeScript.

The goal of this assignment is to evaluate:

* State management
* Controlled components
* Array update patterns
* Derived state handling
* UI synchronization logic

---

# Requirements

## 1. Render Dynamic Checkbox List

Display a list of items with checkboxes.

Each item should contain:

* id
* label/name
* checked state

The list should be rendered dynamically from an array.

---

## 2. Individual Checkbox Selection

Users should be able to:

* select an item
* unselect an item

Checkbox state should update correctly in the UI.

---

## 3. Select All Functionality

Provide a “Select All” button or checkbox.

Requirements:

* Selecting it should check all items.
* Unselecting it should clear all selections.
* The control should automatically reflect the current selection state.

---

## 4. Selected Count

Display:

* total number of selected items

Example:

```txt id="d4m8qx"
Selected: 3
```

---

## 5. Display Selected Item Names

Show the names of all selected items dynamically.

Example:

```txt id="r7k2pv"
Selected Items:
- Apple
- Mango
- Orange
```

---

## 6. Disable Select All

Disable the “Select All” action when:

* all items are already selected

The UI should update automatically based on selection state.

---

# Technical Expectations

* Use React functional components.
* Use TypeScript for typings.
* Use controlled checkboxes.
* Update arrays immutably.
* Avoid mutating original state directly.
* Compute derived values instead of storing unnecessary duplicate state.

Examples of derived values:

* all items selected
* selected items list
* selected count

---

# Optional Improvements

You may additionally implement:

* search/filter support
* indeterminate checkbox state
* grouped checkboxes
* reset selections
* reusable checkbox component
* localStorage persistence

---

# Evaluation Criteria

Your solution will be evaluated based on:

* Correctness
* State management
* Derived state handling
* Immutable updates
* TypeScript usage
* Code structure
* UI behavior
* Edge-case handling
