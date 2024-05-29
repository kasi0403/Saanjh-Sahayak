import re
from pypdf import PdfReader
import pdfplumber
import fitz

# reader = PdfReader('file2.pdf')
# l=len(reader.pages)
# page=reader.pages[0]

# # extracting text
# for i in range(0,l):
#     page=reader.pages[i]
#     print(page.extract_text())
#     print("-"*110)

# # extracting images
# for i in page.images:
#     with open(i.name,'wb') as f:
#         f.write(i.data)

# # print("*-*"*100)

# #reading tables sing pdfplumber
# with pdfplumber.open('file2.pdf') as pf:
#     for i in pf.pages:
#         print(i.extract_tables())


doc=fitz.open('file2.pdf')
# print(doc.page_count)
# print(doc.metadata)
page = doc.load_page(0)
text = page.get_text()
# Split the text into lines
lines = text.split('\n')
for i in lines:
    print(i)

# pix=page.get_pixmap()
# pix.save(f"page_{page.number}.png")

# links=page.get_links()
# print(links)




