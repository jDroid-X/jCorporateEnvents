# Website2 - Curated Leadership Conclave
**A Premium Corporate Event Website**

## 📦 How to Share & Run
This is a **static website**, meaning it does not require a backend server, database, or installation. It is fully self-contained.

### 1. Sharing the Website
To send this website to someone else:
1.  Right-click the **`Website2`** folder.
2.  Select **Send to > Compressed (zipped) folder** (or "Compress").
3.  Send the resulting `.zip` file.

### 2. Running on Desktop / Laptop (Windows, Mac, Linux)
The recipient needs to:
1.  **Unzip** the folder completely.
2.  Open the folder and find **`index.html`**.
3.  **Double-click `index.html`**.
    *   It will open automatically in their default web browser (Chrome, Edge, Safari, Firefox).
    *   All images, links, and styles will work perfectly because they use "relative paths" (they look for files inside the same folder).

---

### 3. Running on Mobile / Tablet (iPad, Android, iPhone)
**Note:** You cannot simply "open" an HTML file on a phone like you do on a computer because mobile browsers don't have direct access to your file system for security reasons.

#### **Option A: The Best Way (Host it for Free)**
To show it on a mobile device for a presentation, the best approach is to upload it to a free hosting service. This gives you a URL (link) you can open on *any* device.
*   **Netlify Drop:** Go to [app.netlify.com/drop](https://app.netlify.com/drop). Drag and drop your `Website2` folder there. It will give you a live link in seconds.
*   **GitHub Pages:** If you use GitHub, push the code and enable Pages.

#### **Option B: Local Testing (For Developers)**
If you have a laptop and want to show it on a phone connected to the same Wi-Fi:
1.  Open the `Website2` folder in VS Code.
2.  Install the "Live Server" extension.
3.  Click "Go Live".
4.  On your phone, type your computer's IP address and port (e.g., `http://192.168.1.5:5500`).

---

## 🚀 How to Host Online (GitHub Pages)
To get a public URL (like `https://yourname.github.io/website2`) that works on **all devices** (Desktop, Mobile, Tablet):

1.  **Create a Repository** on GitHub.
2.  **Upload** all files from the `Website2` folder to it.
3.  Go to the repository **Settings**.
4.  Scroll down to the **Pages** section.
5.  Under "Source", select **`main` branch** (or `master`) and click **Save**.
6.  Wait 1-2 minutes. GitHub will deploy it.
7.  **Your Website URL will be:**  
    👉 **`https://jdroid-x.github.io/jCorporateEnvents/Website2/`**

---

## 📂 Folder Structure
*   **`index.html`**: The Home Page (Start here).
*   **`event-solutions/`, `our-work/`, `resources/`**: Content pages.
*   **`css/`**: Styling rules.
*   **`js/`**: Interactive scripts.
*   **`images/`**: All image assets.
