export type Column = {
  label: string;
  field: string;
  fn?: (value: any) => string;
};

export type Metadata = Column[];
