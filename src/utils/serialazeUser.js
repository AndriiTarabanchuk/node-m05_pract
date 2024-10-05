export const serilizeUser = (user) => {
  return {
    name: user.name,
    email: user.email,
    id: user_id,
    createAt: user.createAt,
    updateAt: user.updateAt,
    avatarUrl: user.avatarUrl,
  };
};
