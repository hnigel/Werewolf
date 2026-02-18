let _nextId = 1;

export const defaultRoles = [
  { id: _nextId++, name: '狼人', count: 0, isPreset: true },
  { id: _nextId++, name: '狼王', count: 0, isPreset: true },
  { id: _nextId++, name: '女巫', count: 0, isPreset: true },
  { id: _nextId++, name: '預言家', count: 0, isPreset: true },
  { id: _nextId++, name: '獵人', count: 0, isPreset: true },
  { id: _nextId++, name: '守衛', count: 0, isPreset: true },
  { id: _nextId++, name: '白痴', count: 0, isPreset: true },
  { id: _nextId++, name: '丘比特', count: 0, isPreset: true },
];

export const NEXT_ROLE_ID_START = _nextId;
