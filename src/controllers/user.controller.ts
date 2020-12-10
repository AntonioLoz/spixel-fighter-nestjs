import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { User } from "src/models/entities/user.entity";
import { UserService } from "src/services/user.service";

@Controller('users')
export class UserController {
    
    constructor(private service: UserService) {
    }

    @Get()
    findAll() {
        return this.service.getAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number){
        return this.service.getById(id);
    }

    @Get(':username')
    findByUsername(@Param('username') username: string) {
        return this.service.getByUsername(username);
    }

    @Get(':email')
    findByEmail(@Param('email') email: string) {
        return this.service.getByEmail(email);
    }

    @Post()
    create(@Body() user: User) {
        return this.service.save(user);
    }

    @Patch(':id')
    async editUser(@Body() user: User, @Param('id', ParseIntPipe) id: number) {
        const toEdit = await this.service.update(id, user);

        return toEdit;
    }

    @Delete(':id')
    removeById(@Param('id', ParseIntPipe) id: number) {
        this.service.removeById(id);
    }
}