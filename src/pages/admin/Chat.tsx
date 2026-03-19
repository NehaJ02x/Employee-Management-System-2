import { useState } from 'react';
import { Search, Phone, Video, Paperclip, Send, Hash } from 'lucide-react';
import { chatContacts, chatChannels, chatMessages } from '../../data/mockData';

export default function Chat() {
  const [activeContact, setActiveContact] = useState(chatContacts[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex" style={{ height: 'calc(100vh - 140px)' }}>
      {/* Sidebar */}
      <div className="w-72 border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Direct Messages</p>
            {chatContacts.map(contact => (
              <div
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-1 ${activeContact.id === contact.id ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
              >
                <div className="relative shrink-0">
                  <img src={contact.avatar} alt="" className="w-10 h-10 rounded-full" />
                  {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 truncate">{contact.name}</span>
                    <span className="text-[10px] text-gray-400">{contact.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <span className="bg-indigo-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shrink-0">{contact.unread}</span>
                )}
              </div>
            ))}
          </div>
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Team Channels</p>
            {chatChannels.map(ch => (
              <div key={ch.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer mb-1">
                <Hash size={16} className="text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700">{ch.name}</p>
                  <p className="text-xs text-gray-500 truncate">{ch.lastMessage}</p>
                </div>
                <span className="text-[10px] text-gray-400">{ch.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <img src={activeContact.avatar} alt="" className="w-9 h-9 rounded-full" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{activeContact.name}</p>
              <p className="text-xs text-green-600">{activeContact.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100"><Phone size={18} className="text-gray-500" /></button>
            <button className="p-2 rounded-lg hover:bg-gray-100"><Video size={18} className="text-gray-500" /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                msg.isSent ? 'bg-indigo-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${msg.isSent ? 'text-indigo-200' : 'text-gray-400'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="h-16 border-t border-gray-200 flex items-center gap-2 px-4 shrink-0">
          <button className="p-2 rounded-lg hover:bg-gray-100"><Paperclip size={18} className="text-gray-500" /></button>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700">
            <Send size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
