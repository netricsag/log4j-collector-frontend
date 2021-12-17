import { Stack } from "@fluentui/react";
import Logo from "./Logo";
import Company from "./Logo.svg";
import GitHubLogo from "./GitHubLogo.svg";

export default function Head() {
  return (
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      style={{ height: "5vh" }}
    >
      <Stack.Item>
        <a href={"https://netrics.ch"} target={"_blank"}>
          <img src={Company} style={{ minHeight: "4vh", maxHeight: "4vh" }} />
        </a>
      </Stack.Item>

      <Stack.Item>
        <Logo />
      </Stack.Item>

      <Stack.Item style={{ width: 200 }}>
        <Stack horizontal horizontalAlign="end">
          <a
            href={"https://github.com/bluestoneag/log4j-collector-frontend"}
            target={"_blank"}
          >
            <img
              src={GitHubLogo}
              style={{ minHeight: "4vh", maxHeight: "4vh" }}
            />
          </a>
        </Stack>
      </Stack.Item>
    </Stack>
  );
}
