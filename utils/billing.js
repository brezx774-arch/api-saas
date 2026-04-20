export function upgradeUser(db, email, plan) {
  const user = db.users.find(u => u.email === email);
  if (user) {
    user.plan = plan;
  }
}
