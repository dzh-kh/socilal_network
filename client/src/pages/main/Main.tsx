import React, { Dispatch, FC, SetStateAction } from "react";

import { IOption } from "@models/IOption";
import { SelectUI } from "@ui";
import { useSearchParams } from "react-router-dom";

import Posts from "../../components/posts/Posts";

import styles from "./main.module.scss";
import Sidebar from "./sidebar/Sidebar";

const Main: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");
  return (
    <main className={styles.main}>
      <FilterPanel setSearchParams={setSearchParams} view={view} />
      <div className={styles.main__container}>
        <div className={styles.content}>
          <Posts isFullPost={view === "full" ? true : false} />
        </div>
        <Sidebar />
      </div>
    </main>
  );
};

export default Main;

const FILTERS = [
  { value: "createdAt_ASC", label: "date(asc)" },
  { value: "createdAt_DESC", label: "date(desc)" },
  { value: "popularity_DESC", label: "popularity(desc)" },
  { value: "popularity_ASC", label: "popularity(asc)" },
];
const VIEW = [
  { value: "preview", label: "preview" },
  { value: "full", label: "full" },
];

export interface IFilterPanelProps {
  setSearchParams: Dispatch<SetStateAction<any>>;
  view: string | null;
}
const FilterPanel: FC<IFilterPanelProps> = ({ setSearchParams, view }) => {
  let params = {};

  return (
    <div className={styles.filter_panel}>
      <div className={styles.filter_panel__list_wrapper}>
        <span>Sort by</span>
        <div>
          {" "}
          <SelectUI
            options={FILTERS}
            onChange={(value: IOption) =>
              setSearchParams({ ...params, sortBy: value.value })
            }
          />
        </div>
      </div>
      <div className={styles.filter_panel__list_wrapper}>
        <span>View</span>
        <div>
          {" "}
          <SelectUI
            value={VIEW.find((i) => i.value === view)}
            onChange={(value: IOption) =>
              setSearchParams({ ...params, view: value.value })
            }
            options={VIEW}
          />
        </div>
      </div>
    </div>
  );
};
