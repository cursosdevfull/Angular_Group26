type ScheduleEssentials = {
  courseId: string;
  dateStart: string;
  title: string;
  teacherName: string;
  summary: string;
  requeriments: string;
};

type ScheduleOptionals = {
  id: string;
  createdAt: string;
};

export type ScheduleProperties = ScheduleEssentials & Partial<ScheduleOptionals>;

export class Schedule {
  private readonly id: string | undefined;
  private readonly courseId: string;
  private readonly dateStart: string;
  private readonly title: string;
  private readonly teacherName: string;
  private readonly summary: string;
  private readonly requeriments: string;
  private readonly createdAt: string | undefined;

  constructor(properties: ScheduleProperties) {
    if (properties.id) this.id = properties.id;

    this.courseId = properties.courseId;
    this.dateStart = properties.dateStart;
    this.title = properties.title;
    this.teacherName = properties.teacherName;
    this.summary = properties.summary || '';
    this.requeriments = properties.requeriments || '';

    if (properties.createdAt) {
      this.createdAt = properties.createdAt!;
    } else {
      this.createdAt = new Date().toISOString();
    }
  }

  get properties(): ScheduleProperties {
    return {
      id: this.id,
      courseId: this.courseId,
      dateStart: this.dateStart,
      title: this.title,
      teacherName: this.teacherName,
      summary: this.summary,
      requeriments: this.requeriments,
      createdAt: this.createdAt,
    };
  }
}
