import {
    Controller,
    Post,
    Req,
    Res,
    HttpStatus,
    BadRequestException,
    UseInterceptors,
    UploadedFile,
    Query,
    Get,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
  import { Request, Response } from 'express';
  import * as formidable from 'formidable';
import { UploadService } from '../services/upload.service';
import { FileUploadDto } from '../dto/upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
  
  @ApiTags('Uploads')
  @Controller('upload')
  export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
  
    @Post('json')
    @ApiOperation({ summary: 'Upload a JSON file to S3' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file,@Query('fileName') fileName: string ) {
      const fileUrl = await this.uploadService.uploadFile(file.buffer, fileName);
      return { url: fileUrl };
    }

    @Get('files')
    @ApiOperation({ summary: 'Get a list of all JSON files from S3' })
    async getFiles(@Res() res: Response) {
      const fileList = await this.uploadService.listFiles();
      return res.status(HttpStatus.OK).json({
        message: 'Files retrieved successfully',
        files: fileList,
      });
    }
  
  }
  