import { Header } from "../modules/header";
import { VacancyCard } from "../modules/vacancies";
import { Card, Box, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import {
  selectError,
  selectIsLoading,
  selectItems,
} from "../store/vacanciesSelectors";

export function VacancyPage() {
  const { id } = useParams();

  const items = useAppSelector(selectItems);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const vacancy = items.find((v) => v.id === id);

  if (error) {
    return (
      <Box mt={24}>
        <Text>Ошибка загрузки: {error}</Text>
      </Box>
    );
  }

  if (!isLoading && items.length === 0) {
    return (
      <Box mt={24}>
        <Text>Ничего не найдено</Text>
      </Box>
    );
  }

  if (!vacancy) {
    return "";
  }

  const requirement = vacancy.snippet?.requirement;
  const responsibility = vacancy.snippet?.responsibility;

  return (
    <>
      <Header />
      <Box
        bg={"#F6F6F7"}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        pt={24}
      >
        <VacancyCard vacancy={vacancy} mode="details" />

        <Card mb={16} w={660} radius={12} mt={8} p={24}>
          <Text fz={24} fw={600} mb={12}>
            Требования
          </Text>
          <Text fz={16} fw={400} mb={16}>
            {requirement}
          </Text>
          <Text fz={16} fw={600} mb={12}>
            Обязанности:
          </Text>
          <Text fz={16} fw={400}>
            {responsibility}
          </Text>
        </Card>
      </Box>
    </>
  );
}
