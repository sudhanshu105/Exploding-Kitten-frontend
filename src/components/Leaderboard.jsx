import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  // Function to fetch initial leaderboard
  const fetchInitialLeaderboard = async () => {
    try {
      const response = await fetch('https://exploding-kitten-backend-oma1.onrender.com/leaderboard'); 
      const data = await response.json();
      setLeaderboard(data.slice(0, 10)); // Limit to top 10 entries
    } catch (error) {
      console.error('Failed to fetch initial leaderboard:', error);
    }
  };

  useEffect(() => {
    let ws;

    // Function to create a WebSocket connection and set up event listeners
    const connectWebSocket = () => {
      ws = new WebSocket('wss://exploding-kitten-backend-oma1.onrender.com/ws');

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (event) => {
        const updatedData = JSON.parse(event.data);
        setLeaderboard(updatedData.slice(0, 10)); // Limit to top 10 entries
      };

      ws.onclose = (event) => {
        console.log(`WebSocket closed: ${event.reason}`);
        // Attempt reconnection after a delay
        setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        ws.close(); // Close on error to trigger reconnect
      };
    };

    // Fetch initial leaderboard data
    fetchInitialLeaderboard();

    // Initialize WebSocket connection
    connectWebSocket();

    // Clean up the WebSocket when component unmounts
    return () => {
      if (ws) ws.close();
    };
  }, []); 

  return (
    <div>
      <h2>Leaderboard</h2>
      <h4> Rank| Name : Score</h4>
      {leaderboard.map((entry, index) => (
        <p key={index}>
          {index+1}| {entry.Member}: {entry.Score}
        </p>
      ))}
    </div>
  );
}

export default Leaderboard;
