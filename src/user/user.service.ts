import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findOrCreateByKakaoId(kakaoId: string, name: string) {
    let user = await this.userRepository.findOne({ where: { userId: kakaoId } });

    if (!user) {
      user = this.userRepository.create({
        userId: kakaoId,
        name: name,
        nickname: name
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}
