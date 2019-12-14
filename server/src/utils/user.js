function excludePrivateFields(user) {
  const me = {
    ...user
  };

  delete me.password;
  delete me.passwordResetToken;
  delete me.passwordResetTokenExpiresAt;

  return me;
}

module.exports = {
  excludePrivateFields
};
