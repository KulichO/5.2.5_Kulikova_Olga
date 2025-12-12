import {
  PillsInput,
  Pill,
  Card,
  Button,
  Text,
  Select,
  Image,
  Group,
  Stack,
} from "@mantine/core";
import PlusIcon from "../../assets/plus.svg";
import PinIcon from "../../assets/map-pin.svg";
import SelectIcon from "../../assets/selector.svg";
import { addSkill, removeSkill, setCity } from "../../store/vacanciesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import { selectSkills, selectCity } from "../../store/vacanciesSelectors";

export function FiltersBlock() {
  const dispatch = useAppDispatch();

  const skills = useAppSelector(selectSkills);
  const city = useAppSelector(selectCity);

  const [localSkill, setLocalSkill] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(addSkill(localSkill));
      setLocalSkill("");
    }
  };
  const handleClick = () => {
    dispatch(addSkill(localSkill));
    setLocalSkill("");
  };

  const cities = [
    { value: "", label: "Все города" },
    { value: "1", label: "Москва" },
    { value: "2", label: "Санкт-Петербург" },
  ];

  return (
    <Stack gap="xs" mt={24}>
      <Card w={320} p={24} radius="md">
        <Text pb={12} fz={14} fw={600}>
          Ключевые навыки
        </Text>

        <Group pb={12} gap="xs">
          <PillsInput w={220} radius="md">
            <PillsInput.Field
              placeholder="Навык"
              value={localSkill}
              onChange={(e) => setLocalSkill(e.target.value)}
              onKeyDown={handleKeyDown}
            ></PillsInput.Field>
          </PillsInput>

          <Button
            h={36}
            w={38}
            color="brand.1"
            radius="md"
            p={0}
            fw={500}
            style={{ opacity: 0.5 }}
            onClick={handleClick}
            aria-label="add-skill"
          >
            <Image src={PlusIcon} w={26} h={26} />
          </Button>
        </Group>
        <Pill.Group w={220}>
          {skills.map((skill) => (
            <Pill
              key={skill}
              withRemoveButton
              onRemove={() => dispatch(removeSkill(skill))}
              styles={{
                remove: {
                  color: "#0F0F1080",
                },
              }}
              removeButtonProps={{
                "aria-label": `remove-skill-${skill}`,
              }}
            >
              {skill}
            </Pill>
          ))}
        </Pill.Group>

        <Group></Group>
      </Card>

      <Card w={320} p={24} radius="md">
        <Select
          value={city ?? null}
          onChange={(value) => {
            if (!value) {
              dispatch(setCity(null));
            } else {
              dispatch(setCity(value));
            }
          }}
          placeholder="Все города"
          data={cities}
          styles={{
            dropdown: {
              border: "none",
              borderRadius: 8,
              padding: 8,
              boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.08)",
            },
            option: {
              padding: "12px 0",
              fontSize: 14,
              fontWeight: 400,
            },
          }}
          w={270}
          radius="md"
          leftSection={<Image src={PinIcon} w={16} h={16} />}
          rightSection={<Image src={SelectIcon} w={18} h={18} />}
        ></Select>
      </Card>
    </Stack>
  );
}
