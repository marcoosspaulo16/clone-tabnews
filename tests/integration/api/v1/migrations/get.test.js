import database from "infra/database.js";

beforeAll(cleanDataBase);

async function cleanDataBase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  // console.log(responseBody);
  // console.log("Ambiente: ", process.env.NODE_ENV);
  // console.log("POSTGRES_DB: ", process.env.POSTGRES_DB);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
