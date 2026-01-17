// api/api.ts
export const getDashboardData = async () => {
  return Promise.resolve({
    user: { name: "Alex" },
    workoutsCompleted: 4,
    daysLeft: 45,
    visits: 18,
  });
};

export const getNotifications = async () => {
  return Promise.resolve([
    { id: 1, text: "Workout completed successfully 💪" },
    { id: 2, text: "Membership renewed 🎉" },
  ]);
};
