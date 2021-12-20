import { useState, useEffect } from "react";
import { DataTable } from "./DataTable";
import Search from "./Search";
import { Checkbox, Stack } from "@fluentui/react";
import { Button } from "./Button";

declare global {
  interface Window {
    _env_: any;
  }
}

function Body() {
  const [dataList, setDataList]: any[] = useState([]);
  const [originalList, setoriginalList]: any[] = useState([]);
  const [includeFiles, setIncludeFiles] = useState(false);
  const [searchValue, setSearchValue]: any = useState("");
  const apiUrl: string = window._env_.API_URL as string;

  const includeFilesCheckBox = () => {
    setIncludeFiles(!includeFiles);
  };

  useEffect(() => {
    fetch(apiUrl)
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

  useEffect(() => {
    onSearch(searchValue);
  }, [includeFiles]);

  const onSearch = (value: string | undefined) => {
    setSearchValue(value);
    if (!value) {
      setDataList([...originalList]);
    } else {
      setDataList(
        originalList.filter((dataItem: any) => {
          const itemName = dataItem.serverName.toLowerCase();

          if (includeFiles === false) {
            return itemName.includes(value);
          } else {
            var fileNames: any = [];

            dataItem.vulnerableFiles.forEach((file: any) => {
              fileNames = fileNames.concat(file.fileName.toLowerCase());
            });
            return (
              itemName.includes(value) ||
              fileNames.some((file: string) => file.includes(value))
            );
          }
        })
      );
    }
  };

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += ["serverName", "fileName"].join(";") + "\r\n";

    dataList.forEach((rowArray: any) => {
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
      style={{ backgroundColor: "#F4F5F7", minHeight: "92vh" }}
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
        <Stack
          horizontal
          horizontalAlign="space-between"
          style={{ minWidth: 855 }}
        >
          <Stack.Item>
            <Checkbox
              label="Include filenames in search"
              checked={includeFiles}
              onChange={includeFilesCheckBox}
            />
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
