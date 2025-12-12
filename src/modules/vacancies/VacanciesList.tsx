import { VacancyCard } from "./VacancyCard";
import { Box, Text } from "@mantine/core";
import { useAppSelector } from "../../store/hooks";
import {
  selectItems,
  selectError,
  selectIsLoading,
} from "../../store/vacanciesSelectors";

export function VacanciesList() {
  const items = useAppSelector(selectItems);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  return (
    <Box mt={24} mih={250} miw={660}>
      {error && <Text>Ошибка загрузки: {error}</Text>}

      {!error && !isLoading && items.length === 0 && (
        <Text>Ничего не найдено</Text>
      )}

      {!error &&
        !isLoading &&
        items.length > 0 &&
        items.map((item) => (
          <VacancyCard vacancy={item} key={item.id} mode="list" />
        ))}
    </Box>
  );
}
