// ProfileModal.tsx
import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import axios from "axios";

// Define the shape of the data we are fetching
interface ProfileData {
    profile_id: string;
    phone?: string;
    email?: string;
    child_name?: { first: string; last: string };
    parent_name?: { first: string; last: string };
    child_grade?: string;
    SchoolName?: string;  // Update this to match the camelCase field in the JSON
    requestFinancialAssistance?: boolean;
    group?: string; // New field
    level?: string; // New field
    payment_status?: string; // New field
    device_name?: string; // New field
    session_id?: string; // New field
    registered_inschool_courses?: Array<{ course_title: string, status: string, completed: number }>; // New field
    year?: number; // New field
    lombardy?: boolean; // New field
    onlinePurchase?:boolean;
    online?:boolean;
    stripe?:string;
    program?:string;
    category?:string;
    location?:string;
    USCF_Rating?:string;
    uscf_id?:string;
    uscf_expiration_date?:string;
    New_Jersey_Chess_Tournament?:boolean;
    New_Jersey_Masterclass?:boolean;
    Bear_Middletown_Chess_Tournament?:boolean;
    WilmingtonChessCoaching?:boolean;
    chess_club?:boolean;
    chess_club_middletown?:boolean;
    chess_club_cttcs?:boolean;
    section?:string;
    
Bear_Middletown_Chess_Coaching?:boolean;
    WhatsApp?: boolean;
    jcc_kp?:boolean;
    email_request?:boolean;
    
  }
  

  interface ProfileModalProps1 {
    isOpen: boolean;
    toggle: () => void;
    profileId?: string;
    profileData?: ProfileData;
  }
  
  const ProfileModal: React.FC<ProfileModalProps1> = ({
    isOpen,
    toggle,
    profileId,
    profileData: directProfileData,
  }) => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
  
    useEffect(() => {
      if (directProfileData) {
        // If profileData is passed directly, set it
        setProfileData(directProfileData);
      } else if (profileId) {
        // Otherwise, fetch profile data using the profileId
        const fetchProfileData = async () => {
          try {
            const response = await axios.get(
              "https://backend-chess-tau.vercel.app/masterlist_by_profile_id",
              {
                params: { profile_id: profileId },
              }
            );
            setProfileData(response.data);
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        };
  
        fetchProfileData();
      }
    }, [profileId, directProfileData]);
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Profile Details</ModalHeader>
        <ModalBody>
  {profileData ? (
    <div>
      <p><strong>Profile ID:</strong> {profileData.profile_id}</p>
      <p><strong>Parent's Name:</strong> {profileData.parent_name?.first} {profileData.parent_name?.last}</p>
      <p><strong>Child's Name:</strong> {profileData.child_name?.first} {profileData.child_name?.last}</p>
      <p><strong>Child Grade:</strong> {profileData.child_grade}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
      <p><strong>Phone:</strong> {profileData.phone}</p>
      <p><strong>School Name:</strong> {profileData.SchoolName}</p>
      <p><strong>Request Financial Assistance:</strong> {profileData.requestFinancialAssistance ? "Yes" : "No"}</p>
      <p><strong>Group:</strong> {profileData.group}</p>
      <p><strong>Level:</strong> {profileData.level}</p>
      <p><strong>Program:</strong> {profileData.program}</p>
      <p><strong>Payment Status:</strong> {profileData.payment_status}</p>
      <p><strong>Device Name:</strong> {profileData.device_name}</p>
      <p><strong>Session ID:</strong> {profileData.session_id}</p>
      <p><strong>Year:</strong> {profileData.year}</p>
      <p><strong>Lombardy:</strong> {profileData.lombardy ? "Yes" : "No"}</p>
      <p><strong>Online:</strong> {profileData.online ? "true" : "false"}</p>
      <p><strong>Online Purchase:</strong> {profileData.onlinePurchase ? "true" : "false"}</p>
      <p><strong>Purchased though:</strong> {profileData.stripe}</p>
      <div>
  <p><strong>Category:</strong> {profileData.category || "N/A"}</p>
  <p><strong>Section:</strong> {profileData.section || "N/A"}</p>
  <p><strong>USCF Rating:</strong> {profileData.USCF_Rating || "N/A"}</p>
  <p><strong>USCF ID:</strong> {profileData.uscf_id || "N/A"}</p>
  <p><strong>USCF Expiration Date:</strong> {profileData.uscf_expiration_date || "N/A"}</p>
  <p>
    <strong>New Jersey Chess Tournament:</strong> {profileData.New_Jersey_Chess_Tournament ? "Yes" : "No"}
  </p>
  <p>
    <strong>Wilmington Chess Coaching:</strong> {profileData.WilmingtonChessCoaching ? "Yes" : "No"}
  </p>
  <p>
    <strong>New Jersey Masterclass:</strong> {profileData.New_Jersey_Masterclass ? "Yes" : "No"}
  </p>
  <p>
    <strong>Bear/Middletown Chess Tournament:</strong> {profileData.Bear_Middletown_Chess_Tournament ? "Yes" : "No"}
  </p>
  <p>
    <strong>Bear Chess Coaching:</strong> {profileData.
Bear_Middletown_Chess_Coaching ? "Yes" : "No"}
  </p>
  <p>
    <strong>chess club:</strong> {profileData.chess_club ? "Yes" : "No"}
  </p>
  <p>
    <strong>CTTCS:</strong> {profileData.chess_club_cttcs ? "Yes" : "No"}
  </p>
  <p>
    <strong>Section:</strong> {profileData.section}
  </p>
  <p>
    <strong>Location:</strong> {profileData.location}
  </p>
  <p>
    <strong>WhatsApp:</strong> {profileData.WhatsApp ? "Yes" : "No"}
  </p>
  <p>
    <strong>JCC KP:</strong> {profileData.jcc_kp ? "Yes" : "No"}
  </p>
  <p>
    <strong>Chess Club Middletown:</strong> {profileData.chess_club_middletown ? "Yes" : "No"}
  </p>
  <p>
    <strong>Email Request:</strong> {profileData.email_request ? "Yes" : "No"}
  </p>
</div>

      
      {/* Display the courses */}
      {profileData.registered_inschool_courses && profileData.registered_inschool_courses.length > 0 && (
        <div>
          <h5>Registered Courses:</h5>
          <ul>
            {profileData.registered_inschool_courses.map((course, index) => (
              <li key={index}>
                <strong>{course.course_title}</strong> - {course.status} ({course.completed}% completed)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ) : (
    <p>Loading profile data...</p>
  )}
</ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  };
  export default ProfileModal