import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { Genre } from 'src/entities/genre.entity';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    private s3Service: S3Service
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

  async updateUser(id: number, updateUserDto: UpdateUserDto, file?: Express.Multer.File) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['genres'] });
    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");

    const { nickname, birthday, gender, address, genres } = updateUserDto;

    user.nickname = nickname || user.name;
    user.birthday = birthday ? new Date(birthday) : null;
    user.gender = gender || null;
    user.address = address || null;
    
    if (genres && genres.length > 0) user.genres = await this.genreRepository.findBy({ id: In(genres) }); 
    else user.genres = [];

    if (file) {
      if (!user.profileImagePath.split('/')[3].startsWith('default')) await this.s3Service.deleteFile(user.profileImagePath);
      const extension = file.originalname.split('.').pop();
      const profileImagePath = await this.s3Service.uploadFile('user', extension, file);
      user.profileImagePath = profileImagePath;
    }

    await this.userRepository.save(user);

    return { message: "유저 정보 수정 성공" };
  }
  
  async deleteUser(id: number) {
    const user = this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException("존재하지 않는 사용자 입니다.");

    await this.userRepository.delete(id);

    return { message: "회원 삭제 성공" };
  }
}
