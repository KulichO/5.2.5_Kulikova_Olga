import {
  Group,
  Container,
  Text,
  Image,
  Box,
  UnstyledButton,
} from "@mantine/core";
import Icon from "../../assets/icon.svg";
import AboutIcon from "../../assets/aboutMe.svg";

export function Header() {
  return (
    <Container
      fluid
      p={0}
      bg="white"
      py={15}
      px={20}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <Group justify="space-between" align="center">
        <Group>
          <Image src={Icon} alt="logo" w={30} h={30} radius="xl" />
          <Text fz={16}>.FrontEnd</Text>
        </Group>

        <Group align="center" gap="xl">
          <UnstyledButton>
            <Group align="center" gap="xs">
              <Text fw={500} c="black">
                Вакансии FE
              </Text>
              <Box bg="brand.6" style={{ borderRadius: "50%" }} w={6} h={6} />
            </Group>
          </UnstyledButton>

          <UnstyledButton color="white">
            <Group align="center" gap="4">
              <Image src={AboutIcon} w={24} h={24} />
              <Text fw={500} c="#0F0F1080">
                Обо мне
              </Text>
            </Group>
          </UnstyledButton>
        </Group>

        <Group w={116} />
      </Group>
    </Container>
  );
}
