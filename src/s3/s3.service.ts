import {Injectable} from '@nestjs/common'
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import {randomUUID} from 'node:crypto'
import {Multer} from 'multer'

@Injectable()
export class S3Service {
    private client = new S3Client({
        region: process.env.AWS_REGION!,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
        }
    })
    async uploadFile(file: Multer.File, folder: string) {
        const fileKey = `${folder}/${randomUUID()}-${file.originalname}`

        await this.client.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype
            })
        )

        return {
            key: fileKey,
            url: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${fileKey}`
        }
    }
}
