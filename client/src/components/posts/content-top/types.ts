import { IAuhtor } from "@models/IPost";

export interface IContentTop {
  onDelete: React.MouseEventHandler<any>;
  onEdit?: React.MouseEventHandler<any>;
  createdAt: Date;
  author: IAuhtor;
  type: "post" | "comment";
  addressee?: { id: number; author: IAuhtor } | null;
}

export interface IMenuProps {
  onDelete: React.MouseEventHandler<any>;
  onEdit?: React.MouseEventHandler<any>;
  type: "post" | "comment";
}
