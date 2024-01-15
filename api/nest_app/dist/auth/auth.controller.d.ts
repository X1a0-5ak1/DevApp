import { AuthService } from './auth.service';
import { Msg } from './interfaces/auth.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(postData: {
        email: string;
        password: string;
    }): Promise<Msg>;
    login(postData: {
        email: string;
        password: string;
    }): Promise<any>;
}
