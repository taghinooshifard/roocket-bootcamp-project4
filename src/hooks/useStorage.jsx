import React from 'react'
export const Storage = Object.freeze({
    UserName: 'UserName',
    Token: 'Token',
  })
function useStorage() {
  console.log('useStorage');
  return localStorage.getItem(Storage.Token)!=null
}

export default useStorage
