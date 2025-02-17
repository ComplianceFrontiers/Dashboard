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
          "jcc_kp",
          "WilmingtonChessCoaching",
          "Bear_Middletown_Chess_Tournament",
          "New_Jersey_Chess_Tournament",
          "chess_club",
          "Bear_Middletown_Chess_Coaching",
        ];

        const counts: Record<string, number> = {};

        fieldsToCount.forEach((field) => {
          counts[field] = data.filter((user: any) => user[field] === true).length;
        });

        // Combine 'mpes' and 'lombardy' counts
        counts['mpes_lombardy'] = counts['mpes'] + counts['lombardy'];
        counts['community_outreach'] = counts['jcc'] + counts['jcc_kp'];
        counts['chess_club'] = counts['chess_club'];
        counts['Chess_Champs_Academy'] = counts['WilmingtonChessCoaching'] + counts['Bear_Middletown_Chess_Coaching'];
        counts['Chess_Tournament'] = counts['New_Jersey_Chess_Tournament'] + counts['Bear_Middletown_Chess_Tournament'];

        setFieldCounts(counts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fieldUrls: Record<string, string> = {
    Website: "/masterlist/website",
    mpes_lombardy: "/masterlist/mpes-lombardy",
    community_outreach: "/masterlist/community-outreach",
    Chess_Champs_Academy: "/masterlist/chess-champs-academy",
    Chess_Tournament: "/masterlist/chess-tournament",
    chess_club: "/masterlist/chess-club-tournament",
  };

  const buttonColors: Record<string, string> = {
    Website: "#6A5ACD", 
    mpes_lombardy: "#FF5733", 
    community_outreach: "#58D68D",
    Chess_Champs_Academy: "#33FF57",
    Chess_Tournament: "#5733FF",
    chess_club: "#FF33C4",
  };
  const tagUrls: Record<string, string> = {
    website: "/masterlist/website",
    MPES: "/masterlist/mpes",
    LOMBARDY: "/masterlist/lombardy",
    JCC: "/masterlist/jcc",
    "JCC KP": "/masterlist/JCC_KP",
    Wilmington: "/masterlist/Wilmington",
    Middletown: "/masterlist/Bear_Middletown_Chess_Coaching",
    "Middletown Tournament": "/masterlist/middletown",
    "Glen Mills": "/masterlist/GlenMills",
    "New Jersey": "/masterlist/newjersy",
    "Chess Club": "/masterlist/chess-club-tournament",
  };
  
  const fieldNames: Record<string, { title: string; tags: string[] }> = {
    Website: { title: "Website", tags: ["website"] },
    mpes_lombardy: { title: "Chess in School", tags: ["MPES", "LOMBARDY"] },
    community_outreach: { title: "Community Outreach", tags: ["JCC", "JCC KP"] },
    Chess_Champs_Academy: { title: "Chess Champs Academy", tags: ["Wilmington", "Middletown","Glen Mills"] },
    Chess_Tournament: { title: "Chess Tournament", tags: ["New Jersey","Middletown Tournament"] },
    chess_club: { title: "Chess Club", tags: ["Chess Club"] },
  };

  const handleRedirect = (field: string) => {
    const url = fieldUrls[field] || "/";
    router.push(url);
  };

  const handleTagRedirect = (tag: string) => {
    const url = tagUrls[tag] || "/";
    router.push(url);
  };
  
  const handleTotalRedirect = () => {
    router.push("/masterlist/master");
  };

  const totalCount = Object.values(fieldCounts).reduce((acc, count) => acc + count, 0);

  return (
    <>
      {/* Total Count Display */}
      {Object.entries(fieldCounts)
        .filter(([field]) => fieldNames[field]) // Only include the specified fields
        .map(([field, count], index) => (
          <tr key={index}>
            <td>
              <Input type="checkbox" />
            </td>
            <td>
              <div className="d-flex align-items-center gap-2">
                <div className="flex-grow-1">
                  <h6 className="f-w-500">{fieldNames[field]?.title || field}</h6>
                  {/* Display Tags */}
                  {fieldNames[field]?.tags?.length > 0 && (
                    <div style={{ marginTop: '5px', fontSize: '12px', color: '#555' }}>
                      - Tags:  
                      {fieldNames[field].tags.map((tag, idx) => (
                        <Button
                          key={idx}
                          onClick={() => handleTagRedirect(tag)}
                          style={{
                            backgroundColor: '#f1f1f1',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            fontSize: '12px',
                            color: '#333',
                            marginRight: '5px',
                          }}
                          size="sm"
                        >
                          {tag}
                        </Button>
                      ))} 
                    </div>
                  )}
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
