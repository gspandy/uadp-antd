/**
 * Created by haowl on 2017-01-19.
 */
import { Modal } from 'antd';

export function info(msg) {
  Modal.info({
    title: '提示',
    content: msg,
  });
}

export function success(msg) {
  Modal.success({
    title: '提示',
    content: msg,
  });
}

export function error(msg) {
  Modal.error({
    title: '提示',
    content: msg,
  });
}

export function warning(msg) {
  Modal.warning({
    title: '提示',
    content: msg,
  });
}
