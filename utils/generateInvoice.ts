import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function generateAndShareInvoice(orderDetails: string, total: number) {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #e67e22; }
          .header { text-align: center; margin-bottom: 30px; }
          .details { margin: 20px 0; }
          .total { font-size: 1.2em; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Al Barakah Restaurant</h1>
          <p>Order Invoice</p>
        </div>
        <div class="details">
          ${orderDetails.replace(/\n/g, '<br>')}
        </div>
        <p class="total">Total: R${total.toFixed(2)}</p>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
}