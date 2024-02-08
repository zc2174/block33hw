const client = require('./client');
const util = require('util');


// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query("SELECT * FROM videoGames");
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    const {name, description, price, inStock, isPopular, imgUrl} = body;
    try {
        const {rows: [newVideoGame]} = await client.query(
            `INSERT INTO videoGames (name, description, price, inStock, isPopular, imgUrl) values ($1, $2, $3, $4, $5, $6)
            RETURNING *;`,
            [name, description, price, inStock, isPopular, imgUrl]
        )
        return newVideoGame;

    } catch (err){
        return err;
    }
    // LOGIC GOES HERE
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE
    const changeString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    if (changeString.length === 0){
        return;
      }

    try {
        const {rows:[videoGame]}= await client.query(`UPDATE videoGames SET ${changeString} WHERE id = ${id}
        RETURNING *`,
        Object.values(fields)
        );
        return videoGame;

    } catch (err){
        return err;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const {rows:[videoGame]} = client.query (`DELETE FROM videoGames WHERE id=$1 RETURNING *`,
        [id]);
        return videoGame;

    } catch (err) {
        return err;
    }
    // LOGIC GOES HERE
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}