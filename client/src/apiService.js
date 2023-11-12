const API_BASE_URL = "http://localhost:3002";

// const user = async () => {
//   // try {
//   //   const response = await fetch(`${API_BASE_URL}/users`);
//   //   if (!response.ok) {
//   //     throw new Error("Network response was not ok");
//   //   }
//   //   return await response.json();
//   // } catch (error) {
//   //   console.error("Error fetching users:", error);
//   //   throw error;
//   // }

// };

// const createUser = async userData => {
//   // try {
//   //   const response = await fetch(`${API_BASE_URL}/users`, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json"
//   //     },
//   //     body: JSON.stringify(userData)
//   //   });
//   //   if (!response.ok) {
//   //     throw new Error("Network response was not ok");
//   //   }
//   //   return await response.json();
//   // } catch (error) {
//   //   console.error("Error creating user:", error);
//   //   throw error;
//   // }
// };

const fetchGamedata = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching game data:", error);
    throw error;
  }
};

const addGamedata = async gameData => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameData)
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding game data:", error);
    throw error;
  }
};

module.exports = {
  fetchGamedata,
  addGamedata
};
