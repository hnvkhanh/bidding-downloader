import type { Item } from "@/configs/types";

import fs from "fs";

interface ExportItemsToCSVArg {
  items: Item[],
  filePath: string,
  contractorName: string
}

export function exportItemsToBidCSV(
  { items,
    filePath,
    contractorName }: ExportItemsToCSVArg
  ): void {
  // Excel headers (Vietnamese)
  const headers = [
    "STT",
    "Mã phần/lô",
    "Tên phần/lô",
    "Nhà thầu trúng thầu",
    "Danh mục hàng hóa",
    "Ký mã hiệu",
    "Nhãn hiệu",
    "Hãng sản xuất",
    "Đơn vị tính",
    "Khối lượng",
    "Xuất xứ [quốc gia, vùng lãnh thổ sản xuất]",
    "Năm sản xuất",
    "Cấu hình, tính năng kỹ thuật cơ bản",
    "Mã HS",
    "Đơn giá dự thầu (đã bao gồm thuế, phí, lệ phí nếu có)",
    "Thành tiền (đã bao gồm thuế, phí, lệ phí nếu có)"
  ];

  const csvRows: string[] = [];
  csvRows.push(headers.join(",")); // header row

  items.forEach((item, idx) => {
    const row = [
      idx + 1,                        // STT
      item.parent ?? "",              // Mã phần/lô
      item.bidItem ?? "",             // Tên phần/lô
      contractorName,                 // Nhà thầu trúng thầu
      item.name ?? "",                // Danh mục hàng hóa
      item.codeGood ?? "",            // Ký mã hiệu
      item.labelGood ?? "",           // Nhãn hiệu
      item.manufacturer ?? "",        // Hãng sản xuất
      item.uom ?? "",                 // Đơn vị tính
      item.qty ?? "",                 // Khối lượng
      item.origin ?? "",              // Xuất xứ
      item.yearManufacture ?? "",     // Năm sản xuất
      item.feature ?? "",             // Cấu hình, tính năng kỹ thuật
      item.maHS ?? "",                // Mã HS
      item.bidPrice ?? "",            // Đơn giá dự thầu
      item.amount ?? ""               // Thành tiền
    ].map(v => `"${String(v).replace(/"/g, '""')}"`);

    csvRows.push(row.join(","));
  });

  fs.writeFileSync(filePath, csvRows.join("\n"), "utf-8");
}
