export type FilterBarProps = {
  onFilterFavoritesChange?: (checked: boolean) => void;
  onReset?: () => void;
  onSearchChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
};
