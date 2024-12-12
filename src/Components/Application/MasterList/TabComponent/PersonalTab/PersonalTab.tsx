import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { FaSearch } from 'react-icons/fa';
import * as XLSX from "xlsx";

interface FormRecord {
  profile_id: string;
  email?: string;
  phone?: string;
  year?: string;
  tabs?: boolean;
  Website?: boolean;
  App?: boolean;
  [key: string]: string | boolean | undefined;
}

const PersonalTab = () => {
  const [formData, setFormData] = useState<FormRecord[]>([]);
  const [filteredData, setFilteredData] = useState<FormRecord[]>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchValues, setSearchValues] = useState<{ [key: string]: string }>({});
  const [searchVisibility, setSearchVisibility] = useState<{ [key: string]: boolean }>({
    profile_id: false,
    email: false,
    phone: false,
    year: false,
    tabs: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [tabFilter, setTabFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State for continuation records
  const [continuationRecords, setContinuationRecords] = useState<FormRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-chess-tau.vercel.app/get_forms2");
        setFormData(response.data);
        setFilteredData(response.data);
        setLoading(false);

        // Fetch continuation data
        const continuationResponse = await axios.get("https://backend-chess-tau.vercel.app/get_forms");
        setContinuationRecords(continuationResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const toggleSearchVisibility = (key: string) => {
    setSearchVisibility((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleTabFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTabFilter(value);

    if (value === "") {
      setFilteredData(formData);
    } else {
      const newFilteredData = formData.filter((record) => record[value as keyof FormRecord]);
      setFilteredData(newFilteredData);
    }
  };

  const exportSelectedToExcel = () => {
    const selectedData = filteredData.filter((record) => selectedRows.has(record.profile_id));
    if (selectedData.length === 0) {
      alert("No rows selected for export!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Data");
    XLSX.writeFile(workbook, "SelectedData.xlsx");
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(combinedData.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map((record) => record.profile_id)));
    }
    setSelectAll(!selectAll);
  };

  // Combine formData and continuationRecords into a single array
  const combinedData = [...formData, ...continuationRecords];
  const paginatedData = combinedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4>Fetched Form Data</h4>
          <Button color="success" onClick={exportSelectedToExcel}>
            Export to Excel
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <Table bordered>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    {["profile_id", "email", "phone", "year", "tabs"].map((key) => (
                      <th key={key}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span>{key.toUpperCase()}</span>
                          {key !== "tabs" && (
                            <Button
                              color="link"
                              size="sm"
                              onClick={() => toggleSearchVisibility(key)}
                            >
                              <FaSearch />
                            </Button>
                          )}
                        </div>
                        {key === "tabs" && (
                          <>
                            <Button color="primary" size="sm" onClick={toggleModal} style={{ marginTop: "8px" }}>
                              Filter Tabs
                            </Button>
                            <Modal isOpen={modalOpen} toggle={toggleModal}>
                              <ModalHeader toggle={toggleModal}>Select Filter</ModalHeader>
                              <ModalBody>
                                <Input
                                  type="select"
                                  value={tabFilter}
                                  onChange={handleTabFilterChange}
                                >
                                  <option value="">All</option>
                                  <option value="Website">Website</option>
                                  <option value="App">App</option>
                                </Input>
                              </ModalBody>
                              <ModalFooter>
                                <Button color="secondary" onClick={toggleModal}>
                                  Close
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </>
                        )}
                        {searchVisibility[key] && key !== "tabs" && (
                          <Input
                            type="text"
                            value={searchValues[key] || ""}
                            placeholder={`Search ${key}`}
                            onChange={(e) => handleSearchChange(key, e.target.value)}
                            style={{ marginTop: "8px" }}
                          />
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((record) => (
                    <tr key={record.profile_id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(record.profile_id)}
                          onChange={() => {
                            const newSelectedRows = new Set(selectedRows);
                            if (newSelectedRows.has(record.profile_id)) {
                              newSelectedRows.delete(record.profile_id);
                            } else {
                              newSelectedRows.add(record.profile_id);
                            }
                            setSelectedRows(newSelectedRows);
                          }}
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
                          ) : record.hasOwnProperty(key) ? (
                            typeof record[key] === "boolean" ? (record[key] ? "Yes" : "No") : record[key]
                          ) : (
                            "N/A"
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                color="secondary"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>
                Page {currentPage} of {Math.ceil(combinedData.length / itemsPerPage)}
              </span>
              <Button
                color="secondary"
                onClick={handleNext}
                disabled={currentPage === Math.ceil(combinedData.length / itemsPerPage)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default PersonalTab;
