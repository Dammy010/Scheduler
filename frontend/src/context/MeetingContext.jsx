import { createContext, useContext, useState } from "react";

const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  return (
    <MeetingContext.Provider
      value={{
        meetings,
        setMeetings,
        loading,
        setLoading,
        selectedMeeting,
        setSelectedMeeting,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => useContext(MeetingContext);
