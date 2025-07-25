import { Icon, Input, InputGroup } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

export default function TitleSearch() {
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
        placeholder="Search here..."
        _placeholder={{ color: "black" }}
        bg="gray.200"
      />
    </InputGroup>
  );
}
