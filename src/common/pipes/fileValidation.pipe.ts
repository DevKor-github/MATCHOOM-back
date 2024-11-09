import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { fromBuffer } from 'file-type';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor( private readonly allowedMimeTypes: string[] ) { }

  async transform(value: Express.Multer.File) {
    const { mime } = await fromBuffer(value.buffer);
    if (!mime || !this.allowedMimeTypes.includes(mime)) throw new BadRequestException(`파일 형식이 잘못 되었습니다.`);

    return value;
  }
}
