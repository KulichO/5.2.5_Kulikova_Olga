import { SearchBar } from "../modules/vacancies";
import { FiltersBlock } from "../modules/vacancies";
import { VacanciesList } from "../modules/vacancies";
import { PaginationBlock } from "../modules/vacancies";
import { Header } from "../modules/header";
import { Box, Container, Divider, Grid } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { setSearch, setSkills, setCity } from "../store/vacanciesSlice";
import {
  selectSearch,
  selectCity,
  selectSkills,
} from "../store/vacanciesSelectors";

export function HomePage() {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectSearch);
  const city = useAppSelector(selectCity);
  const skills = useAppSelector(selectSkills);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const skillsQuery = searchParams.get("skills") || "";
  const cityQuery = searchParams.get("city") || "";

  useEffect(() => {
    if (!searchQuery && !cityQuery && !skillsQuery) return;
    if (searchQuery) {
      dispatch(setSearch(searchQuery));
    }

    if (cityQuery) {
      dispatch(setCity(cityQuery));
    }
    if (skillsQuery) {
      const skillsArr = skillsQuery.split(",").map((s) => s.trim());
      dispatch(setSkills(skillsArr));
    }
  }, [searchQuery, cityQuery, skillsQuery, dispatch]);

  useEffect(() => {
    const params: Record<string, string> = {};

    if (search) {
      params.search = search;
    }

    if (city) {
      params.city = city;
    }

    if (skills.length > 0) {
      params.skills = skills.join(",");
    }

    setSearchParams(params);
  }, [search, city, skills]);

  return (
    <>
      <Header />
      <Box
        bg={"#F6F6F7"}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container size="xl" p={0}>
          <SearchBar />
        </Container>

        <Divider color="#E6E6E6" size="xs" />

        <Container
          size="xl"
          p={0}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid gutter={24}>
            <Grid.Col span="content">
              <Box w={320}>
                <FiltersBlock />
              </Box>
            </Grid.Col>

            <Grid.Col span="auto">
              <VacanciesList />
            </Grid.Col>
          </Grid>
        </Container>
        <Box mt="auto" py={24}>
          <PaginationBlock />
        </Box>
      </Box>
    </>
  );
}
