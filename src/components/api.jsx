import axios from 'axios';

export const updateScore = async (username, score)  => {
    try {
        await axios.post('https://exploding-kitten-backend-oma1.onrender.com/leaderboard', {
            username: username,
            score: score,
        });
        console.log("Score updated successfully.");
    } catch (error) {
        console.error("Error updating score:", error);
    }
};
