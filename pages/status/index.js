import useSWR from "swr";
import styled from "styled-components";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    // <>
    //   <h1>Status</h1>
    //   <DatabaseStatus />
    //   <UpdatedAt />
    // </>
    <Container>
      <Title>Status</Title>
      <InfoContainer>
        <DatabaseStatus />
      </InfoContainer>
      <UpdatedAt />
    </Container>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Ultima Atualizaçao: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Versao: {data.dependencies.database.version}</div>

        <div>
          Canexoes Abertas: {data.dependencies.database.opened_connections}
        </div>

        <div>
          Conexoes maximas: {data.dependencies.database.max_connections}
        </div>
      </>
    );

    return (
      <>
        <h2>Database</h2>

        <div>{databaseStatusInformation}</div>
      </>
    );
  }
}

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoContainer = styled.div`
  margin: 20px 0;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
`;
