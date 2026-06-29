interface MenuItem {
  title: string;
  link: string;
  icon: string;
}

export class MenuService {
  private items: MenuItem[] = [
    {
      title: 'Dashboard',
      link: '/modules/dashboard',
      icon: 'dashboard'
    },
    {
      title: "Courses",
      link: "/modules/course",
      icon: "school"
    },
    {
      title: "Schedules",
      link: "/modules/schedule",
      icon: "schedule"
    },
    {
      title: 'Users',
      link: '/modules/user',
      icon: 'person'
    },
  ];

  getMenuItems(): MenuItem[] {
    return [...this.items];
  }
}
