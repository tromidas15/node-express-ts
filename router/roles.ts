import { Router, Request, Response } from "express";
import RoleController from "../Controller/RoleController";
import { RoleModule } from "../libs/ModulesList";
import {
  ViewPermission,
  CreatePermission,
  DeletePermission,
  UpdatePermission,
} from "../libs/PermissionsList";
import { authMiddleware } from "../middleware/AuthMiddleware";
import permissionMiddleware from "../middleware/PermissionsMiddleware";

const router: Router = Router();

router.get(
  "/:id",
  [authMiddleware, permissionMiddleware(RoleModule, ViewPermission)],
  async (req: Request, resp: Response) => {
    return new RoleController(resp).get(req.params.id);
  }
);

router.get(
  "/",
  [authMiddleware, permissionMiddleware(RoleModule, ViewPermission)],
  async (req: Request, resp: Response) => {
    return new RoleController(resp).getAll(req);
  }
);

router.post(
  "/",
  [authMiddleware, permissionMiddleware(RoleModule, CreatePermission)],
  async (req: Request, resp: Response) => {
    return new RoleController(resp).create(req);
  }
);

router.patch(
  "/:id",
  [authMiddleware, permissionMiddleware(RoleModule, UpdatePermission)],
  async (req: Request, resp: Response) => {
    return new RoleController(resp).update(req);
  }
);

router.delete(
  "/:id",
  [authMiddleware, permissionMiddleware(RoleModule, DeletePermission)],
  async (req: Request, resp: Response) => {
    return new RoleController(resp).delete(req.params.id);
  }
);

module.exports = router;
