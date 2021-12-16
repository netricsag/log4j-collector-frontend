import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import Search from "./Search";
import { Stack } from "@fluentui/react";

function Body() {
  const [dataList, setDataList]: any[] = useState([]);
  const apiAddress: string = process.env.REACT_APP_API_ADDRESS as string;

  useEffect(() => {
    (async () => {
      const res = await fetch("http://" + apiAddress + "/api/v1/reports");
      const json = await res.json();
      setDataList(json);
    })();
  });

  return (
    <Stack
      horizontalAlign="center"
      style={{ backgroundColor: "#F4F5F7" }}
      tokens={{ childrenGap: "l1", padding: "l2" }}
    >
      <Stack.Item>
        <Search />
      </Stack.Item>
      <Stack.Item>
        <DataTable vulnData={dataList} />
      </Stack.Item>
    </Stack>
  );
}

export default Body;
