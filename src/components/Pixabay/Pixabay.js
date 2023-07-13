

export const BASE_URL = 'https://pixabay.com/api/',
            API_KEY = '31318886-256b643484a1e22e1371688fd',
            SEARCH_PARAMS = new URLSearchParams({
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 12,
            });