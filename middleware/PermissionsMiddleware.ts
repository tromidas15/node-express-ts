export default function permissionMiddleware(
  module: number,
  permission: number
) {
  return function (req, res, next) {
    let aveilableModulePermissions = res.locals.currentUser.role.modules.find(
      (val) => {
        return val.module === module;
      }
    );

    if (aveilableModulePermissions?.permissions?.includes(permission)) {
      return next();
    }

    return res.status(401).send("Access Denied");
  };
}
