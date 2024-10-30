import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { Genre } from 'src/entities/genre.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>
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

  async updateUserInfo(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['genres'] });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");

    const { nickname, birthday, gender, address, genres } = updateUserDto;

    user.nickname = nickname || user.name;
    user.birthday = birthday ? new Date(birthday) : null;
    user.gender = gender || null;
    user.address = address || null;
    
    if (genres && genres.length > 0) user.genres = await this.genreRepository.findBy({ id: In(genres) }); 
    else user.genres = [];

    await this.userRepository.save(user);
  }
  
}
