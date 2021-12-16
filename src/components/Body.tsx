import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import Search from "./Search";
import { Stack } from "@fluentui/react";

function Body() {
  const [dataList, setDataList]: any[] = useState([]);
  const [originalList, setoriginalList]: any[] = useState([]);
  const apiAddress: string = process.env.REACT_APP_API_ADDRESS as string;

  useEffect(() => {
    fetch("http://" + apiAddress + "/api/v1/reports")
      .then((res) => {
        res.json().then((data) => {
          setoriginalList(data);
          setDataList(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSearch = (value: string | undefined) => {
    if (!value) {
      setDataList([...originalList]);
    } else {
      setDataList(
        originalList.filter((dataItem: any) => {
          const itemName = dataItem.serverName.toLowerCase();
          return itemName.includes(value);
        })
      );
    }
  };

  return (
    <Stack
      horizontalAlign="center"
      style={{ backgroundColor: "#F4F5F7" }}
      tokens={{ childrenGap: "l1", padding: "l2" }}
    >
      <Stack.Item>
        <Search onSearch={onSearch} />
      </Stack.Item>
      <Stack.Item>
        <DataTable vulnData={dataList} />
      </Stack.Item>
    </Stack>
  );
}

export default Body;
