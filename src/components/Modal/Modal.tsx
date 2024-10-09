import type { PropsWithChildren } from "react";
import { FloatingPortal } from "@floating-ui/react";

export const Modal = ({
  onClose,
  children,
}: PropsWithChildren<{
  onClose?: () => void;
  hideCloseButton?: boolean;
  closeButtonPosition?: "inside" | "half-outside";
}>) => {
  return (
    <FloatingPortal>
      <div style={rootStyles} onClick={onClose}>
        <div
          style={containerStyles}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </FloatingPortal>
  );
};

const rootStyles = {
  position: "absolute",
  zIndex: 2000,
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
} as const;

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  position: "relative",
  background: "white",
  borderRadius: "3px",
  margin: "2vh 2vw",
} as const;
