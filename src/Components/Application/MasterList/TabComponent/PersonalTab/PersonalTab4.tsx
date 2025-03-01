"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Table, Button, Input } from "reactstrap";
import {FaExternalLinkAlt, FaSearch, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
import ProfileModal from "./ProfileModal";

interface FormRecord {
  profile_id: string;
  parent_name?: { first: string; last: string };
  email?: string;
  online?: boolean;
  onlinePurchase?: boolean;
  phone?: string;
  program?:string;
  USCF_Rating?:string;
  location?:string;
  [key: string]: any;
}

const PersonalTab = () => {
  const [formData, setFormData] = useState<FormRecord[]>([]);
  const [filteredData, setFilteredData] = useState<FormRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);  // To control the modal visibility
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-chess-tau.vercel.app/get_forms");
        const data = response.data.filter((record: FormRecord) => record.online === true);
        setFormData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
   const deleteProfile = async (profileId: string) => {
      if (window.confirm("Are you sure you want to delete this profile?")) {
        try {
          // Send a list containing a single profile ID
          const response = await axios.delete(
            `https://backend-chess-tau.vercel.app/delete_records_by_profile_ids`, 
            { data: { profile_ids: [profileId] } }
          );
    
          // Handle the response appropriately
          if (response.data.deleted_profiles.includes(profileId)) {
            setFormData((prev) => prev.filter((record) => record.profile_id !== profileId));
            setFilteredData((prev) => prev.filter((record) => record.profile_id !== profileId));
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

  const handleSearch = (term: string, column: string | null) => {
    setSearchTerm(term);
    const lowercasedTerm = term.toLowerCase();
    const filtered = formData.filter((record) =>
      column
        ? record[column]?.toString().toLowerCase().includes(lowercasedTerm)
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
        "Profile ID": record.profile_id,
        "Parent's Name": `${record.parent_name?.first || ""} ${record.parent_name?.last || ""}`,
        Email: record.email,
        Phone: record.phone,
        Online: record.online ? "Yes" : "No",
        "Online Purchase": record.onlinePurchase ? "Yes" : "No",
        program:record.program,
        USCF_Rating:record.USCF_Rating
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
  const handleProfileClick = (profileId: string) => {
    setSelectedProfileId(profileId);  // Set the selected profile id
    setIsModalOpen(true);  // Open the modal
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Card>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4>Online Users List</h4>
          <Button color="primary" onClick={exportToExcel} disabled={selectedRows.size === 0}>
            Export to Excel
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        {loading ? (
          <p>Loading data...</p>
        ) : (
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
                        selectedRows.size > 0 && selectedRows.size === filteredData.length
                      }
                    />
                  </th>
                  <th>Sl.</th>
                  {["profile_id", "parent_name", "email", "onlinePurchase", "online", "phone","program"].map(
                    (column) => (
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
                            style={{ marginTop: "5px", padding: "0px 0px" }}
                          />
                        )}
                      </th>
                    )
                  )}
                  <th>Actions</th>
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
                    <td>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleProfileClick(record.profile_id);
                          }}
                          style={{
                            color: 'blue',  // Make the profile ID blue
                            textDecoration: 'underline', // Add underline to indicate clickability
                            cursor: 'pointer', // Change cursor to pointer on hover
                          }}
                        >
                          {record.profile_id}
                        </a>
                      </td>
                    <td>
                      {record.parent_name
                        ? `${record.parent_name.first || ""} ${record.parent_name.last || ""}`
                        : "N/A"}
                    </td>
                    <td>{record.email || "N/A"}</td>
                    <td>{record.onlinePurchase ? "Yes" : "No"}</td>
                    <td>{record.online ? "Yes" : "No"}</td>
                    <td>{record.phone || "N/A"}</td>
                    <td>{record.program || "N/A"}</td>
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
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <Button color="secondary" onClick={handlePrevious} disabled={currentPage === 1}>
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
      </CardBody>
<ProfileModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        profileId={selectedProfileId}
      />


    </Card>
  );
};

export default PersonalTab;
