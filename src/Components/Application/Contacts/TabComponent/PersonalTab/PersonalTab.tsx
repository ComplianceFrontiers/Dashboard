import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";

// Define the interface
interface FormRecord {
  profile_id: string;
  email: string;
  Website?: boolean; // Optional field
  App?: boolean; // Another optional field
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
  const [formData, setFormData] = useState<FormRecord[]>([]); // Typed state
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backend-chess-tau.vercel.app/get_forms2");
        const processedData = response.data.map((item: any) => flattenObject(item)); // Flatten data
        setFormData(processedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <h4>Fetched Form Data</h4>
      </CardHeader>
      <CardBody>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <Table bordered>
  <thead>
    <tr>
      {/* Static keys first, followed by other dynamic keys */}
      {['profile_id', 'email', 
        ...new Set(
          formData.flatMap((record) => Object.keys(record))
          .filter((key) => key !== 'profile_id' && key !== 'email')
        )
      ].map((key) => (
        <th key={key}>{key.replace(/_/g, " ").toUpperCase()}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    {formData.map((record, index) => (
      <tr key={index}>
        {['profile_id', 'email',
          ...new Set(
            formData.flatMap((record) => Object.keys(record))
            .filter((key) => key !== 'profile_id' && key !== 'email')
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
