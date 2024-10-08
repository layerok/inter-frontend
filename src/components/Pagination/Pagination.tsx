import { ChangeEventHandler, useState } from "react";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export const Pagination = ({
  page,
  onPageChange,
  max,
}: {
  page: number;
  onPageChange?: (page: number) => void;
  max: number;
}) => {
  const [draftPage, setDraftPage] = useState(page);
  const [editMode, setEditMode] = useState(false);
  const handleDecrement = () => {
    onPageChange?.(page - 1);
  };
  const handleIncrement = () => {
    onPageChange?.(page + 1);
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = +e.currentTarget.value;
    if (editMode) {
      setDraftPage(value);
    } else {
      onPageChange?.(clamp(draftPage, 1, max));
    }
  };
  const handleInputBlur = () => {
    setEditMode(false);
  };
  const handleInputFocus = () => {
    setEditMode(true);
  };
  const isDecrementButtonDisabled = page === 1;
  const isIncrementButtonDisabled = page === max;

  return (
    <div style={rootStyles}>
      <button disabled={isDecrementButtonDisabled} onClick={handleDecrement}>
        &lt;
      </button>
      <input
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        style={inputStyles}
        pattern={"/d*"}
        value={editMode ? draftPage : page}
        onChange={handleInputChange}
      />
      <button disabled={isIncrementButtonDisabled} onClick={handleIncrement}>
        &gt;
      </button>
    </div>
  );
};

const rootStyles = {
  display: "flex",
  gap: 5,
} as const;

const inputStyles = {
  width: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
} as const;
