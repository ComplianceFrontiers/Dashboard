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
  }
  

interface ProfileModalProps1 {
  isOpen: boolean;
  toggle: () => void;
  profileId: string;
}

  const ProfileModal: React.FC<ProfileModalProps1> = ({ isOpen, toggle, profileId }) => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
  
    useEffect(() => {
      if (profileId) {
        const fetchProfileData = async () => {
          try {
            const response = await axios.get("https://backend-chess-tau.vercel.app/get_record_by_profile_id", {
              params: { profile_id: profileId }
            });
            setProfileData(response.data);
          } catch (error) {
            console.error("Error fetching profile data:", error);
          }
        };
  
        fetchProfileData();
      }
    }, [profileId]);
  
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
      <p><strong>Payment Status:</strong> {profileData.payment_status}</p>
      <p><strong>Device Name:</strong> {profileData.device_name}</p>
      <p><strong>Session ID:</strong> {profileData.session_id}</p>
      <p><strong>Year:</strong> {profileData.year}</p>
      <p><strong>Lombardy:</strong> {profileData.lombardy ? "Yes" : "No"}</p>
      
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