import database from "infra/database.js";

process.on("uncaughtException", function (err) {
  console.log(err);
});

async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({ chave: "Sao acima da media" });
}

export default status;
