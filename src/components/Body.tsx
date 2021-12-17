import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import Search from "./Search";
import { Stack } from "@fluentui/react";
import { Button } from "./Button";

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

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += ["serverName", "fileName"].join(";") + "\r\n";

    dataList.forEach((rowArray: any) => {
      let row = [];
      rowArray.vulnerableFiles.forEach((file: any) => {
        csvContent += [rowArray.serverName, file.fileName].join(";") + "\r\n";
      });
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.style.display = "none";
    link.setAttribute("download", "vulnFileList.csv");
    link.innerHTML = "Click Here to download";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <Stack
      horizontalAlign="center"
      style={{ backgroundColor: "#F4F5F7", height: "92vh" }}
      tokens={{ childrenGap: "l1", padding: "l2" }}
    >
      <Stack.Item>
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{ minWidth: 855 }}
        >
          <Stack.Item grow={3} style={{ paddingRight: "1vw" }}>
            <Search onSearch={onSearch} />
          </Stack.Item>
          <Stack.Item>
            <Button text="Download CSV" onClick={downloadCSV} />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item>
        <DataTable vulnData={dataList} />
      </Stack.Item>
    </Stack>
  );
}

export default Body;
