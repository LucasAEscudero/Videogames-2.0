import server from "./src/app";
import sequelize from "./src/db";
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  sequelize.sync({ alter: true });
  console.log(`Server running on port ${PORT}`);
});
