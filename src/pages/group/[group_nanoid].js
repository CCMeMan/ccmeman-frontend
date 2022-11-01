import { useRouter } from "next/router";

import React, { useState } from "react";

// import "react-datepicker/dist/react-datepicker.css";
// import "src/styles/date-picker.module.css";

const GroupProfile = () => {
  const router = useRouter();
  const { group_nanoid } = router.query;
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <p>Group: {group_nanoid}</p>
    </>
  );
};

export default GroupProfile;
