import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useRouter } from "next/navigation";

const TopSellingProductsTableBody = () => {
  const [fieldCounts, setFieldCounts] = useState<Record<string, number>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://backend-chess-tau.vercel.app/get_forms");
        const data = await response.json();

        // Initialize counts for each field
        const fieldsToCount = [
          "online",
          "WilmingtonChessCoaching",
          "Bear_Middletown_Chess_Tournament",
          "New_Jersey_Masterclass",
          "New_Jersey_Chess_Tournament",
          "chessclub",
          "Bear_Chess_Coaching",
        ];

        const counts: Record<string, number> = {};

        fieldsToCount.forEach((field) => {
          counts[field] = data.filter((user: any) => user[field] === true).length;
        });

        setFieldCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define URLs for each field
  const fieldUrls: Record<string, string> = {
    online: "/masterlist/online-users",
    WilmingtonChessCoaching: "/masterlist/wilmington",
    Bear_Middletown_Chess_Tournament: "/masterlist/middletown",
    New_Jersey_Masterclass: "/masterlist/newjersy1",
    New_Jersey_Chess_Tournament: "/masterlist/newjersy",
    chessclub: "/masterlist/chess-club-tournament",
    Bear_Chess_Coaching: "/masterlist/Bear_Chess_Coaching",
  };

  // Assign different colors for each field
  const buttonColors: Record<string, string> = {
    online: "#FF5733", // Orange
    WilmingtonChessCoaching: "#33FF57", // Green
    Bear_Middletown_Chess_Tournament: "#5733FF", // Blue
    New_Jersey_Masterclass: "#FFC300", // Yellow
    New_Jersey_Chess_Tournament: "#33C4FF", // Light Blue
    chessclub: "#FF33C4", // Pink
    Bear_Chess_Coaching: "#C70039", // Red
  };

  const handleRedirect = (field: string) => {
    const url = fieldUrls[field] || "/";
    router.push(url); // Redirect to the respective URL
  };

  return (
    <>
      {Object.entries(fieldCounts).map(([field, count], index) => (
        <tr key={index}>
          <td>
            <Input type="checkbox" />
          </td>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-grow-1">
                <h6 className="f-w-500">{field}</h6>
              </div>
            </div>
          </td>
          <td>
            <Button
              style={{
                backgroundColor: buttonColors[field] || "#FFFFFF",
                color: "#FFFFFF",
                border: "none",
              }}
              className="edge-btn f-13 w-100"
              onClick={() => handleRedirect(field)}
            >
              {count}
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TopSellingProductsTableBody;
