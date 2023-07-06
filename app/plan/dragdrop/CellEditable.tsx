import React, { useState } from "react";

export function EditableTableCell({ value, onValueChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleChange = (e) => {
    setNewValue(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onValueChange(newValue);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  return isEditing ? (
    <input type="text" value={newValue} onChange={handleChange} onBlur={handleBlur} />
  ) : (
    <div onClick={handleClick}>{value}</div>
  );
}
