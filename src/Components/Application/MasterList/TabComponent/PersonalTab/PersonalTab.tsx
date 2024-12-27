"use client"
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardBody, CardHeader, Table, Button, Input } from "reactstrap";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
import ProfileModal from "./ProfileModal";

interface FormRecord {
  profile_id: string;
  email?: string;
  phone?: string;
  Website?: boolean;
  App?: boolean;
  mpes?: boolean;
  Lombardy?: boolean;
  online?: boolean;
  Bear_Middletown_Chess_Tournament?: boolean;
  New_Jersey_Chess_Tournament?: boolean;
  New_Jersey_Masterclass?: boolean;
  WilmingtonChessCoaching?: boolean;
  chessclub?:boolean;
  Bear_Chess_Coaching?:boolean;

  [key: string]: string | boolean | undefined;
}


const PersonalTab = () => {
  const [formData, setFormData] = useState<FormRecord[]>([]);
  const [filteredData, setFilteredData] = useState<FormRecord[]>([]);
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const [searchVisibility, setSearchVisibility] = useState<Record<string, boolean>>({});

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-chess-tau.vercel.app/get_master_list");
        setFormData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredRecords = useMemo(() => {
    return formData.filter((record) => {
      return Object.entries(searchFilters).every(([key, value]) => {
        if (key === 'tabs' && value) {
          return record[value as keyof FormRecord] === true;
        }
        const recordValue = record[key as keyof FormRecord];
        return value === "" || (recordValue && recordValue.toString().toLowerCase().includes(value.toLowerCase()));
      });
    });
  }, [formData, searchFilters]);

  const handleSearchChange = (column: string, value: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [column]: value,
    }));
    setCurrentPage(1);
  };

  const deleteProfile = async (profileId: string) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        const response = await axios.delete(
          "https://backend-chess-tau.vercel.app/delete_records_by_profile_ids",
          { data: { profile_ids: [profileId] } }
        );

        if (response.data.deleted_profiles.includes(profileId)) {
          setFormData((prev) => prev.filter((record) => record.profile_id !== profileId));
          alert("Profile deleted successfully.");
        } else {
          alert(`Profile ID ${profileId} not found.`);
        }
      } catch (error) {
        console.error("Error deleting profile:", error);
        alert("Failed to delete profile.");
      }
    }
  };

  const paginatedData = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (direction: "next" | "previous") => {
    setCurrentPage((prev) =>
      direction === "next" ? prev + 1 : Math.max(prev - 1, 1)
    );
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
    } else {
      const allRowIds = filteredRecords.map((record) => record.profile_id);
      setSelectedRows(new Set(allRowIds));
    }
    setSelectAll(!selectAll);
  };
  
  

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };
  
  const toggleSearchInput = (column: string) => {
    setSearchVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const handleExportToExcel = () => {
    const dataToExport = formData.filter((record) => selectedRows.has(record.profile_id));
    if (dataToExport.length === 0) {
      alert("No records selected for export.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Records");
    XLSX.writeFile(workbook, "selected_records.xlsx");
  };

  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Master List</h4>
          <Button
            color="primary"
            onClick={handleExportToExcel}
            disabled={selectedRows.size === 0}
          >
            Export to Excel
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Table bordered>
          <thead>
            <tr>
              <th>
                <Input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              {["profile_id", "email", "phone"].map((column) => (
                <th key={column}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <span style={{ marginRight: "10px" }}>
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </span>
                    <FaSearch
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      onClick={() => toggleSearchInput(column)}
                    />
                  </div>
                  {searchVisibility[column] && (
                    <Input
                      type="text"
                      placeholder={`${column}`}
                      onChange={(e) => handleSearchChange(column, e.target.value)}
                      style={{ width: "100%", height: "10%", padding: "0px 0px" }}
                    />
                  )}
                </th>
              ))}
              <th>
  Tabs
  <div style={{ marginTop: "5px" }}>
    <select
      onChange={(e) => handleSearchChange("tabs", e.target.value)}
      style={{ width: "100%" }}
    >
      <option value="">All</option>
      <option value="Website">Website</option>
      <option value="App">App</option>
      <option value="mpes">Mpes</option>
      <option value="lombardy">Lombardy</option>
      <option value="jcc">JCC</option>
      <option value="online">Online</option>
      <option value="Bear_Middletown_Chess_Tournament">Bear/Middletown Chess Tournament</option>
      <option value="New_Jersey_Chess_Tournament">New Jersey Chess Tournament</option>
      <option value="New_Jersey_Masterclass">New Jersey Masterclass</option>
      <option value="WilmingtonChessCoaching">Wilmington Chess Coaching</option>
      <option value="chessclub">Chess Club Tournament</option>
      <option value="Bear_Chess_Coaching">Bear Chess Coaching</option>


    </select>
  </div>
</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {paginatedData.map((record) => (
    <tr key={record.profile_id}>
      <td>
        <Input
          type="checkbox"
          checked={selectedRows.has(record.profile_id)}
          onChange={() => handleRowSelect(record.profile_id)}
        />
      </td>
      <td
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => {
          setSelectedProfileId(record.profile_id);
          setIsModalOpen(true);
        }}
      >
        {record.profile_id}
      </td>
      <td>{record.email || "N/A"}</td>
      <td>{record.phone || "N/A"}</td>
      <td>
  {record.Website && <span className="badge bg-primary">Website</span>}
  {record.App && <span className="badge bg-primary">App</span>}
  {record.mpes && <span className="badge bg-primary">Mpes</span>}
  {record.lombardy && <span className="badge bg-primary">Lombardy</span>}
  {record.jcc && <span className="badge bg-primary">JCC</span>}
  {record.online && <span className="badge bg-primary">Online</span>}
  {record.Bear_Middletown_Chess_Tournament && <span className="badge bg-primary">Bear/Middletown Chess Tournament</span>}
  {record.New_Jersey_Chess_Tournament && <span className="badge bg-primary">New Jersey Chess Tournament</span>}
  {record.New_Jersey_Masterclass && <span className="badge bg-primary">New Jersey Masterclass</span>}
  {record.WilmingtonChessCoaching && <span className="badge bg-primary">Wilmington Chess Coaching</span>}
  {record.chessclub && <span className="badge bg-primary"> Chess Club Tournament</span>}
  {record.Bear_Chess_Coaching && <span className="badge bg-primary"> Bear Chess Coaching</span>}

</td>

      <td>
        <FaTrashAlt
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => deleteProfile(record.profile_id)}
          title="Delete"
        />
      </td>
    </tr>
  ))}
</tbody>

        </Table>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <Button color="secondary" onClick={() => handlePagination("previous")} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>

            Page {currentPage} of {Math.ceil(filteredRecords.length / itemsPerPage)}
          </span>
          <Button
            color="secondary"
            onClick={() => handlePagination("next")}
            disabled={currentPage === Math.ceil(filteredRecords.length / itemsPerPage)}
          >
            Next
          </Button>
        </div>
      </CardBody>
      <ProfileModal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)} profileId={selectedProfileId} />
    </Card>
  );
};

export default PersonalTab;
