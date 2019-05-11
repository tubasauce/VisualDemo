import createAction from '../../utils/create-action';

export const set = createAction('Set UI State', 'key', 'object');
export const update = createAction('Update UI State', 'key', 'name', 'value');
export const merge = createAction('Merge UI State', 'key', 'object');
export const clear = createAction('Clear UI State', 'key');
export const toggle = createAction('Toggle UI State', 'key', 'name');
