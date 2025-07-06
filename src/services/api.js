import { config } from '@/config';

export const apiService = {
  async getColors() {
    const response = await fetch(`${config.apiBaseUrl}/colors`);
    if (!response.ok) {
      throw new Error('Failed to fetch colors');
    }
    return response.json();
  },

  async submitForm(data) {
    const response = await fetch(`${config.apiBaseUrl}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to submit form');
    }

    return { success: true };
  },
};
