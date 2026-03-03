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
    const hubPath = 'file:///' + path.resolve(__dirname, '../index.html').replace(/\\/g, '/');
    await hubPage.goto(hubPath);
    console.log("✅ Designer Hub Connected.");

    // 2. Open Target Website
    const targetPage = await context.newPage();
    await targetPage.goto(targetUrl);
    console.log(`✅ Target Site [${targetUrl}] Connected.`);

    // 3. Data Sync Function (Matrix Data Sync)
    const syncPayload = async () => {
        const fullData = await hubPage.evaluate(() => {
            return {
                themes: localStorage.getItem('tactiq-matrix-themes'),
                elements: localStorage.getItem('tactiq-matrix-elements'),
                visibility: localStorage.getItem('tactiq-visible-themes')
            };
        });

        await targetPage.evaluate((data) => {
            if (data.themes) localStorage.setItem('tactiq-matrix-themes', data.themes);
            if (data.elements) localStorage.setItem('tactiq-matrix-elements', data.elements);
            if (data.visibility) localStorage.setItem('tactiq-visible-themes', data.visibility);

            // Trigger storage event for the bridge switcher to update
            window.dispatchEvent(new Event('storage'));

            console.log("%c⚡ TACTIQ SYNC: Matrix Atmosphere Synchronized", "color:#44ff44; font-weight:bold;");
        }, fullData);
    };

    // 4. Set up the Live Bridge (Polling Designer for changes)
    console.log("\n🛸 BRIDGE ACTIVE: Changes in Designer will reflect in real-time.");
    console.log("👉 Keep this terminal open. Press Ctrl+C to disconnect site.");

    let lastDataString = "";
    setInterval(async () => {
        try {
            const currentData = await hubPage.evaluate(() => {
                return localStorage.getItem('tactiq-matrix-elements') +
                    localStorage.getItem('tactiq-matrix-themes') +
                    localStorage.getItem('tactiq-visible-themes');
            });

            if (currentData !== lastDataString) {
                lastDataString = currentData;
                await syncPayload();
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
