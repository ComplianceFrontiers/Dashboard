import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Table, Button, Input } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
import ProfileModal from "./ProfileModal";

interface FormRecord {
  profile_id: string;
  email?: string;
  phone?: string;
  year?: string;
  Website?: boolean;
  App?: boolean;
  mpes?: boolean;
  Lombardy?: boolean;
  [key: string]: string | boolean | undefined;
}

const PersonalTab = () => {
  const [formData, setFormData] = useState<FormRecord[]>([]);
  const [continuationRecords, setContinuationRecords] = useState<FormRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, continuationResponse] = await Promise.all([
          axios.get("https://backend-chess-tau.vercel.app/get_forms2"),
          axios.get("https://backend-chess-tau.vercel.app/get_forms"),
        ]);
        setFormData(response.data);
        setContinuationRecords(continuationResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteProfile = async (profileId: string) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        const response = await axios.delete(
          "https://backend-chess-tau.vercel.app/delete_records_by_profile_ids",
          { data: { profile_ids: [profileId] } }
        );

        if (response.data.deleted_profiles.includes(profileId)) {
          setFormData((prev) => prev.filter((record) => record.profile_id !== profileId));
          setContinuationRecords((prev) => prev.filter((record) => record.profile_id !== profileId));
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

  const combinedData = [...formData, ...continuationRecords];
  const paginatedData = combinedData.slice(
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
    const updatedSelectedRows = new Set(selectedRows);
    paginatedData.forEach((record) => {
      if (selectAll) {
        updatedSelectedRows.delete(record.profile_id);
      } else {
        updatedSelectedRows.add(record.profile_id);
      }
    });
    setSelectedRows(updatedSelectedRows);
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  const handleExportToExcel = () => {
    const dataToExport = combinedData.filter((record) => selectedRows.has(record.profile_id));
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
    <><Card>
      <CardHeader>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Master List</h4>
          <Button
            color="primary"
            onClick={handleExportToExcel}
            disabled={selectedRows.size === 0}>
            Export to Excel
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Table bordered>
          <thead>
            <tr>
              <th>
                <Input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll} />
              </th>
              <th>Profile ID</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Year</th>
              <th>Tabs</th>
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
                    onChange={() => handleRowSelect(record.profile_id)} />
                </td>
                <td
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    setSelectedProfileId(record.profile_id);
                    setIsModalOpen(true);
                  }}>
                  {record.profile_id}
                </td>
                <td>{record.email || "N/A"}</td>
                <td>{record.phone || "N/A"}</td>
                <td>{record.year || "N/A"}</td>
                <td>
                  {record.Website && <span className="badge bg-primary">Website</span>}
                  {record.App && <span className="badge bg-primary">App</span>}
                </td>
                <td>
                  <FaTrashAlt
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => deleteProfile(record.profile_id)}
                    title="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <Button
            color="secondary"
            onClick={() => handlePagination("previous")}
            disabled={currentPage === 1}>
            Previous
          </Button>
          <span>
            Page {currentPage} of {Math.ceil(combinedData.length / itemsPerPage)}
          </span>
          <Button
            color="secondary"
            onClick={() => handlePagination("next")}
            disabled={currentPage === Math.ceil(combinedData.length / itemsPerPage)}>
            Next
          </Button>
        </div>
      </CardBody>
    </Card>
    <ProfileModal
      isOpen={isModalOpen}
      toggle={() => setIsModalOpen(!isModalOpen)}
      profileId={selectedProfileId}
    /></>
  );
};

export default PersonalTab;
