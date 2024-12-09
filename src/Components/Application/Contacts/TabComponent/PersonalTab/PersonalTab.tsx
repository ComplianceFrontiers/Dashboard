import { Card, CardBody, CardHeader,Modal, ModalHeader, Table, Button, Input, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

interface FormRecord {
  profile_id: string;
  email?: string;
  phone?: string;
  year?: string;
  tabs?: boolean;
  [key: string]: string | boolean | undefined;
}

const PersonalTab = () => {
  const [formData, setFormData] = useState<FormRecord[]>([]);
  const [filteredData, setFilteredData] = useState<FormRecord[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>({
    profile_id: "",
    email: "",
    phone: "",
    year: "",
    tabs: "",
  });
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const toggleModal = () => setModalOpen(!modalOpen); // Toggle modal open/close
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend-chess-tau.vercel.app/get_forms2"
        );
        setFormData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle column search
  const handleSearchChange = (key: string, value: string) => {
    const newSearchValues = { ...searchValues, [key]: value };
    setSearchValues(newSearchValues);

    const newFilteredData = formData.filter((record) =>
      Object.keys(newSearchValues).every((col) => {
        const searchValue = newSearchValues[col].toLowerCase();
        const cellValue = (record[col] || "").toString().toLowerCase();
        return cellValue.includes(searchValue);
      })
    );
    setFilteredData(newFilteredData);
  };

  const toggleRowSelection = (profile_id: string) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(profile_id)) {
      newSelectedRows.delete(profile_id);
    } else {
      newSelectedRows.add(profile_id);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.size === filteredData.length);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set()); // Deselect all rows
    } else {
      const allProfileIds = new Set(filteredData.map((record) => record.profile_id));
      setSelectedRows(allProfileIds); // Select all rows
    }
    setSelectAll(!selectAll);
  };

  // Export to Excel
  const exportToExcel = () => {
    const selectedData = filteredData.filter((record) =>
      selectedRows.has(record.profile_id)
    );
    if (selectedData.length === 0) {
      alert("No rows selected for export.");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(selectedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected Data");
    XLSX.writeFile(wb, "selected_data.xlsx");
  };

  return (
    <Card>
      <CardHeader>
        <h4>Fetched Form Data</h4>
        <Button color="primary" style={{ float: "right" }} onClick={exportToExcel}>
          Export Selected to Excel
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
                {["profile_id", "email", "phone", "year", "tabs"].map((key) => (
                  <th key={key}>
                    <div>{key.toUpperCase()}</div>
                    <Input
                      type="text"
                      value={searchValues[key] || ""}
                      placeholder={`Search ${key}`}
                      onChange={(e) => handleSearchChange(key, e.target.value)}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record) => (
                <tr key={record.profile_id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(record.profile_id)}
                      onChange={() => toggleRowSelection(record.profile_id)}
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
                      ): (
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

      {/* Modal for Filter */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Select Filter</ModalHeader>
        <ModalBody>
          <Input
            type="select"
            // value={tabFilter}
            // onChange={(e) => handleTabFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Website">Website</option>
            <option value="App">App</option>
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default PersonalTab;
