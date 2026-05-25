import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    // Basic ping to ensure API is responding
    return this.health.check([
      () => this.http.pingCheck('api', 'http://localhost:3001/'),
    ]);
  }

  // Future: /health/db and /health/redis
}
