import { z } from 'zod';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { router, protectedProcedure } from '../trpc';
import { s3, BUCKET_NAME } from '../../lib/s3';
import crypto from 'node:crypto';

export const filesRouter = router({
  getUploadUrl: protectedProcedure
    .input(
      z.object({
        fileName: z.string().min(1),
        contentType: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ext = input.fileName.split('.').pop();
      const fileKey = `users/${ctx.user.id}/${crypto.randomUUID()}.${ext}`;

      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileKey,
        ContentType: input.contentType,
      });

      const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

      return { uploadUrl, fileKey };
    }),

  getDownloadUrl: protectedProcedure
    .input(
      z.object({
        fileKey: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: input.fileKey,
      });

      const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

      return { downloadUrl };
    }),
});
