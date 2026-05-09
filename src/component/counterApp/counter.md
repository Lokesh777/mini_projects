# Frontend Coding Assignment — Counter Application

Build a Counter Application using React and TypeScript.

The goal of this assignment is to evaluate:

* Component design
* State management
* Reducer patterns
* TypeScript usage
* UI interaction handling
* Undo/redo state flow

---

# Requirements

## Core Features

### 1. Counter Display

Display the current counter value on the screen.

---

### 2. Increment Functionality

Provide a button to increment the counter value.

---

### 3. Decrement Functionality

Provide a button to decrement the counter value.

Constraints:

* Counter value should not go below `0`.

---

### 4. Reset Functionality

Provide a button to reset the counter back to `0`.

---

### 5. Set Counter Value

Provide:

* an input field
* a button to apply the value

Users should be able to directly set the counter value from the input.

---

# Extension Tasks

## 6. Step Size Support

Add support for configurable step sizes.

Requirements:

* Allow increment/decrement by:

  * 1
  * 5
  * 10

The selected step size should affect increment and decrement operations.

---

## 7. Undo Functionality

Implement undo support.

Requirements:

* Users should be able to revert the previous counter action.
* Maintain action/state history.

---

## 8. Redo Functionality

Implement redo support.

Requirements:

* Users should be able to restore previously undone actions.
* Redo history should reset when a new action occurs after undo.

---

# Technical Expectations

* Use React functional components.
* Use TypeScript for typings.
* Use `useReducer` for state management.
* Ensure proper typing for:

  * state
  * actions
  * props
* Organize logic cleanly and maintain readable code.

---

# Optional Improvements

You may additionally implement:

* localStorage persistence
* keyboard shortcuts
* responsive UI
* animations
* reusable button/input components
* unit tests

---

# Evaluation Criteria

Your submission will be evaluated based on:

* Correctness
* State management approach
* TypeScript usage
* Reducer implementation
* Code quality
* Component structure
* Edge-case handling
* UI/UX behavior
