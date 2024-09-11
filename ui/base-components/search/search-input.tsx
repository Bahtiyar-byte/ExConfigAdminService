import { useId } from 'react'
export interface SearchInputProps {
  onSearchChange: (searchTerm: string) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const fieldId = useId()
  return (
    <div className="search-field-wrapper">
      <input
        type="search"
        id={fieldId}
        name={fieldId}
        placeholder="Search"
        aria-label="Search"
        autoComplete="off"
        spellCheck="false"
        size={35}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  )
}
