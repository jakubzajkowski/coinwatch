import styled from "styled-components";
import Error from "../components/error.tsx";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  padding: 5rem 0.5rem 0 0.5rem;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Error
        code={404}
        title={t("notFound.title")}
        description={t("notFound.description")}
      />
    </Container>
  );
};

export default NotFound;
