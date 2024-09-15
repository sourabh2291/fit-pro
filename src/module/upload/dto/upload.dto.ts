import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @ApiProperty({
    description: 'JSON file to upload',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  file: any;
}
