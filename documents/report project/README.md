# SVG → PNG Converter

## استفاده

# تبدیل همه SVGهای پوشه
node convert-svg-to-png.js

# تبدیل یک فایل خاص
node convert-svg-to-png.js report-9-1-26.svg

## نکات

- اولین بار خودش `sharp` را نصب می‌کند
- خروجی PNG با همون نام فایل SVG در همون پوشه ساخته می‌شود
- رزولوشن خروجی: 300 DPI
