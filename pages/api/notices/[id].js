import { prisma } from '../../../lib/prisma';
import { validateNoticeInput } from '../../../lib/validateNotice';

function parseNoticeId(id) {
  const noticeId = Number(id);
  return Number.isInteger(noticeId) && noticeId > 0 ? noticeId : null;
}

export default async function handler(req, res) {
  const id = parseNoticeId(req.query.id);

  if (!id) {
    return res.status(400).json({
      message: 'Please provide a valid notice id.',
    });
  }

  try {
    if (req.method === 'GET') {
      const notice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!notice) {
        return res.status(404).json({
          message: 'Notice could not be found.',
        });
      }

      return res.status(200).json(notice);
    }

    if (req.method === 'PUT' || req.method === 'PATCH') {
      const validation = validateNoticeInput(req.body);

      if (!validation.isValid) {
        return res.status(400).json({
          message: 'Please check the highlighted fields.',
          errors: validation.errors,
        });
      }

      const existingNotice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!existingNotice) {
        return res.status(404).json({
          message: 'Notice could not be found.',
        });
      }

      const updatedNotice = await prisma.notice.update({
        where: { id },
        data: validation.values,
      });

      return res.status(200).json(updatedNotice);
    }

    if (req.method === 'DELETE') {
      const existingNotice = await prisma.notice.findUnique({
        where: { id },
      });

      if (!existingNotice) {
        return res.status(404).json({
          message: 'Notice could not be found.',
        });
      }

      await prisma.notice.delete({
        where: { id },
      });

      return res.status(204).end();
    }

    res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);

    return res.status(405).json({
      message: `${req.method} is not supported for this notice route.`,
    });
  } catch (error) {
    console.error('Notice API error:', error);

    return res.status(500).json({
      message: 'Something went wrong while processing this notice.',
    });
  }
}