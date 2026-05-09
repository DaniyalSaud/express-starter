export const ROLES = {
  USER: { permissions: ["read:own", "write:own"] },
  ADMIN: { permissions: ["read:all", "write:all", "delete:all"] },
  MODERATOR: { permissions: ["read:all", "write:all", "delete:inappropriate"] },
} as const;

type RoleDef = { permissions: readonly string[] };

/**
 * Check whether the provided role has the required permission.
 * Accepts any string for `userRole` and returns false if the role isn't known.
 */
export const hasPermission = (
  userRole: string,
  requiredPermission: string,
): boolean => {
  const role = (ROLES as Record<string, RoleDef>)[userRole];
  if (!role) return false;
  return role.permissions.includes(requiredPermission);
};
