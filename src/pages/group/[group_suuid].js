import { useRouter } from "next/router";

import React, { useState } from "react";

// import "react-datepicker/dist/react-datepicker.css";
// import "src/styles/date-picker.module.css";

const Meeting = () => {
  const router = useRouter();
  const { group_suuid } = router.query;
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <p>
        Group: {group_suuid}
      </p>

      
    </>
  );
};

export default Meeting;
