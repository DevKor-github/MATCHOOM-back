import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { In, Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { User } from 'src/entities/user.entity';
import { RenewTokenResponseDto } from './dtos/renewToken.dto';
import { Tokens } from 'src/entities/token.entity';
import { Genre } from 'src/entities/genre.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tokens)
    private tokensRepository: Repository<Tokens>,
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
    private jwtService: JwtService,
  ) {}

  async register(registerRequestDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { name, userId, password, nickname, birthday, gender, genres, address } = registerRequestDto;

    const userIdCheck = await this.userRepository.findOne({ where: { userId } });
    if (userIdCheck) throw new ConflictException('이미 가입된 전화번호 입니다.');

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    if (!passwordRegex.test(password)) throw new UnauthorizedException('비밀번호는 최소 8자 이상이어야 하며, 영어, 숫자, 특수문자를 각각 최소 하나 이상 포함해야 합니다.');

    const hashedPassword = await hash(password, 10);

    const user = this.userRepository.create({
      name,
      userId,
      password: hashedPassword,
      nickname: nickname || name,
      birthday: birthday ? new Date(birthday) : null,
      gender: gender || null,
      address: address || null
    });

    if (genres && genres.length > 0) user.genres = await this.genreRepository.findBy({ id: In(genres)}); 
    else user.genres = [];

    await this.userRepository.save(user);
    
    const id = user.id;
    const accessToken = this.generateAccessToken(id);
    const refreshToken = await this.generateRefreshToken(id);

    return { id, nickname, accessToken, refreshToken };
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { userId, password } = loginRequestDto;

    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException("아이디 또는 비밀번호가 틀렸습니다.");

    const passwordCheck = await compare(password, user.password);
    if (!passwordCheck) throw new UnauthorizedException("아이디 또는 비밀번호가 틀렸습니다.");

    const id = user.id;
    const accessToken = this.generateAccessToken(id);
    const refreshToken = await this.generateRefreshToken(id);

    return { id, accessToken, refreshToken };
  }

  async logout(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException("존재하지 않는 유저입니다.");

    await this.tokensRepository.delete({ user: user });
  }

  async renewToken(id: number): Promise<RenewTokenResponseDto> {
    const newAccessToken = this.generateAccessToken(id);

    return { accessToken: newAccessToken };
  }

  generateAccessToken(id: number): string {
    const payload = { id };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    return accessToken;
  }

  async generateRefreshToken(id: number): Promise<string> {
    const payload = { id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    const user = await this.userRepository.findOne({ where: { id } });
    const token = this.tokensRepository.create({
      user,
      refreshToken,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    });

    await this.tokensRepository.save(token);

    return refreshToken;
  }
}
