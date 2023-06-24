import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [userQuery, setUserQuery] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleUserQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(event.target.value);
  };

  const handleUserQuerySubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/gpt3.5/answer", {
        query: userQuery,
      });

      const botResponse = response.data.answer;
      setBotResponse(botResponse);
    } catch (error) {
      console.error("Error:", error);
    }

    setUserQuery("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bob Iger-Inspired AI Slackbot</h1>
      <form onSubmit={handleUserQuerySubmit}>
        <input
          type="text"
          value={userQuery}
          onChange={handleUserQueryChange}
          className="border border-gray-300 rounded px-4 py-2 mr-2"
          placeholder="Enter your query..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
        >
          Submit
        </button>
      </form>

      <p className="mt-4">{botResponse}</p>
    </div>
  );
};

export default App;