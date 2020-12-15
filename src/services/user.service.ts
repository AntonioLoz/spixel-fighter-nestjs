import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  public async getAll(): Promise<Array<User>> {
    return await this.repository.find();
  }

  public async getById(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }

  public async getByUsername(usernameIn: string): Promise<User> {
    return await this.repository.findOne({
      where: { username: usernameIn },
    });
  }

  public async getByEmail(emailIn: string): Promise<User> {
    return await this.repository.findOne({
      where: { email: emailIn },
    });
  }

  public async save(user: User) {
    user.password = await bcrypt.hash(user.password, 10);

    await this.repository.save(user);
  }

<<<<<<< HEAD
    public async save(user: User): Promise<User> {
=======
  public async removeById(id: number) {
    await this.repository.delete(id);
  }
>>>>>>> socketFeature

  public async update(id: number, user: User): Promise<User> {
    const toUpdate = await this.repository.findOne(id);

<<<<<<< HEAD
        return await this.repository.save<User>(user);
=======
    if (!toUpdate) {
      throw new NotFoundException('User not found with id: ' + id);
>>>>>>> socketFeature
    }

    toUpdate.username = user.username;
    toUpdate.firstname = user.firstname;
    toUpdate.lastname = user.lastname;
    toUpdate.birthday = user.birthday;
    toUpdate.email = user.email;
    toUpdate.password = await bcrypt.hash(user.password, 10);

    await toUpdate.save();
    return toUpdate;
  }
}
