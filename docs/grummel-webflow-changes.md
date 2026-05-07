# Grummel Webflow — Two Changes to Make

## Step 1 — Deploy the function first

```bash
cd ~/projects/lore-nexus
supabase functions deploy grummel --no-verify-jwt
```

---

## Step 2 — Two changes in the Webflow embedded code

### CHANGE 1 — Update the API URL (line 2 of the script)

**Find:**
```js
const API_URL = "https://shibui-ai.vercel.app/api/chat";
```

**Replace with:**
```js
const API_URL = "https://gthubyikarkgxxppaign.supabase.co/functions/v1/grummel";
```

---

### CHANGE 2 — Update the sendMessage function

**Find this block** (inside the `sendMessage` async function):
```js
const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: userMessage,
        thread_id: threadId
    })
});

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();

if (data.error) {
    throw new Error(data.error);
}

threadId = data.thread_id;
// Clean the bot response before storing
const cleanedResponse = data.response.replace(/\s*【[^】]*】\s*/g, '');
messages.push({ role: "assistant", content: cleanedResponse });
addMessage("assistant", cleanedResponse, false, true);

localStorage.setItem("chatbot_thread_id", threadId);
localStorage.setItem("chatbot_messages", JSON.stringify(messages));
```

**Replace with:**
```js
const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        message: userMessage,
        history: messages.slice(0, -1).slice(-10).map(m => ({
            role: m.role,
            content: m.content
        }))
    })
});

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}

const data = await response.json();

if (data.error) {
    throw new Error(data.error);
}

const cleanedResponse = data.reply;
messages.push({ role: "assistant", content: cleanedResponse });
addMessage("assistant", cleanedResponse, false, true);

localStorage.setItem("chatbot_messages", JSON.stringify(messages));
```

---

### CHANGE 3 — Remove thread_id from the clear function (optional cleanup)

**Find:**
```js
threadId = null;
messages = [];
localStorage.removeItem("chatbot_thread_id");
localStorage.removeItem("chatbot_messages");
```

**Replace with:**
```js
messages = [];
localStorage.removeItem("chatbot_messages");
```

---

## That's it. Three small changes, Grummel runs on Claude.
