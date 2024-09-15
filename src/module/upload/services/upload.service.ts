import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UploadService {
  private readonly s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    const folder = 'workout-plan-json'
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Key: `${folder}/${fileName}`,
        Body: fileBuffer,
      })
      .promise();

      if (uploadResult.Location) {
        return uploadResult.Location
      } else {
        return 'File upload failed: No location returned from S3';
      }
    } catch (error) {
      console.error('File upload error:', error);
      return `File upload failed: ${error.message}`;
    
  }

  async listFiles(): Promise<{ fileName: string, url: string }[]> {
    const folder = 'workout-plan-json/';
    const params = {
      Bucket: this.configService.get('S3_BUCKET_NAME'),
      Prefix: folder, // Folder in which files are stored
    };

    const data = await this.s3.listObjectsV2(params).promise();

    if (!data.Contents) {
      return [];
    }

    // Generate URLs for the files
    const fileKeys = data.Contents.map((file) => {
      return {
        fileName: file.Key!,
        url: this.s3.getSignedUrl('getObject', {
          Bucket: this.configService.get('S3_BUCKET_NAME'),
          Key: file.Key!,
          Expires: 3600, // URL expiration time in seconds
        }),
      };
    });

    return fileKeys;
  }


}
