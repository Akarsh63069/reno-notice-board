import { prisma } from '../../../lib/prisma';
import { validateNoticeInput } from '../../../lib/validateNotice';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: 'desc' },
          { publishDate: 'desc' },
          { createdAt: 'desc' },
        ],
      });

      return res.status(200).json(notices);
    }

    if (req.method === 'POST') {
      const validation = validateNoticeInput(req.body);

      if (!validation.isValid) {
        return res.status(400).json({
          message: 'Please check the highlighted fields.',
          errors: validation.errors,
        });
      }

      const newNotice = await prisma.notice.create({
        data: validation.values,
      });

      return res.status(201).json(newNotice);
    }

    res.setHeader('Allow', ['GET', 'POST']);

    return res.status(405).json({
      message: `${req.method} is not supported for this notices route.`,
    });
  } catch (error) {
    console.error('Notices API error:', error);

    return res.status(500).json({
      message: 'Something went wrong while loading notices.',
    });
  }
}