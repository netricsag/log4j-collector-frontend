import { Text } from "@fluentui/react/lib/Text";
import { Icon } from "@fluentui/react/lib/Icon";

export default function Logo() {
  const MyIcon = () => <Icon iconName="BlockedSiteSolid12" />;

  return (
    <>
      <Text variant="xxLarge">Log4J Vulnerability Dashboard </Text>
    </>
  );
}
