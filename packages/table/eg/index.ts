import { Table } from '..';

const table = new Table({
  body: [
    {
      data: [1, 8, '1', 3, 5, 7],
      color: '#0f5',
      underline: true,
      bold: true,
    },
  ],
});

table.addRow(['kadhs ', 12, '好的呀摁欧', 3]);
table.addRow(['kadhs ', 12, '好的呀摁', 3]);
table.addRow(['kadhs ', 12, '好的呀', 3]);
table.addRow(['kadhs ', 12, '好的', 3]);
table.addRow(['kadhs ', 12, '好', 3]);

table.setHeader(['eat', 'sleep and papapap', 'xxx']);

table();
