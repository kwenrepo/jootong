import crypto from 'crypto';

export const randomUUID = function(byte){
  return ((new Date().getTime()).toString(36).replace(".", "").substring(5, 7) + crypto.randomBytes(byte || 4).toString('hex')).toUpperCase();
} 