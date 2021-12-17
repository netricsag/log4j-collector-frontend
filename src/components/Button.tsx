import React from "react";
import { PrimaryButton } from "@fluentui/react";

interface IButtonProperties {
  text: string;
  onClick: () => void;
}

export const Button = (props: IButtonProperties) => {
  return (
    <PrimaryButton
      text={props.text}
      onClick={(elem) => props.onClick()}
    ></PrimaryButton>
  );
};
