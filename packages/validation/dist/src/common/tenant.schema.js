"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantSchema = void 0;
const zod_1 = require("zod");
exports.TenantSchema = zod_1.z.object({
    tenantId: zod_1.z.string().uuid('Invalid tenant ID'),
});
