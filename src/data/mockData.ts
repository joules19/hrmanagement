export const dashboardData = {
  employeeCount: 150,
  departmentCount: 8,
  totalExpenses: 1500000,
  employees: [
    { id: 1, name: 'John Doe', department: 'IT' },
    { id: 2, name: 'Jane Smith', department: 'HR' },
    { id: 3, name: 'Mike Johnson', department: 'Finance' },
    { id: 4, name: 'Emily Brown', department: 'Marketing' },
    { id: 5, name: 'David Lee', department: 'Operations' },
  ],
  notifications: [
    { id: 1, message: 'New employee onboarding today' },
    { id: 2, message: 'Performance review deadline approaching' },
  ],
  chatAlerts: 2,
  departmentEmployees: {
    'IT': 40,
    'HR': 15,
    'Finance': 25,
    'Marketing': 30,
    'Operations': 40
  }
};

export const employeeData = [
  { id: 1, name: 'John Doe', position: 'Software Developer', department: 'IT', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'HR', email: 'jane.smith@example.com', phone: '234-567-8901' },
  // ... add more employee data as needed
];

export const chartData = {
  labels: Object.keys(dashboardData.departmentEmployees),
  datasets: [
    {
      data: Object.values(dashboardData.departmentEmployees),
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Department Distribution',
    },
  },
};
