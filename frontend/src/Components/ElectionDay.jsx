import { useState, useEffect } from "react";

const ElectionDay = () => {
  const [addElectionDay, setAddElectionDay] = useState({
    Date: "",
    Candidates: "",
    Votes: "",
    Winner: "",
  });

  const [elecData, setElecData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddElectionDay((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:5000/admin/editElection/${editId}`
      : "http://localhost:5000/admin/electionDay";

    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(addElectionDay),
    });

    const data = await response.json();
    console.log(data);

    setAddElectionDay({
      Date: "",
      Candidates: "",
      Votes: "",
      Winner: "",
    });
    setEditId(null);
    setIsEditing(false);
    fetchElectionData();
  };

  const fetchElectionData = async () => {
    const elecresponse = await fetch(
      "http://localhost:5000/admin/getElectionDay"
    );

    const data = await elecresponse.json();

    const sorted = data.getElecDay.sort(
      (a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt)
    )[0];

    setElecData([sorted]);
  };

  const handleEdit = (election) => {
    setAddElectionDay({
      Date: election.Date?.split("T")[0],
      Candidates: election.Candidates,
      Votes: election.Votes,
      Winner: election.Winner,
    });
    setEditId(election._id);
    setIsEditing(true);

  };

  useEffect(() => {
    fetchElectionData();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        {editId ? "Edit" : "Add"} Election
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <input
          type="date"
          name="Date"
          value={addElectionDay.Date}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="Candidates"
          placeholder="Candidates"
          value={addElectionDay.Candidates}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          name="Votes"
          placeholder="Votes"
          value={addElectionDay.Votes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="Winner"
          placeholder="Winner"
          value={addElectionDay.Winner}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setAddElectionDay({
                Date: "",
                Candidates: "",
                Votes: "",
                Winner: "",
              });
              setEditId(null);
              setIsEditing(false);
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </form>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold text-center mb-4">Election List</h3>

      {elecData.map((el) => (
        <div
          key={el._id}
          className="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm"
        >
          <p>
            <strong>Date:</strong> {new Date(el.Date).toLocaleDateString()}
          </p>
          <p>
            <strong>Candidates:</strong> {el.Candidates}
          </p>
          <p>
            <strong>Votes:</strong> {el.Votes}
          </p>
          <p>
            <strong>Winner:</strong> {el.Winner}
          </p>
          <button
            onClick={() => handleEdit(el)}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default ElectionDay;
