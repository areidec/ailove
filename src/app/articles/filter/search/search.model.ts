export interface TagInner {
  id: number;
  text: string;
}

export interface Tag {
  category: string;
  tags: TagInner[];
}
