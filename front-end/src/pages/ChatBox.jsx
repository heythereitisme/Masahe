import React from 'react'
import { Link } from 'react-router-dom'

function ChatBox() {
  return (
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
    <div class="shrink-0">
    </div>
    <div>
      <div class="text-xl font-medium text-black">ChitChat</div>
      <p class="text-slate-500">You have a new message!</p>
    </div>
  </div>
  )
}

export default ChatBox