<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";
import Driver from "@/assets/driver.png";
import Phone from "@/assets/icons/phone-white.svg";
import Paperclip from "@/assets/icons/paperclip.svg";
import DoubleCheck from "@/assets/icons/double-check.svg";

// Types
interface Message {
  id: number;
  text: string;
  timestamp: string;
  sent: boolean;
  read: boolean;
  files?: File[];
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  location: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

// Reactive state
const activeTab = ref<"Personal" | "Groups">("Personal");
const selectedChatId = ref<number>(1);
const newMessage = ref<string>("");
const fileInput = ref<HTMLInputElement>();
const messagesContainer = ref<HTMLElement>();

// Mock data
const chats = ref<Chat[]>([
  {
    id: 1,
    name: "Trevor Vazovskiy",
    avatar: Driver,
    location: "Калифорния LB-32",
    lastMessage: "Проблема с таможней помогите",
    timestamp: "9:15",
    unreadCount: 3,
    messages: [
      {
        id: 1,
        text: "Привет! У меня проблема с таможней",
        timestamp: "20:25",
        sent: false,
        read: true,
      },
      {
        id: 2,
        text: "Что именно случилось?",
        timestamp: "20:28",
        sent: true,
        read: true,
      },
      {
        id: 3,
        text: "Lorem ipsum de lar",
        timestamp: "20:31",
        sent: true,
        read: true,
      },
    ],
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    avatar: Driver,
    location: "Техас TX-15",
    lastMessage: "Спасибо за помощь!",
    timestamp: "8:45",
    unreadCount: 1,
    messages: [
      {
        id: 1,
        text: "Спасибо за помощь!",
        timestamp: "8:45",
        sent: false,
        read: false,
      },
    ],
  },
  {
    id: 3,
    name: "John Smith",
    avatar: Driver,
    location: "Флорида FL-88",
    lastMessage: "Когда встречаемся?",
    timestamp: "7:30",
    unreadCount: 0,
    messages: [
      {
        id: 1,
        text: "Когда встречаемся?",
        timestamp: "7:30",
        sent: false,
        read: true,
      },
    ],
  },
]);

// Computed properties
const selectedChat = computed(() => chats.value.find((chat) => chat.id === selectedChatId.value));

const currentMessages = computed(() => selectedChat.value?.messages || []);

// Methods
const selectChat = (chatId: number) => {
  selectedChatId.value = chatId;
  // Mark messages as read
  const chat = chats.value.find((c) => c.id === chatId);
  if (chat) {
    chat.unreadCount = 0;
    chat.messages.forEach((msg) => {
      if (!msg.sent) {
        msg.read = true;
      }
    });
  }
  scrollToBottom();
};

const switchTab = (tab: "Personal" | "Groups") => {
  activeTab.value = tab;
};

const sendMessage = async () => {
  if (!newMessage.value.trim() && !fileInput.value?.files?.length) return;

  const chat = selectedChat.value;
  if (!chat) return;

  const now = new Date();
  const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;

  // Get selected files
  const files = fileInput.value?.files ? Array.from(fileInput.value.files) : [];

  const message: Message = {
    id: Date.now(),
    text: newMessage.value.trim(),
    timestamp,
    sent: true,
    read: false,
    files: files.length > 0 ? files : undefined,
  };

  // Add message to chat
  chat.messages.push(message);

  // Update last message in chat list
  if (newMessage.value.trim()) {
    chat.lastMessage = newMessage.value.trim();
  } else if (files.length > 0) {
    chat.lastMessage = `📎 ${files.length} файл(ов)`;
  }
  chat.timestamp = timestamp;

  // Clear input
  newMessage.value = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }

  await scrollToBottom();

  // Simulate message read after 2 seconds
  setTimeout(() => {
    message.read = true;
  }, 2000);
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const getFileIcon = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const docExtensions = ["pdf", "doc", "docx", "txt"];

  if (imageExtensions.includes(extension || "")) return "🖼️";
  if (docExtensions.includes(extension || "")) return "📄";
  return "📎";
};

// Initialize scroll position
nextTick(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="container">
    <h1>Чаты</h1>
    <div class="tab-control">
      <button :class="{ active: activeTab === 'Personal' }" @click="switchTab('Personal')">
        Personal
      </button>
      <button :class="{ active: activeTab === 'Groups' }" @click="switchTab('Groups')">
        Groups
      </button>
    </div>
    <div class="chat-container">
      <div class="chat-list">
        <div
          v-for="chat in chats"
          :key="chat.id"
          :class="`list-item ${selectedChatId === chat.id && 'active'}`"
          @click="selectChat(chat.id)"
        >
          <img :src="chat.avatar" alt="" />
          <div class="info">
            <span>{{ chat.name }}</span>
            <p>{{ chat.lastMessage }}</p>
          </div>
          <div class="numbers" v-if="selectedChatId !== chat.id">
            <p>{{ chat.timestamp }}</p>
            <span v-if="chat.unreadCount > 0">{{ chat.unreadCount }}</span>
          </div>
        </div>
      </div>

      <div class="open-chat" v-if="selectedChat">
        <div class="top">
          <img :src="selectedChat.avatar" alt="" />
          <div>
            <p>{{ selectedChat.name }}</p>
            <p>{{ selectedChat.location }}</p>
          </div>
          <Phone class="phone-icon" />
        </div>

        <div class="messages" ref="messagesContainer">
          <div
            v-for="message in currentMessages"
            :key="message.id"
            :class="`message ${message.sent ? 'sent' : 'received'}`"
          >
            <div class="message-content">
              <p v-if="message.text">{{ message.text }}</p>
              <div v-if="message.files && message.files.length > 0" class="files">
                <div v-for="file in message.files" :key="file.name" class="file-item">
                  <span class="file-icon">{{ getFileIcon(file.name) }}</span>
                  <div class="file-info">
                    <span class="file-name">{{ file.name }}</span>
                    <span class="file-size">{{ formatFileSize(file.size) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="message-meta">
              <DoubleCheck v-if="message.sent" :class="{ read: message.read }" />
              <span>{{ message.timestamp }}</span>
            </div>
          </div>
        </div>

        <div class="input">
          <Paperclip class="attach" @click="triggerFileInput" />
          <input
            type="text"
            placeholder="Сообщение"
            v-model="newMessage"
            @keypress="handleKeyPress"
          />
          <button class="send-button" @click="sendMessage">Отправить</button>
          <input ref="fileInput" type="file" multiple style="display: none" accept="*/*" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 48px;

  h1 {
    font-weight: 600;
    font-size: 28px;
  }

  .tab-control {
    background: #fff;
    width: fit-content;
    border-radius: 20px;
    margin-top: 30px;

    button {
      font-weight: 600;
      font-size: 18px;
      color: #5a32ea99;
      padding: 6px 40px;
      border-radius: 20px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &.active {
        background: #5a32ea;
        color: #fff;
      }
    }
  }

  .chat-container {
    background: #fff;
    padding: 24px 16px;
    border-radius: 40px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 46px;
    height: calc(100vh - 227px);
    max-height: calc(100vh - 227px);
    overflow-y: hidden;

    .chat-list {
      width: 40%;
      display: flex;
      flex-direction: column;
      gap: 14px;
      overflow-y: auto;

      .list-item {
        padding: 10px 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        border-radius: 41px;
        border: 1px solid #fff;

        &.active {
          border-color: #5a32ea;
          box-shadow: 0px 0px 5px 0px #5a83ed;

          .numbers {
            display: none;
          }
        }

        &:not(.active):hover {
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          border-color: #66666633;
        }

        img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
          object-fit: cover;
        }

        .info {
          flex: 1;

          span {
            font-weight: 600;
            font-size: 16px;
            margin-bottom: 2px;
            display: block;
          }

          p {
            font-weight: 400;
            font-size: 14px;
            margin: 0;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .numbers {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;

          p {
            font-weight: 400;
            font-size: 12px;
            margin: 0;
          }

          span {
            color: #fff;
            font-weight: 600;
            font-size: 14px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #5a32ea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    .open-chat {
      background: #f8f8f8;
      flex: 1;
      border-radius: 20px;
      display: flex;
      flex-direction: column;

      .top {
        background: #5a32eab2;
        border-radius: 20px;
        padding: 11px 29px;
        color: #fff;
        display: flex;
        flex-direction: row;
        gap: 15px;
        align-items: center;
        font-size: 18px;
        font-weight: 600;

        img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
          object-fit: cover;
        }

        div {
          flex: 1;

          p {
            margin: 0;

            &:last-child {
              font-size: 14px;
              font-weight: 400;
              opacity: 0.8;
            }
          }
        }

        .phone-icon {
          cursor: pointer;
          transition: opacity 0.2s;

          &:hover {
            opacity: 0.8;
          }
        }
      }

      .messages {
        flex: 1;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;

        .message {
          background: #8a6eef;
          position: relative;
          color: #fff;
          width: fit-content;
          max-width: 70%;
          padding: 10px 15px;
          font-size: 16px;
          font-weight: 500;
          border-radius: 22px;

          &.sent {
            margin-left: auto;
            border-bottom-right-radius: 0;
          }

          &.received {
            background: #e5e5ea;
            color: #000;
            border-bottom-left-radius: 0;
          }

          .message-content {
            p {
              margin: 0 0 5px 0;
            }

            .files {
              .file-item {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                margin-top: 5px;

                .file-icon {
                  font-size: 20px;
                }

                .file-info {
                  display: flex;
                  flex-direction: column;
                  gap: 2px;

                  .file-name {
                    font-size: 14px;
                    font-weight: 500;
                  }

                  .file-size {
                    font-size: 12px;
                    opacity: 0.8;
                  }
                }
              }
            }
          }

          .message-meta {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 4px;
            font-size: 10px;
            margin-top: 5px;
            opacity: 0.7;

            svg {
              width: 12px;
              height: 12px;

              &.read {
                opacity: 1;
                color: #4caf50;
              }
            }
          }
        }
      }

      .input {
        background: #fff;
        border-radius: 27px;
        margin: 0 18px 16px 18px;
        position: relative;
        display: flex;
        align-items: center;

        .attach {
          position: absolute;
          top: 50%;
          left: 22px;
          transform: translateY(-50%);
          cursor: pointer;
          z-index: 2;
          transition: opacity 0.2s;

          &:hover {
            opacity: 0.7;
          }
        }

        input[type="text"] {
          border: 1px solid #bcbcbc;
          flex: 1;
          padding: 14px 120px 14px 56px;
          outline: none !important;
          transition: 0.2s ease-in-out;
          border-radius: 27px;
          font-size: 16px;

          &:focus {
            border-color: #5a32ea;
          }
        }

        .send-button {
          position: absolute;
          right: 8px;
          background: #5a32ea;
          color: white;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;

          &:hover {
            background: #4a2bc4;
            transform: translateY(-1px);
          }

          &:active {
            transform: translateY(0);
          }
        }
      }
    }
  }
}
</style>
