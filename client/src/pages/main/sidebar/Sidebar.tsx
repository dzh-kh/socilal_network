import React, { FC, useEffect, useState } from "react";

import { useTypedSelector } from "@hooks";
import { IOption } from "@models/IOption";
import { PostService } from "@services";
import { Button, Input, AsyncSelectUI } from "@ui";
import { useSearchParams } from "react-router-dom";

import PostAddForm from "../../../components/posts/post-add-form/PostAddForm";

import styles from "./sidebar.module.scss";

const Sidebar: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  return (
    <div className={styles.sidebar}>
      <SearchForm />
      {isAuth && <PostAddForm />}
    </div>
  );
};

export default Sidebar;

const SearchForm: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [memories, setMemories] = useState<string>("");
  const [tagOptions, setTagOptions] = useState<IOption[] | null>();
  useEffect(() => {
    const tags = searchParams.get("tags");
    const options = tags?.split(",").map((tag) => {
      return { label: tag, value: tag };
    });
    setTagOptions(options);
  }, [searchParams]);
  const handleSearch = () => {
    const tags = tagOptions && tagOptions.map((tag) => tag.label);
    const params: any =
      memories && tags
        ? { tags: tags.join(","), title: memories }
        : memories
        ? { title: memories }
        : tags
        ? { tags: tags.join(",") }
        : {};
    setSearchParams(params);
  };
  const handleChange = (newValue: { label: string; value: string }[]): void => {
    newValue.length ? setTagOptions(newValue) : setTagOptions(null);
  };
  const getOptions = (value: string) => {
    if (value.length > 0) {
      return PostService.getTags(value).then((res) =>
        res.map((el) => {
          return { label: el, value: el };
        })
      );
    }
  };
  const noOptions = (e: any) => (e.inputValue ? "Nothing found" : null);

  return (
    <div className={styles.searchForm}>
      <Input
        value={memories}
        onChange={(e) => setMemories(e.target.value)}
        type="text"
        placeholder="Search Memories"
      />
      <AsyncSelectUI
        noOptionsMessage={noOptions}
        placeholder="Search Tags"
        onChange={handleChange}
        loadOptions={getOptions}
        isMulti
        isSearchable
        isClearable
        value={tagOptions}
      />
      <Button onClick={handleSearch}>SEARCH</Button>
    </div>
  );
};
