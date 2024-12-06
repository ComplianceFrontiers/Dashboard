import { Card, CardBody, CardHeader, Table, Button } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCreate from "../../ContactSideBar/CategoryCreate"; // Import the CategoryCreate component
import * as XLSX from "xlsx"; // Import xlsx library

// Define the interface for the data
interface FormRecord {
  profile_id: string;
  email?: string;
  Website?: boolean;
  App?: boolean;
  phone?: string;
  year?: string;
  [key: string]: string | boolean | undefined; // Index signature for other dynamic properties
}

const flattenObject = (obj: any) => {
  const flattened: { [key: string]: any } = {};
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      flattened[key] = JSON.stringify(obj[key]); // Flatten nested objects into strings
    } else {
      flattened[key] = obj[key];
    }
  }
  return flattened;
};

const PersonalTab = () => {
  const [formData, setFormData] = useState<FormRecord[]>([]);
  const [filteredData, setFilteredData] = useState<FormRecord[]>([]); // State for filtered rows
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set()); // Tracks selected rows
  const [selectAll, setSelectAll] = useState(false); // State for "select all" checkbox

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-chess-tau.vercel.app/get_forms2");
        const processedData = response.data.map((item: any) => flattenObject(item));
        setFormData(processedData);
        setFilteredData(processedData); // Initialize filtered data with all data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Email Filter: Only show records with email
  const handleEmailFilter = () => {
    const filtered = formData.filter((record) => record.email && record.email.trim() !== "");
    setFilteredData(filtered);
  };

  // Toggle individual row selection
  const toggleRowSelection = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      newSelectedRows.delete(index);
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.size === filteredData.length); // Update "select all" checkbox state
  };

  // Toggle select all checkbox
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set()); // Deselect all rows
    } else {
      const allIndexes = new Set(filteredData.map((_, index) => index));
      setSelectedRows(allIndexes); // Select all rows
    }
    setSelectAll(!selectAll); // Toggle select all state
  };

  // Export selected rows to Excel
  const exportToExcel = () => {
    const selectedData = filteredData.filter((_, index) => selectedRows.has(index)); // Get selected records
    const formattedData = selectedData.map((record) => {
      // Format the data to a flat structure suitable for Excel
      const flatRecord: { [key: string]: any } = {};
      Object.keys(record).forEach((key) => {
        flatRecord[key] = record[key];
      });
      return flatRecord;
    });

    const ws = XLSX.utils.json_to_sheet(formattedData); // Convert JSON data to sheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Selected Records"); // Append the sheet to the workbook

    // Trigger the download
    XLSX.writeFile(wb, "selected_records.xlsx");
  };

  return (
    <Card>
      <CardHeader>
        <h4>Fetched Form Data</h4>
        {/* Pass the filter function to CategoryCreate */}
        <CategoryCreate onEmailFilter={handleEmailFilter} />
        <Button
          color="primary"
          style={{ float: "right" }}
          onClick={exportToExcel}
        >
          Export to Excel
        </Button>
      </CardHeader>
      <CardBody>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                </th>
                {/* Define the static columns you want to display */}
                {["profile_id", "email", "phone", "year", "tabs"].map((key) => (
                  <th key={key}>{key.replace(/_/g, " ").toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(index)}
                      onChange={() => toggleRowSelection(index)}
                    />
                  </td>
                  {["profile_id", "email", "phone", "year", "tabs"].map((key) => (
                    <td key={key}>
                      {key === "tabs" ? (
                        <div>
                          {record.Website && (
                            <div
                              style={{
                                display: "inline-block",
                                padding: "8px 16px",
                                backgroundColor: "#007bff",
                                color: "white",
                                borderRadius: "4px",
                                marginRight: "8px",
                                fontSize: "14px",
                                textAlign: "center",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Website
                            </div>
                          )}
                          {record.App && (
                            <div
                              style={{
                                display: "inline-block",
                                padding: "8px 16px",
                                backgroundColor: "#007bff",
                                color: "white",
                                borderRadius: "4px",
                                marginRight: "8px",
                                fontSize: "14px",
                                textAlign: "center",
                                whiteSpace: "nowrap",
                              }}
                            >
                              App
                            </div>
                          )}
                        </div>
                      ) : (
                        record.hasOwnProperty(key)
                          ? typeof record[key] === "boolean"
                            ? record[key]
                              ? "Yes"
                              : "No"
                            : record[key]
                          : "N/A"
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </CardBody>
    </Card>
  );
};

export default PersonalTab;
