interface List {
  name: string;
  description: string;
  urls: string[];
  user: string;
  type: string;
  public: boolean;
  likes: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface Schedule {
  list: List;
  user: string;
  remindAt: string;
  days: string[];
  current: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface Submission {
  _id: string;
  link: string;
  list: string;
  score: number;
  reviewAgain: boolean;
  remark?: string;
  tag: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface Tag {
  _id: string;
  name: string;
  color: string;
  user: string;
}