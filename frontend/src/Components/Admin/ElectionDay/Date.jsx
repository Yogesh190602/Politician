import { useState } from "react";

export default function nextElectionDate() {

  const [date, setDate] = useState("");

  const addDate = async () => {
    const res = await fetch("http://localhost:5000/admin/addElectionDate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ Date: date }),
    });
     await res.json();
    alert("Election date added successfully");
    setDate("");
  };

  return (
    <div>
      
        <div>
          <input
            type="date"
            placeholder="Enter Election Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={addDate }> Add Date</button>
        </div>
    </div>
  );
}
