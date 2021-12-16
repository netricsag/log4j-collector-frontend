import { Stack } from "@fluentui/react";
import Logo from "./Logo";

export default function Head() {
  return (
    <div>
      <Stack
        horizontal
        horizontalAlign="space-around"
        verticalAlign="center"
        tokens={{ childrenGap: "m", padding: "m" }}
      >
        <Stack.Item align="start">
          <></>
        </Stack.Item>

        <Stack.Item align="center">
          <Logo />
        </Stack.Item>

        <Stack.Item align="end">
          <></>
        </Stack.Item>
      </Stack>
    </div>
  );
}
