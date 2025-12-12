import { Card, Text, Button, Group, Box, Badge } from "@mantine/core";
import type { Vacancy } from "../../store/types";
import { Link } from "react-router-dom";

type VacancyCardProp = {
  vacancy: Vacancy;
  mode: "list" | "details";
};

function getCurrencySymbol(code: string | null): string {
  if (code === "RUR") return "₽";
  if (code === "USD") return "$";
  if (code === "EUR") return "€";
  return code ?? "";
}

function formatSalary(from: number | null, to: number | null): string {
  if (!from && !to) return "Зарплата не указана";

  if (from && to) {
    return `${from.toLocaleString()} – ${to.toLocaleString()}`;
  }

  if (from && !to) {
    return `${from.toLocaleString()}`;
  }

  if (!from && to) {
    return `${to.toLocaleString()}`;
  }

  return "Зарплата не указана";
}

function getScheduleBadge(name?: string) {
  if (!name) return null;

  const lower = name.toLowerCase();

  if (lower.includes("удал")) {
    return {
      label: "МОЖНО УДАЛЁННО",
      bg: "brand.6",
      text: "#FFFFFF",
    };
  }

  if (lower.includes("гиб")) {
    return {
      label: "ГИБРИД",
      bg: "black",
      text: "#FFFFFF",
    };
  }

  if (name === "Полный день") {
    return {
      label: "ОФИС",
      bg: "#0F0F101A",
      text: "#0F0F1080",
    };
  }

  return {
    label: name.toUpperCase(),
    bg: "black",
    text: "white",
  };
}

export function VacancyCard({ vacancy, mode }: VacancyCardProp) {
  const salary = formatSalary(
    vacancy.salary?.from ?? null,
    vacancy.salary?.to ?? null
  );
  const currencySymbol = getCurrencySymbol(vacancy.salary?.currency ?? null);
  const shouldShowCurrency = currencySymbol && salary !== "Зарплата не указана";
  const experience = vacancy.experience?.name ?? "Без опыта";
  const employer = vacancy.employer?.name;
  const city = vacancy.address?.city ?? vacancy.area?.name ?? "Город не указан";
  const jobName = vacancy.name;
  const scheduleInfo = getScheduleBadge(vacancy.schedule?.name);

  return (
    <Card mb={16} w={660} radius={12} pr={24} pl={24}>
      <Text c="brand.9" fz={20} fw={600} pb={8}>
        {jobName}
      </Text>
      <Group pb={16}>
        <Text fz={16} fw={400}>
          {salary} {shouldShowCurrency && ` ${currencySymbol}`}
        </Text>
        <Text fz={14} fw={400} c={"#0F0F1080"}>
          {experience}
        </Text>
      </Group>
      <Text fz={14} fw={400} c={"#0F0F1080"} pb={8}>
        {employer}
      </Text>
      <Box pb={4}>
        {scheduleInfo && (
          <Badge
            size="xs"
            radius="xs"
            fz={9}
            fw={700}
            styles={{
              root: {
                backgroundColor: scheduleInfo.bg,
                color: scheduleInfo.text,
              },
            }}
          >
            {scheduleInfo.label}
          </Badge>
        )}
      </Box>
      <Text fz={16} fw={400} pb={16}>
        {city}
      </Text>

      {mode === "list" ? (
        <Group>
          <Button
            w={170}
            radius="sm"
            color={"black"}
            fz={14}
            fw={400}
            component={Link}
            to={`/vacancies/${vacancy.id}`}
          >
            Смотреть вакансию
          </Button>
          <Button
            w={130}
            radius="sm"
            color={"#0F0F101A"}
            c={"black"}
            fz={14}
            fw={400}
            component="a"
            href={vacancy.alternate_url}
            target="_blank"
          >
            Откликнуться
          </Button>
        </Group>
      ) : (
        <Group>
          <Button
            w={190}
            radius="sm"
            color={"black"}
            fz={14}
            fw={400}
            component={Link}
            to={vacancy.alternate_url}
            target="_blank"
          >
            Откликнуться на hh.ru
          </Button>
        </Group>
      )}
    </Card>
  );
}
