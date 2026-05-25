import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Tenant check logic:
    // Ensure the requested resource's tenantId matches the user's tenantId.
    // For now, we expect the tenantId to be passed in the header or body.
    const resourceTenantId = request.headers['x-tenant-id'] || request.body?.tenantId;

    if (!user || !user.tenantId) {
      throw new UnauthorizedException('Tenant context missing from user');
    }

    if (user.role !== 'SUPER_ADMIN' && resourceTenantId && resourceTenantId !== user.tenantId) {
      throw new UnauthorizedException('Access denied for this tenant');
    }

    return true;
  }
}
