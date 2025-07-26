import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters } from "@/store/slices/filtersSlice";

export default function ClearFiltersButton() {
  const dispatch = useAppDispatch();

  return (
    <Button bg="orange.700" onClick={() => dispatch(clearFilters())}>
      Clear Filters
    </Button>
  );
}
