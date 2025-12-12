import {
  Box,
  Button,
  TextInput,
  Group,
  Stack,
  Image,
  Title,
} from "@mantine/core";
import SearchIcon from "../../assets/search.svg";
import { setSearch } from "../../store/vacanciesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import { useEffect } from "react";
import { selectSearch } from "../../store/vacanciesSelectors";

export function SearchBar() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  const [localSearch, setLocalSearch] = useState("");
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setSearch(localSearch));
    }
  };

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <Box>
      <Group justify="center" mb="sm" h={114} gap={126}>
        <Stack gap={0}>
          <Title fw={700} fz={26}>
            Список вакансий
          </Title>
          <Title c="#0F0F1080" fw={500} fz={20}>
            по профессии Frontend-разработчик
          </Title>
        </Stack>

        <Group gap="sm">
          <TextInput
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            leftSection={<Image src={SearchIcon} h={16} w={16}></Image>}
            w={403}
            size="md"
            radius={8}
            placeholder="Должность или название компании"
            styles={{
              input: {
                backgroundColor: "#F6F6F7",
              },
            }}
          ></TextInput>
          <Button
            h={42}
            w={93}
            radius={8}
            fw={400}
            onClick={() => {
              dispatch(setSearch(localSearch));
            }}
          >
            Найти
          </Button>
        </Group>
      </Group>
    </Box>
  );
}
