import { DetailsList, IGroup, SelectionMode, Stack } from "@fluentui/react";
import { useEffect, useState } from "react";

interface Props {
  vulnData: any[];
}

export const DataTable: React.FC<Props> = (props) => {
  const [groupState, setGroupState] = useState(new Array<IGroup>());
  const [itemToRenderState, setItemToRenderState] = useState(Array<any>());

  useEffect(() => {
    const itemsForRender = new Array<any>();
    const groups = new Array<IGroup>();
    const cleanServers = new Array<any>();

    props.vulnData.forEach((server) => {
      if (server.vulnerableFiles.length !== 0) {
        let index: number = 0;

        if (itemsForRender.length > 0) {
          index = itemsForRender.length;
        } else {
          index = itemsForRender.length;
        }
        server.vulnerableFiles.forEach((file: any) => {
          itemsForRender.push({ vulnerableFiles: file.fileName });
        });
        groups.push({
          key: server.serverName,
          name: server.serverName,
          level: 0,
          count: server.vulnerableFiles.length,
          startIndex: index,
          isCollapsed: true,
        });
      } else {
        cleanServers.push({ vulnerableFiles: server.serverName });
      }
    });

    groups.push({
      key: "clnServers",
      name: "Clean servers",
      level: 0,
      count: cleanServers.length,
      startIndex: itemsForRender.length,
      isCollapsed: true,
    });

    cleanServers.forEach((cs) => itemsForRender.push(cs));
    setGroupState(groups);
    setItemToRenderState(itemsForRender);
  }, [props.vulnData]);

  return (
    <Stack
      horizontalAlign="center"
      style={{ minWidth: "100%", backgroundColor: "white" }}
    >
      <DetailsList
        items={itemToRenderState}
        groups={groupState}
        groupProps={{ isAllGroupsCollapsed: true }}
        columns={[
          {
            key: "vulnerableFiles",
            name: "Vulnerable Files and Servers",
            fieldName: "vulnerableFiles",
            minWidth: 800,
            isResizable: true,
            isMultiline: true,
          },
        ]}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        selectionMode={SelectionMode.none}

        //checkButtonAriaLabel="select row"
        //checkButtonGroupAriaLabel="select section"
        //onRenderDetailsHeader={onRenderDetailsHeader}
      />
    </Stack>
  );
};
