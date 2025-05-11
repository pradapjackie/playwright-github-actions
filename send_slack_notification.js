import fs from 'fs/promises';
import axios from 'axios';

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
const reportPath = './allure-report/widgets/summary.json';
const reportUrl = process.env.ALLURE_REPORT_URL || 'https://yourdomain.com/allure-report/index.html';

try {
    const data = await fs.readFile(reportPath, 'utf-8');
    const summary = JSON.parse(data).statistic;

    const message = {
        text: `*Allure Report Summary*\n\n
• ✅ Passed: ${summary.passed}
• ❌ Failed: ${summary.failed}
• ⚠️ Broken: ${summary.broken}
• ⏭️ Skipped: ${summary.skipped}
• 📊 Total: ${summary.total}\n\n
👉 <${reportUrl}|View Full Report>`
    };

    await axios.post(webhookUrl, message);
    console.log('Slack notification sent successfully!');
} catch (error) {
    console.error('Error sending Slack notification:', error.message);
}