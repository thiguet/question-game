export const logout = () => localStorage.removeItem('currentUser');

export const currentUser = () => JSON.parse(localStorage.getItem('currentUser') || '{}');
