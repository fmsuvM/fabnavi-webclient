import { combineReducers } from 'redux';
import Debug from 'debug';

import player from './player';
import user from './user';
import manager from './manager';
import frame from './frame';
import errors from './errors';

const debug = Debug('fabnavi:reducer');

// 状態遷移を管理するもの一覧
// createStoreではReducerを一個しか登録出来ないから，combineReducersで複数登録するようにする
export default combineReducers({
  player,
  user,
  manager,
  frame,
  errors
});
