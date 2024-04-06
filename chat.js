import chatLog from './chatlog/log.js';
// ^ contains chatlog

// main chat-box
const messageBox = document.querySelector('.message-box');

// when 'enter' pressed, message registered
messageBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (messageBox.value.trim() !== '') {
      chatLog.push(messageBox.value);
      console.log(chatLog);

      renderChatLog();
    }

    messageBox.value = '';
  }
});

// renders HTML for every change done to chatLog
function renderChatLog() {
  const chat = document.querySelector('.chat-div');
  let html = '';

  chatLog.forEach((message, i) => {
    html += `
    <div class="message js-message js-message-${i}">
      <div class="main-message-div js-main-message-div-${i}">
        <div class="user-message">
          User
        </div>
        <div class="msg-message">
          ${message}
        </div>
      </div>
      <div class="edit-delete-div js-edit-delete-div-${i}">
        <button class="delete-button js-delete-button">Delete</button>
        <button class="edit-button js-edit-button">Edit</button>
      </div>
    </div>
    `;
  });

  // displays html
  chat.innerHTML = html;
  
  document.querySelectorAll('.js-message').forEach((element, i) => {
    const editDeleteDiv = document.querySelector(`.js-edit-delete-div-${i}`);
    editDeleteDiv.classList.add('div-invisible');

    element.addEventListener('mouseover', () => {
      editDeleteDiv.classList.remove('div-invisible');
    });
    element.addEventListener('mouseout', () => {
      editDeleteDiv.classList.add('div-invisible');
    });
  });

  document.querySelectorAll('.js-edit-button').forEach((button, i) => {
    button.addEventListener('click', () => {
        renderChatLog();
        renderEditMsg(i);
    });
  });

  deleteButtonListener();
}

function renderEditMsg(i) {
  const mainMessage = document.querySelector(`.js-message-${i}`);

  mainMessage.innerHTML = `
    <div class="main-message-div js-main-message-div-${i}">
      <div class="user-message">
        User
      </div>
      <input type="text" class="edit-message js-edit-message-${i}">
    </div>
    <div class="edit-delete-div js-edit-delete-div-${i}">
      <button class="delete-button js-delete-button">Delete</button>
    </div>
  `;

  const messageEdit = document.querySelector(`.js-edit-message-${i}`);

  messageEdit.focus();

  messageEdit.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (messageEdit.value.trim() !== '') {
        chatLog[i] = messageEdit.value;
        console.log(chatLog);
        
        renderChatLog();
      }
    }
  });

  deleteButtonListener();
}

function deleteButtonListener() {
  document.querySelectorAll('.js-delete-button').forEach((button, i) => {
    button.addEventListener('click', () => {
      chatLog.splice(i, 1);
      console.log(chatLog);
      renderChatLog();
    });
  });
}