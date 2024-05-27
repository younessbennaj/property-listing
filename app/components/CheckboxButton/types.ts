import { ComponentProps } from "react";

export type CheckboxButtonProps = ComponentProps<"input"> & {
  label: string;
};
