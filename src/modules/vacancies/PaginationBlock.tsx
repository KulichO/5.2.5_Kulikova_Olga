import { Pagination, Group } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setPage } from "../../store/vacanciesSlice";
import { selectPage, selectTotalPages } from "../../store/vacanciesSelectors";

export function PaginationBlock() {
  const page = useAppSelector(selectPage);
  const totalPages = useAppSelector(selectTotalPages);

  const dispatch = useAppDispatch();

  return (
    <Pagination.Root
      value={page}
      total={totalPages}
      radius="md"
      onChange={(value) => dispatch(setPage(value))}
    >
      <Group gap={5} justify="center">
        <Pagination.First aria-label="first-page" />
        <Pagination.Previous aria-label="prev-page" />
        <Pagination.Items />
        <Pagination.Next aria-label="next-page" />
        <Pagination.Last aria-label="last-page" />
      </Group>
    </Pagination.Root>
  );
}
