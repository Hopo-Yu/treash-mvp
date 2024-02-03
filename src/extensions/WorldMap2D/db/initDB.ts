const db = new Database('map2dWorld.db', { verbose: console.log });

export const initWorldMap2D = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS Map2DPositions (
            PositionID INTEGER PRIMARY KEY AUTOINCREMENT,
            NodeID INTEGER,
            Latitude FLOAT,
            Longitude FLOAT,
            FOREIGN KEY (NodeID) REFERENCES main.Node(NodeID) // 'main' refers to the main database
        );
    `);
};