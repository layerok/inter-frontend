import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { css } from "@emotion/react";

type Skin = "success" | "danger" | "info" | "cyan";

export const Button = (
  props: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
    skin?: Skin;
  },
) => {
  const { children, skin = "info", ...rest } = props;
  return (
    <button css={rootStyles({ skin })} {...rest}>
      {children}
    </button>
  );
};

const rootStyles = ({ skin }: { skin: Skin }) => {
  //
  const backgroundColor = {
    info: "#5bc0de",
    danger: "#C83A2A",
    success: "#5cb85c",
    cyan: "#569099",
  }[skin];

  const hoverBackgroundColor = {
    info: "#31b0d5",
    danger: "#b33426",
    success: "rgb(68, 157, 68)",
    cyan: "#569099",
  }[skin];

  return css`
    color: white;
    background-color: ${backgroundColor};
    padding: 6px 12px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    :hover {
      background-color: ${hoverBackgroundColor};
    }
  `;
};
