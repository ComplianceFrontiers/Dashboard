import { Card, CardBody, CardHeader, Table } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCreate from "../../ContactSideBar/CategoryCreate"; // Import the CategoryCreate component

// Define the interface for the data
interface FormRecord {
  profile_id: string;
  email?: string; // Optional email field
  Website?: boolean;
  App?: boolean;
  [key: string]: any; // Allow additional fields
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

  return (
    <Card>
      <CardHeader>
        <h4>Fetched Form Data</h4>
        {/* Pass the filter function to CategoryCreate */}
        <CategoryCreate onEmailFilter={handleEmailFilter} />
      </CardHeader>
      <CardBody>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                {/* Static keys first, followed by other dynamic keys */}
                {["profile_id", "email",
                  ...new Set(
                    formData.flatMap((record) => Object.keys(record))
                    .filter((key) => key !== "profile_id" && key !== "email")
                  )
                ].map((key) => (
                  <th key={key}>{key.replace(/_/g, " ").toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, index) => (
                <tr key={index}>
                  {["profile_id", "email",
                    ...new Set(
                      formData.flatMap((record) => Object.keys(record))
                      .filter((key) => key !== "profile_id" && key !== "email")
                    )
                  ].map((key) => (
                    <td key={key}>
                      {record.hasOwnProperty(key)
                        ? typeof record[key] === "boolean"
                          ? record[key]
                            ? "Yes"
                            : "No"
                          : record[key]
                        : "N/A"}
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