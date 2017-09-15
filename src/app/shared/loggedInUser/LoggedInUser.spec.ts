
import { Role, UserRole } from '../../edit-user/edituser.model';

export class LoggedInUserMock {
    PrincipalId: string;
    UserId: string;
    UserRole: Role;

    constructor() {
        this.PrincipalId = 'CD7407A1-B9CF-4A06-852B-9A30533A3655';
        this.UserRole = new Role('1', 'SuperAdmin', 'Super Admin', UserRole.SuperAdministrator);
    }

    getUser() {
        this.UserId = 'CD7407A1-B9CF-4A06-852B-9A30533A3655';
    }

    getRole() {
        return this.UserRole;
    }

    getUserId() {
        return this.UserId;
    }

    getUserPrinicpalId() {
        return this.getUserPrinicpalId;
    }
}