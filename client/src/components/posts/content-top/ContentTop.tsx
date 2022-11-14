import React, { FC, useState, useRef, useEffect } from "react";

import { PROFILE_PAGE_PATH } from "@consts/paths";
import { useTypedSelector, useClickOutside } from "@hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReplyIcon from "@mui/icons-material/Reply";
import { getPastTime } from "@utils/functions";
import { Link } from "react-router-dom";

import styles from "./content-top.module.scss";
import { IContentTop, IMenuProps } from "./types";

const ContentTop: FC<IContentTop> = ({
  createdAt,
  author,
  onDelete,
  onEdit,
  type,
  addressee,
}: IContentTop) => {
  const { id, avatar, firstName, lastName } = author;
  const userId = useTypedSelector((state) => state.user.user?.id);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    setIsAuthor(userId === id);
  }, [userId]);

  const createdDate = getPastTime(+new Date(createdAt));
  const size = type === "comment" ? "30" : "48";

  return (
    <div className={styles.content_top}>
      <div className={styles.author_info}>
        <Link to={`${PROFILE_PAGE_PATH}/${id}`}>
          <img width={size} height={size} src={avatar} alt={avatar} />
          <div>
            <div className={styles.name}>
              <h4>{firstName + " " + lastName}</h4>
              {addressee && (
                <div className={styles.addressee_name}>
                  <ReplyIcon fontSize="small" />
                  {addressee?.author?.firstName}
                </div>
              )}
            </div>
            <h5 className={styles.created_date}>{createdDate}</h5>
          </div>
        </Link>
      </div>
      {isAuthor && <Menu type={type} onDelete={onDelete} onEdit={onEdit} />}
    </div>
  );
};

export default ContentTop;

const Menu: FC<IMenuProps> = ({ type, onEdit, onDelete }: IMenuProps) => {
  const menuRef = useRef<any>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  useClickOutside(menuRef, () => setMenuIsOpen(false), menuIsOpen);
  return (
    <div ref={menuRef} className={styles.menu_wrapper}>
      {" "}
      <MoreHorizIcon
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        fontSize="small"
      />
      {menuIsOpen && (
        <div className={styles.menu}>
          <span onClick={onDelete}>
            Delete <DeleteIcon />
          </span>
          {type !== "post" && (
            <span onClick={onEdit}>
              Update <EditIcon />
            </span>
          )}
        </div>
      )}
    </div>
  );
};
