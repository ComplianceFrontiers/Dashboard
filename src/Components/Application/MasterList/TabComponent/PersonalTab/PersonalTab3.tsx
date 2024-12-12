import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Table, Button, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa"; // Import search icon
import axios from "axios";
import * as XLSX from "xlsx";

interface FormRecord {
  profile_id: string;
  phone?: string;
  year?: string;
  parent_name?: { first: string; last: string };
  child_name?: { first: string; last: string };
  child_grade?: string;
  email?: string;
  RequestFinancialAssistance?: boolean;
  SchoolName?: string;
  group?: string;
  level?: string;
  program?: string;
  [key: string]: any;
}

const PersonalTab = () => {
  const [formData, setFormData] = useState<FormRecord[]>([]);
  const [filteredData, setFilteredData] = useState<FormRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null); // Track active search column
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-chess-tau.vercel.app/get_forms");
        const data = response.data;

        // Filter data for "Lombardy Elementary School"
        const lombardyData = data.filter((record: FormRecord) => record.SchoolName === "JCC_Chess_champs");

        setFormData(lombardyData); // Set filtered data to state
        setFilteredData(lombardyData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (term: string, column: string | null) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const filtered = formData.filter((record) =>
      column
        ? record[column]?.toString().toLowerCase().includes(lowercasedTerm) ||
          (column === "child_name" &&
            `${record.child_name?.first || ""} ${record.child_name?.last || ""}`
              .toLowerCase()
              .includes(lowercasedTerm))
        : true
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    const rowsToExport = filteredData.filter((record) =>
      selectedRows.has(record.profile_id)
    );
    const ws = XLSX.utils.json_to_sheet(
      rowsToExport.map((record) => ({
        "Sl.": record.profile_id,
        "Parent's Name": `${record.parent_name?.first || ""} ${record.parent_name?.last || ""}`,
        "Child's Name": `${record.child_name?.first || ""} ${record.child_name?.last || ""}`,
        Grade: record.child_grade,
        Email: record.email,
        Phone: record.phone,
        RequestFinancialAssistance: record.RequestFinancialAssistance ? "Yes" : "No",
        "School Name": record.SchoolName,
        group: record.group || "N/A",
        level: record.level || "N/A",
        Program: record.program || "N/A",
        Year: record.year || "N/A",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Selected Data");
    XLSX.writeFile(wb, "selected_data.xlsx");
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSelectRow = (profile_id: string) => {
    setSelectedRows((prev) => {
      const newSelectedRows = new Set(prev);
      if (newSelectedRows.has(profile_id)) {
        newSelectedRows.delete(profile_id);
      } else {
        newSelectedRows.add(profile_id);
      }
      return newSelectedRows;
    });
  };

  return (
    <Card>
      <CardHeader>
        <h4>JCC After School</h4>
        <Button
          color="primary"
          onClick={exportToExcel}
          disabled={selectedRows.size === 0} // Disable button if no rows are selected
        >
          Export to Excel
        </Button>
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
                <Input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked
                        ? new Set(filteredData.map((record) => record.profile_id))
                        : new Set()
                    )
                  }
                  checked={
                    selectedRows.size > 0 &&
                    selectedRows.size === filteredData.length
                  }
                />
              </th>
              <th>Sl.</th>
              {[
                "profile_id",
                "parent_name",
                "child_name",
                "child_grade",
                "email",
                "phone",
                "RequestFinancialAssistance",
                "SchoolName",
                "Group",
                "Level",
                "program",
                "year",
              ].map((column) => (
                <th key={column}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {column.replace(/_/g, " ")}{" "}
                    <FaSearch
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      onClick={() =>
                        setActiveColumn(column === activeColumn ? null : column)
                      }
                    />
                  </div>
                  {activeColumn === column && (
                    <Input
                      type="text"
                      placeholder={`Search ${column.replace(/_/g, " ")}...`}
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value, column)}
                      style={{ marginTop: "5px" }}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((record, index) => (
              <tr key={record.profile_id}>
                <td>
                  <Input
                    type="checkbox"
                    checked={selectedRows.has(record.profile_id)}
                    onChange={() => handleSelectRow(record.profile_id)}
                  />
                </td>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{record.profile_id}</td>
                <td>
                  {record.parent_name
                    ? `${record.parent_name.first || ""} ${record.parent_name.last || ""}`
                    : "N/A"}
                </td>
                <td>
                  {record.child_name
                    ? `${record.child_name.first || ""} ${record.child_name.last || ""}`
                    : "N/A"}
                </td>
                <td>{record.child_grade || "N/A"}</td>
                <td>{record.email || "N/A"}</td>
                <td>{record.phone || "N/A"}</td>
                <td>{record.RequestFinancialAssistance ? "Yes" : "No"}</td>
                <td>{record.SchoolName || "N/A"}</td>
                <td>{record.Group || "N/A"}</td>
                <td>{record.Level || "N/A"}</td>
                <td>{record.program || "N/A"}</td>
                <td>{record.year || "N/A"}</td>
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
          Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <Button
          color="secondary"
          onClick={handleNext}
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
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
