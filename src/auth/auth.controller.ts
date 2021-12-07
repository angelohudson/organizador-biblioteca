import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './shared/auth.service';
import { LocalGuard } from './shared/local.guard';

@Controller("auth")
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }

    @UseGuards(LocalGuard)
    @Post("login")
    async login(@Body() login: any) {
        return this.authService.login(login);
    }
}