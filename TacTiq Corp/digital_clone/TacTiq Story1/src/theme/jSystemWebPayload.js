const { chromium } = require('playwright');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function run() {
    console.clear();
    console.log("====================================================");
    console.log("   JDROID-X SYSTEM WEB PAYLOAD - AUTOMATION BRIDGE");
    console.log("   V11.5 - ZERO-TOUCH INJECTION ENGINE");
    console.log("====================================================");

    const targetUrl = await new Promise(resolve => {
        rl.question("\n🚀 Enter the Target Website URL (e.g. https://innovant.ai): ", resolve);
    });

    if (!targetUrl) {
        console.log("❌ Error: No URL provided. Aborting.");
        process.exit(1);
    }

    console.log("\n📡 Launching Satellite Hub & Bridge...");

    const browser = await chromium.launch({
        headless: false,
        args: ['--start-maximized']
    });

    const context = await browser.newContext();

    // 1. Open Designer Hub
    const hubPage = await context.newPage();
    const hubPath = 'file:///' + path.resolve(__dirname, 'jWebThemePalette.html').replace(/\\/g, '/');
    await hubPage.goto(hubPath);
    console.log("✅ Designer Hub Connected.");

    // 2. Open Target Website
    const targetPage = await context.newPage();
    await targetPage.goto(targetUrl);
    console.log(`✅ Target Site [${targetUrl}] Connected.`);

    // 3. Initial Injection Function
    const injectPayload = async () => {
        const themeData = await hubPage.evaluate(() => {
            const themes = JSON.parse(localStorage.getItem('tactiq-matrix-themes') || '[]');
            const elements = JSON.parse(localStorage.getItem('tactiq-matrix-elements') || '[]');
            const activeThemeIdx = themes.findIndex(t => t.active);
            const idx = activeThemeIdx !== -1 ? activeThemeIdx : 0;

            const data = {};
            elements.forEach(el => {
                const varName = el.mapping || el.name.toLowerCase().replace(/ \/ /g, '-').replace(/ & /g, '-').replace(/ /g, '-');
                data[varName] = el.colors[idx];
            });
            return data;
        });

        await targetPage.evaluate((data) => {
            let css = ':root {\n';
            for (const [key, val] of Object.entries(data)) {
                const k = key.startsWith('--') ? key : '--' + key;
                css += `  ${k}: ${val} !important;\n`;
            }
            css += '}';
            const styleId = 'tactiq-automation-bridge';
            let styles = document.getElementById(styleId);
            if (!styles) {
                styles = document.createElement('style');
                styles.id = styleId;
                document.head.appendChild(styles);
            }
            styles.innerText = css;
            console.log("%c⚡ TACTIQ AUTOMATION: Atmosphere Pulsed", "color:#FF9933; font-weight:bold;");
        }, themeData);
    };

    // 4. Set up the Live Bridge (Polling Designer for changes)
    console.log("\n🛸 BRIDGE ACTIVE: Changes in Designer will reflect in real-time.");
    console.log("👉 Keep this terminal open. Press Ctrl+C to disconnect site.");

    let lastDataString = "";
    setInterval(async () => {
        try {
            const currentData = await hubPage.evaluate(() => {
                return localStorage.getItem('tactiq-matrix-elements') + localStorage.getItem('tactiq-matrix-themes');
            });

            if (currentData !== lastDataString) {
                lastDataString = currentData;
                await injectPayload();
            }
        } catch (e) {
            // If pages are closed, exit gracefully
        }
    }, 500); // Pulse check every 500ms

    browser.on('disconnected', () => {
        console.log("\n🔌 Satellite Disconnected. Exiting.");
        process.exit(0);
    });
}

run().catch(err => {
    console.error("❌ Automation Error:", err);
    process.exit(1);
});
