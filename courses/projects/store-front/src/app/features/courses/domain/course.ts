type CourseEssentials = {
  name: string;
  description: string;
  price: number;
};

type CourseOptionals = {
  id: number;
  createdAt: Date;
};

export type CourseProperties = CourseEssentials & Partial<CourseOptionals>;

export class Course {
  readonly id: number | undefined;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly createdAt: Date | undefined;

  constructor(properties: CourseProperties) {
    if (properties.id) this.id = properties.id;

    this.name = properties.name;
    this.description = properties.description;
    this.price = properties.price;

    if (properties.createdAt) {
      this.createdAt = properties.createdAt;
    } else {
      this.createdAt = new Date();
    }
  }

  get properties(): CourseProperties {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      createdAt: this.createdAt,
    };
  }
}
