import { useRouter } from "next/router";

import React, { useState } from "react";
import { DateTimePicker } from "src/components/DateTimePicker.js";

// import "react-datepicker/dist/react-datepicker.css";
// import "src/styles/date-picker.module.css";

const Meeting = () => {
  const router = useRouter();
  const { group_suuid, meeting_suuid } = router.query;
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <p>
        Group: {group_suuid}, Meeting {meeting_suuid}
      </p>

      <DateTimePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </>
  );
};

export default Meeting;
