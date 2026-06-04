const validCategories = ['Exam', 'Event', 'General'];
const validPriorities = ['Normal', 'Urgent'];

export function validateNoticeInput(data) {
  const errors = {};

  const title = typeof data.title === 'string' ? data.title.trim() : '';
  const body = typeof data.body === 'string' ? data.body.trim() : '';
  const category = data.category;
  const priority = data.priority;
  const image = typeof data.image === 'string' ? data.image.trim() : '';
  const publishDateValue = data.publishDate;
  const publishDate = new Date(publishDateValue);

  if (!title) {
    errors.title = 'Please enter a notice title.';
  }

  if (!body) {
    errors.body = 'Please provide notice details.';
  }

  if (!validCategories.includes(category)) {
    errors.category = 'Please select a valid notice category.';
  }

  if (!validPriorities.includes(priority)) {
    errors.priority = 'Please select a valid priority level.';
  }

  if (!publishDateValue || Number.isNaN(publishDate.getTime())) {
    errors.publishDate = 'Please choose a valid publishing date.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: {
      title,
      body,
      category,
      priority,
      publishDate,
      image: image || null,
    },
  };
}