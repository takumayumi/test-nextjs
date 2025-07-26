import { Icon, Input, InputGroup } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSearchTerm } from "@/store/slices/filtersSlice";

export default function TitleSearch() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(
    (state: RootState) => state.filters.searchTerm
  );
  const [localTerm, setLocalTerm] = useState(searchTerm);

  const debouncedSetSearchTerm = debounce((value: string) => {
    dispatch(setSearchTerm(value));
  }, 300);

  useEffect(() => {
    debouncedSetSearchTerm(localTerm ?? "");

    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [localTerm]);

  useEffect(() => {
    setLocalTerm(searchTerm);
  }, [searchTerm]);

  return (
    <InputGroup
      endElement={
        <Icon>
          <FaSearch />
        </Icon>
      }
      flex="1"
    >
      <Input
        value={localTerm}
        onChange={(e) => setLocalTerm(e.target.value)}
        placeholder="Search here..."
        _placeholder={{ color: "black" }}
        bg="gray.200"
      />
    </InputGroup>
  );
}
