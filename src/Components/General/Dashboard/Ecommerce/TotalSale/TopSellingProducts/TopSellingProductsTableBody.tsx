import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useRouter } from "next/navigation";

const TopSellingProductsTableBody = () => {
  const [fieldCounts, setFieldCounts] = useState<Record<string, number>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://backend-chess-tau.vercel.app/get_form_master_list");
        const data = await response.json();

        const fieldsToCount = [
          "Website",
          "mpes",
          "lombardy",
          "jcc",
          "online",
          "WilmingtonChessCoaching",
          "Bear_Middletown_Chess_Tournament",
          "New_Jersey_Masterclass",
          "New_Jersey_Chess_Tournament",
          "chess_club",
          "Bear_Middletown_Chess_Coaching",
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

  const fieldUrls: Record<string, string> = {
    Website: "/masterlist/website",
    mpes: "/masterlist/mpes",
    lombardy: "/masterlist/lombardy",
    jcc: "/masterlist/jcc",
    online: "/masterlist/online-users",
    WilmingtonChessCoaching: "/masterlist/wilmington",
    Bear_Middletown_Chess_Tournament: "/masterlist/middletown",
    New_Jersey_Masterclass: "/masterlist/newjersy1",
    New_Jersey_Chess_Tournament: "/masterlist/newjersy",
    chess_club: "/masterlist/chess-club-tournament",
    Bear_Middletown_Chess_Coaching: "/masterlist/Bear_Middletown_Chess_Coaching",
  };

  const buttonColors: Record<string, string> = {
    Website: "#6A5ACD",
    mpes: "#1F618D",
    lombardy: "#AF7AC5",
    jcc: "#58D68D",
    online: "#FF5733",
    WilmingtonChessCoaching: "#33FF57",
    Bear_Middletown_Chess_Tournament: "#5733FF",
    New_Jersey_Masterclass: "#FFC300",
    New_Jersey_Chess_Tournament: "#33C4FF",
    chess_club: "#FF33C4",
    Bear_Middletown_Chess_Coaching: "#C70039",
  };

  const handleRedirect = (field: string) => {
    const url = fieldUrls[field] || "/";
    router.push(url);
  };

  const handleTotalRedirect = () => {
    router.push("/masterlist/master");
  };

  const totalCount = Object.values(fieldCounts).reduce((acc, count) => acc + count, 0);

  return (
    <>
      {/* Total Count Display */}
    

      {/* Table Rows */}
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
        <tr>
        <td colSpan={3}>
          <Button
            color="primary"
            className="w-100"
            onClick={handleTotalRedirect}
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
          >
            Total Count: {totalCount}
          </Button>
        </td>
      </tr>
    </>
  );
};

export default TopSellingProductsTableBody;
