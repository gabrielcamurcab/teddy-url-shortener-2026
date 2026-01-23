import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        // If there's an error (e.g., invalid token) or no user, just return null (or undefined)
        // instead of throwing an exception.
        if (err || !user) {
            return null;
        }
        return user;
    }
}
