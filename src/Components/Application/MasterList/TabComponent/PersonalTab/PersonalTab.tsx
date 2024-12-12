import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Table, Button, Input } from "reactstrap";
import axios from "axios";

interface FormRecord {
  profile_id: string;
  email?: string;
  phone?: string;
  year?: string;
  tabs?: boolean;
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
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-chess-tau.vercel.app/get_forms2");
        setFormData(response.data);

        const continuationResponse = await axios.get("https://backend-chess-tau.vercel.app/get_forms");
        setContinuationRecords(continuationResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const combinedData = [...formData, ...continuationRecords];
  const paginatedData = combinedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <Card>
      <CardHeader>
        <h4>Form Data with Tabs</h4>
      </CardHeader>
      <CardBody>
        <div style={{ overflowX: "auto" }}>
          <Table bordered>
            <thead>
              <tr>
                <th>Profile ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Year</th>
                <th>Tabs</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((record) => (
                <tr key={record.profile_id}>
                  <td>{record.profile_id}</td>
                  <td>{record.email || "N/A"}</td>
                  <td>{record.phone || "N/A"}</td>
                  <td>{record.year || "N/A"}</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
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
                      {record.mpes && (
                        <div style={{ padding: "5px 10px", backgroundColor: "#007bff", color: "white", borderRadius: "5px" }}>
                          MPES
                        </div>
                      )}
                      {record.lombardy && (
                        <div style={{ padding: "5px 10px", backgroundColor: "#28a745", color: "white", borderRadius: "5px" }}>
                          Lombardy
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <Button color="secondary" onClick={handlePrevious} disabled={currentPage === 1}>
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
      </CardBody>
    </Card>
  );
};

export default PersonalTab;
