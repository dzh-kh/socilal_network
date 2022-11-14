import React, { FC, useState } from "react";

import { PROFILE_PAGE_PATH } from "@consts/paths";
import { IOption } from "@models/IOption";
import IProfile from "@models/IProfile";
import SearchIcon from "@mui/icons-material/Search";
import { UserService } from "@services";
import { useNavigate } from "react-router-dom";
import { SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import "./search-bar.scss";

const SearchBar: FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<IOption | null>();
  const handleChange = (newValue: SingleValue<IOption>): void => {
    if (newValue) {
      newValue.label.length ? setQuery(newValue) : setQuery(null);
      navigate(`${PROFILE_PAGE_PATH}/${newValue.value}`);
      setQuery(null);
    }
  };

  const getOptions = (value: string) => {
    if (value.length > 0) {
      return UserService.getProfiles(value).then((res) =>
        res.map((el: IProfile) => {
          const fullName = el.firstName + " " + el.lastName;
          return { label: fullName, value: el.id };
        })
      );
    }
  };
  const noOptions = (e: any) => (e.inputValue ? "Nothing found" : null);
  const styles = {
    container: (styles: any) => ({ ...styles, width: "100%" }),
  };
  return (
    <div className="searchbar">
      <AsyncSelect
        classNamePrefix="react-async_searchbar"
        placeholder={"search user..."}
        noOptionsMessage={noOptions}
        onChange={handleChange}
        loadOptions={getOptions}
        isSearchable
        isClearable
        value={query}
        styles={styles}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchBar;
